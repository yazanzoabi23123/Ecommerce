using E_commerce.InterFaces;
using E_commerce.Models.Products;
using E_commerce.Models.Users;
using E_commerce.Services.Data.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Driver;

namespace E_commerce.Services.Data.Repository.Products
{
    public class ProductRepositoryMongoDb : IProductRepository
    {
        private IMongoCollection<Product> _products;

        public ProductRepositoryMongoDb(IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase("E_commerce");
            _products = database.GetCollection<Product>("Products");
        }
        public async Task<List<Product>> GetAllProductsAsync()
        {
            var id = ObjectId.GenerateNewId();
           
            return await _products.Find(_ => true).ToListAsync();
        }
        public async Task<Product> CreateProductAsync(Product newProduct)
        {
            await _products.InsertOneAsync(newProduct);
            return newProduct;
        }

        public async Task<Product> GetOneProductAsync(string productId)
        {
            var product = await _products.Find(c => c.Id == (productId)).FirstOrDefaultAsync();
            return product;
        }
        public async Task<bool> DeleteProductAsync(string productId)
        {

            var result = await _products.DeleteOneAsync(c => c.Id == (productId));
            return (result.DeletedCount > 0);
        }

        public async Task<Product> EditProductAsync(string productId, Product updatedProduct)
        {
            var filter = Builders<Product>.Filter.Eq(u => u.Id, (productId));
            var update = Builders<Product>.Update
                .Set(c => c.Title, updatedProduct.Title)
                .Set(c => c.Description, updatedProduct.Description)
                .Set(c => c.Price, updatedProduct.Price)
                .Set(c => c.Rating, updatedProduct.Rating)
                .Set(c => c.Category, updatedProduct.Category)
                .Set(c => c.Image, updatedProduct.Image);
            var result = await _products.UpdateOneAsync(filter, update);
            // Check if the update was successful
            if (result.MatchedCount == 0)
            {
                throw new Exception("Product not found");
            }
            return updatedProduct;
        }
        public async Task<bool> DeleteProductFromCart(string userId, string productId)
        {
            var update = Builders<Product>.Update.Pull(c => c.Cart, userId);
            var result = await _products.UpdateOneAsync(c => c.Id == (productId), update);
            return (result.MatchedCount > 0);
        }

        public async Task<bool> AddProductToCart(string userId, string productId)
        {

            var update = Builders<Product>.Update.Push(c => c.Cart, userId);
            var result = await _products.UpdateOneAsync(c => c.Id == (productId), update);
            return (result.MatchedCount > 0);
        }
        public async Task<List<Product>> GetMyProductsAsync(string userId)
        {
            return await _products.Find(product => product.User_Id == userId).ToListAsync();
        }

       
       

      
    }
}
