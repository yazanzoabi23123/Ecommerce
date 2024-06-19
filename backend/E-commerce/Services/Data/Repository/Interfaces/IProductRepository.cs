using E_commerce.Models.Products;
using E_commerce.Models.Products;
using E_commerce.Models.Users;

namespace E_commerce.Services.Data.Repository.Interfaces
{
    public interface IProductRepository
    {
        Task<Product> CreateProductAsync(Product newProduct);
        Task<List<Product>> GetAllProductsAsync();
        Task<Product> GetOneProductAsync(string productId);
        Task<bool> DeleteProductAsync(string productId);
        Task<Product> EditProductAsync(string productId, Product updatedProduct);
        Task<List<Product>> GetMyProductsAsync(string userId);
        Task<bool> DeleteProductFromCart(string userId, string productId);
        Task<bool> AddProductToCart(string userId, string productId);
    }
}
