using E_commerce.Exceptions;
using E_commerce.Models.Users;
using E_commerce.Services.Data.Repository.Interfaces;
using MongoDB.Driver;

namespace E_commerce.Services.Data.Repository.Users
{
    public class UserRepositoryMongoDb : IUserRepository
    {
        private IMongoCollection<User> _users;

        public UserRepositoryMongoDb(IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase("E_commerce");
            _users = database.GetCollection<User>("Users");
        }
        public async Task<bool> CreateUserAsync(User newUser)
        {
            var existingUser = await _users.Find(u => u.Email == newUser.Email).FirstOrDefaultAsync();
            if (existingUser != null)
            {
                return false;
            }
            await _users.InsertOneAsync(newUser);
            return true;

        }

        public async Task<List<User>> GetAllUsersAsync(bool includePassword = false)
        {
            var builder = Builders<User>.Projection;
            var projection = builder.Exclude("Password");
            if (includePassword)
            {
                List<User> allUsers = await _users.Find(_ => true).ToListAsync();
                return allUsers;
            }
            else
            {
                List<User> allUsers = await _users.Find(_ => true).Project<User>(projection).ToListAsync();
                return allUsers;
            }

        }
        public async Task<User> GetOneUserAsync(string userId, bool includePassword = false)
        {

            User specificUser = await _users.Find(u => u.Id.ToString() == userId).FirstOrDefaultAsync();

            if (specificUser == null)
            {
                // user not found 
                return null;
            }

            if (!includePassword)
            {
                specificUser.Password = "";
            }


            return specificUser;
        }
        public async Task<bool> DeleteUserAsync(string userId)
        {
            var result = await _users.DeleteOneAsync(u => u.Id.ToString() == userId);
            return (result.DeletedCount > 0);

        }
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
            if (result.MatchedCount == 0)
            {
                return null;
            }


            return updatedUser;
        }

        public async Task<User> GetUserByEmail(string userEmail)
        {
            var userLogin = await _users.Find(u => u.Email == userEmail).FirstOrDefaultAsync();
            return userLogin;
        }
    }
}
