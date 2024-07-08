using E_commerce.InterFaces;
using E_commerce.Models.Products;
using E_commerce.Services.Data.Repository.Interfaces;
using MongoDB.Bson;
using MongoDB.Driver;

namespace E_commerce.Services.Products
{
    public class ProductsServiceMongoDb : IProductService
    {
        private readonly IMongoCollection<Product> _products;

        public ProductsServiceMongoDb(IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase("E_commerce");
            _products = database.GetCollection<Product>("Products");
        }

        public async Task<Product> CreateProductAsync(Product newProduct)
        {
            await _products.InsertOneAsync(newProduct);
            return newProduct;
        }

        public async Task<List<Product>> GetAllProductsAsync()
        {
            return await _products.Find(_ => true).ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(string productId)
        {
            var product = await _products.Find<Product>(c => c.Id == (productId)).FirstOrDefaultAsync();
            if (product == null)
            {
                throw new Exception("Product not found");
            }
            return product;
        }

        public async Task<Product> UpdateProductAsync(string productId, Product updatedProduct)
        {
            var filter = Builders<Product>.Filter.Eq(u => u.Id,(productId));
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
        
        public async Task DeleteProductAsync(string productId)
        {
            var result = await _products.DeleteOneAsync(c => c.Id == (productId));
            if (result.DeletedCount == 0)
            {
                throw new Exception("Product not found");
            }
        }

        public async Task<List<Product>> GetMyProductsAsync(string userId)
        {
            return await _products.Find(product => product.User_Id == userId).ToListAsync();
        }
        public async Task AddProductToCartAsync(string productId, string userId)
        {
            var product = await GetProductByIdAsync(productId);
            var update = product.Cart.Contains(userId)
                ? Builders<Product>.Update.Pull(c => c.Cart, userId)
                : Builders<Product>.Update.Push(c => c.Cart, userId);

            var result = await _products.UpdateOneAsync(c => c.Id == product.Id, update);
            if (result.MatchedCount == 0)
            {
                throw new Exception("Product not found");
            }
        }
        public async Task RemoveProductFromCartAsync(string productId, string userId)
        {
            var update = Builders<Product>.Update.Pull(c => c.Cart, userId);
            var result = await _products.UpdateOneAsync(c => c.Id == (productId), update);
            if(result.MatchedCount > 0)
            {
                throw new Exception("Product not found");
            }


        }

        public async Task<bool> IsOwner(string productId, string userId)
        {
            Product specificProduct = await GetProductByIdAsync(productId);
            return specificProduct.User_Id == userId;

        }
    }
}
