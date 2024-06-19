﻿using E_commerce.Exceptions;
using E_commerce.InterFaces;
using E_commerce.Models.Users;
using E_commerce.Utils;
using MongoDB.Bson;
using MongoDB.Driver;

namespace E_commerce.Services.Users
{
    public class UsersServiceMongoDb : IUserService
    {
        private  IMongoCollection<User> _users;

        public UsersServiceMongoDb(IMongoClient mongoClient) 
        {
            var database = mongoClient.GetDatabase("E_commerce");
            _users = database.GetCollection<User>("Users");
        }

        public async Task<object> CreateUserAsync(User newUser)
        {
            var existingUser = await _users.Find(u => u.Email == newUser.Email).FirstOrDefaultAsync();
            if (existingUser != null)
            {
                throw new UserAlreadyExistsException("User with this email already exists.");
            }
            newUser.Password = PasswordHelper.GeneratePassword(newUser.Password);
            await _users.InsertOneAsync(newUser);
            return new { newUser.Id, newUser.Name, newUser.Email };
        }

        //get Users
        public async Task<List<User>> GetUsersAsync()
        {
            var builder = Builders<User>.Projection;
            var projection = builder.Exclude("Password");
            List<User> allUsers = await _users.Find(_ => true).Project<User>(projection).ToListAsync();
            return allUsers;
        }

        // get one user
        public async Task<User> GetOneUserAsync(string userId)
        {
            var builder = Builders<User>.Projection;
            var projection = builder.Exclude("Password");
            User specificUser = await _users.Find(u => u.Id.ToString() == userId).Project<User>(projection).FirstOrDefaultAsync();
            if (specificUser == null)
            {
                //exception user not found 
                throw new UserNotFoundException(userId);
            }
            return specificUser;
        }


        //delete user
        public async Task DeleteUserAsync(string userId)
        {
            // Implement logic to delete a user from the MongoDB collection based on userId
           var result = await _users.DeleteOneAsync(u => u.Id.ToString() == userId);

            if (result.DeletedCount == 0)
            {
                //exception user not found
                throw new UserNotFoundException(userId);
            }

        }

        //edit user
        public async Task<User> EditUserAsync(string userId, User updatedUser)
        {

            var filter = Builders<User>.Filter.Eq(u => u.Id, (userId));

            var update = Builders<User>.Update
                .Set(u => u.Name, updatedUser.Name)
                .Set(u => u.Email, updatedUser.Email)
                .Set(u => u.Address, updatedUser.Address)
                .Set(u => u.Phone, updatedUser.Phone)
                .Set(u => u.IsBusiness, updatedUser.IsBusiness)
                .Set(u => u.IsAdmin, updatedUser.IsAdmin)
                .Set(u => u.Image, updatedUser.Image);

            var result = await _users.UpdateOneAsync(filter, update);


            // Check if the update was successful
            if (result.MatchedCount== 0)
            {
                throw new UserNotFoundException(userId);
            }

            updatedUser.Password = "";
            return updatedUser;
        }

        //login
        public async Task<User> LoginAsync(LoginModel loginModel)
        {
            // Implement logic for user authentication during login
            // Return the authenticated user or null if login fails
            var builder = Builders<User>.Projection;
            var projection = builder.Exclude("Password");

            var userLogin = await _users.Find(u => u.Email == loginModel.Email).Project<User>(projection).FirstOrDefaultAsync();
            if (userLogin == null || !PasswordHelper.VerifyPassword(userLogin.Password, loginModel.Password))
            {
                throw new AuthenticationException();
            }
            
            return userLogin;
        }
    }
}
