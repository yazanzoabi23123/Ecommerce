using static System.Net.Mime.MediaTypeNames;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Diagnostics.Metrics;
using System.IO;
using System.Numerics;
using E_commerce.Models.Users;
using System.ComponentModel.DataAnnotations.Schema;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using ThirdParty.Json.LitJson;

namespace E_commerce.Models.Products
{
    public  class ProductSqlModel
    {
        public string Category { get; set; }
        public int Quantity { get; set; }


       

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string _id => Id.ToString();

        [Required, StringLength(maximumLength: 256, MinimumLength = 2)]
        public string Title { get; set; }
        [Required, StringLength(1024)]
        public string Description { get; set; }
       

        [Range(0, double.MaxValue, ErrorMessage = "The price must be positive")]
        public decimal Price { get; set; }
        [Required, Range(1,5)]
        public int Rating { get; set; }

        [Url]
        public static string ImageUrl { get; set; }
        public static string ImageAlt { get; set; }
        [ForeignKey("User")]
        public string User_Id { get; set; }
        public UserSqlModel User { get; set; }
        public ProductSqlModel(){ }
        public ProductSqlModel(Product product)
        {
            Id = product.Id.ToString();
            Title = product.Title;
            Description = product.Description;
            Rating = product.Rating;
            Price = product.Price;
            Category = product.Category;
            ImageUrl = product.Image?.Url;
            ImageAlt = product.Image?.Alt;    
            User_Id = product.User_Id;
            Quantity = product.Quantity;
        }

    }
}
