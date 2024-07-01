using E_commerce.Services.Data.Repository.Interfaces;
using E_commerce.Exceptions;
using E_commerce.InterFaces;
using E_commerce.Models.Products;
using E_commerce.Models.Users;
using E_commerce.Services.Data;
using E_commerce.Utils;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using E_commerce.Services.Data.Repository.Interfaces;

namespace E_commerce.Services.Products
{
    public class ProductsService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductsService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<Product> CreateProductAsync(Product newProduct)
        {
            return await _productRepository.CreateProductAsync(newProduct);
        }

        public async Task<List<Product>> GetAllProductsAsync()
        {
            return await _productRepository.GetAllProductsAsync();
        }

        public async Task<Product> GetProductByIdAsync(string productId)
        {
            var product = await _productRepository.GetOneProductAsync(productId);
            if (product == null)
            {
                throw new Exception("Product not found");
            }
            return product;
        }

        public async Task<Product> UpdateProductAsync(string productId, Product updatedProduct)
        {
            var product = await _productRepository.EditProductAsync(productId, updatedProduct);
            if (product == null)
            {

                throw new Exception("Product not found");

            }
            return product;

        }
        public async Task DeleteProductAsync(string productId)
        {
            bool result = await _productRepository.DeleteProductAsync(productId);
            if (!result)
            {
                throw new Exception("Product not found");
            }
        }

        public async Task<List<Product>> GetMyProductsAsync(string userId)
        {
            return await _productRepository.GetMyProductsAsync(userId);
        }

        public async Task AddProductToCartAsync(string productId, string userId)
        {
            var product = await _productRepository.GetOneProductAsync(productId);

            bool result;
            if (product.Cart.Contains(userId))
            {
                result = await _productRepository.DeleteProductFromCart(userId, productId);
            }
            else
            {
                result = await _productRepository.AddProductToCart(userId, productId);

            }
            if (!result)
            {
                throw new Exception("Product not found");
            }
        }
        public async Task RemoveProductFromCart(string prductId, string userId)
        {
            var product = await _productRepository.GetOneProductAsync(prductId);
            bool result=false;
            if (product.Cart.Contains(userId))
            {
               result = await _productRepository.DeleteProductFromCart(userId, prductId);
            }
            if (!result)
            {
                throw new Exception("Product not found");
            }
            
        }
        public async Task<bool> IsOwner(string productId, string userId)
        {
            var product = await _productRepository.GetOneProductAsync(productId);
            return product.User_Id == userId;
        }
    }
}

