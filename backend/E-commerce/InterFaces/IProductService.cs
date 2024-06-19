using E_commerce.Models;
using E_commerce.Models.Products;

namespace E_commerce.InterFaces
{
    public interface IProductService
    {
        Task<Product> CreateProductAsync(Product newProduct);

        Task<List<Product>> GetAllProductsAsync();

        Task<Product> GetProductByIdAsync(string productId);
        Task<Product> UpdateProductAsync(string productId, Product updatedProduct);

        Task DeleteProductAsync(string productId);

        Task<List<Product>> GetMyProductsAsync(string productrId);

        Task AddProductToCartAsync(string productId, string userId);

        Task<bool> IsOwner(string productId, string userId);
    }
}
