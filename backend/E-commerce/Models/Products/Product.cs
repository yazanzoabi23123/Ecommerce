using E_commerce.Models.Users;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography;
using System.Text.Json.Serialization;
using ThirdParty.Json.LitJson;
using static System.Net.Mime.MediaTypeNames;
using Image = E_commerce.Models.Users.Image;

namespace E_commerce.Models.Products
{
    public class Product
    {
        


        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = ObjectId.GenerateNewId().ToString();
        public string _id => Id.ToString();
        
        [Required, StringLength(maximumLength: 256, MinimumLength = 2)]
        public string Title { get; set; }
        [Required, StringLength(1024)]
        public string Description { get; set; }
        public Image Image { get; set; }
        [JsonPropertyName("user_id")]
        public string User_Id { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
        public int Rating { get; set; }
        public int Quantity { get; set; }
        public List<string> Cart { get; set; } = new List<string>();
        public Product() { }
        public Product(ProductSqlModel productSqlModel, List<string> cart = null)
        {
            Id = (productSqlModel.Id);
            Title = productSqlModel.Title;
            Image = new Image
            {
                Url = ProductSqlModel.ImageUrl,
                Alt = ProductSqlModel.ImageAlt
            };
            Description = productSqlModel.Description;
            User_Id = productSqlModel.User_Id;
            Category = productSqlModel.Category;
            Price = productSqlModel.Price;
            Quantity = productSqlModel.Quantity;
            Rating = productSqlModel.Rating;
            Cart = cart ?? new List<string>();
        }
    }
}
