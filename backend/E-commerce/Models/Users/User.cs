﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace E_commerce.Models.Users
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public Name Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public Image Image { get; set; }
        public Address Address { get; set; }
        public bool IsAdmin { get; set; } = false;
        public bool IsBusiness { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public User() { }

        public User(UserSqlModel userModel)
        {
            Id = (userModel.Id);
            Name = new Name
            {
                First = userModel.FirstName,
                Last = userModel.LastName,
                Middle = userModel.MiddleName
            };
            Email = userModel.Email;
            Password = userModel.Password;
            Phone = userModel.Phone;
            Image = new Image
            {
                Url = userModel.ImageUrl,
                Alt = userModel.ImageAlt
            };
            Address = new Address
            {
                State = userModel.State,
                Country = userModel.Country,
                City = userModel.City,
                Street = userModel.Street,
                HouseNumber = userModel.HouseNumber,
                Zip = userModel.Zip
            };
            IsAdmin = userModel.IsAdmin;
            IsBusiness = userModel.IsBusiness;
            CreatedAt = userModel.CreatedAt;
        }
    }
}
