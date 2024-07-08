using DotNetCardsServer.Services.Data;
using E_commerce.Models.Cart;
using E_commerce.Models.Products;
using E_commerce.Services.Data.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_commerce.Services.Data.Repository.Products
{
    public class ProductRepositoryEF : IProductRepository
    {
        private readonly ApplicationDbContext _context;
        public ProductRepositoryEF(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Product> CreateProductAsync(Product newProduct)
        {
            Console.WriteLine("test");
            var productSqlModel = new ProductSqlModel(newProduct);

            _context.Products.Add(productSqlModel);
            await _context.SaveChangesAsync();
            return new Product(productSqlModel);
        }
        public async Task<List<Product>> GetAllProductsAsync()
        {
            var productSqlModels = await _context.Products.ToListAsync();
            Dictionary<string, List<string>> ProductsById = await _context.ProductsCart.GroupBy(cart => cart.Product_Id)
                                                            .ToDictionaryAsync(group => group.Key, group => group.Select((cart) => cart.User_Id).ToList());

            return productSqlModels.Select(productSqlModel => new Product(productSqlModel,
                                ProductsById.GetValueOrDefault(productSqlModel.Id, new List<string>()))).ToList();
        }
        public async Task<Product> GetOneProductAsync(string productId)
        {
            var productSqlModel = await _context.Products.FindAsync(productId);
            if (productSqlModel == null) return null;
            List<string> ProductById = await _context.ProductsCart.Where((cart) => cart.Product_Id == productId).Select((cart) => cart.User_Id).ToListAsync();
            return new Product(productSqlModel, ProductById);
        }
        public async Task<bool> DeleteProductAsync(string productId)
        {
            var productSqlModel = await _context.Products.FindAsync(productId);
            if (productSqlModel == null) return false;
            _context.Products.Remove(productSqlModel);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Product> EditProductAsync(string productId, Product updatedProduct)
        {
            var productSqlModel = await _context.Products.FindAsync(productId);
            if (productSqlModel == null) return null;
            productSqlModel.Title = updatedProduct.Title;
            productSqlModel.Description = updatedProduct.Description;
            productSqlModel.Price = updatedProduct.Price;
            productSqlModel.Category = updatedProduct.Category;
            productSqlModel.Rating = updatedProduct.Rating;
            //productSqlModel.ImageUrl = updatedProduct.Image?.Url;
            //productSqlModel.ImageAlt = updatedProduct.Image?.Alt;
           
            await _context.SaveChangesAsync();

            List<string> ProductOfThisCart = await _context.ProductsCart.Where((cart) => cart.Product_Id == productId).Select((cart) => cart.User_Id).ToListAsync();

            return new Product(productSqlModel, ProductOfThisCart);
        }

        public async Task<List<Product>> GetMyProductsAsync(string userId)
        {
            var productSqlModels = await _context.Products.Where(c => c.User_Id == userId).ToListAsync();
            Dictionary<string, List<string>> ProductsById = await _context.ProductsCart
                                                            .GroupBy(cart => cart.Product_Id)
                                                            .ToDictionaryAsync(group => group.Key, group => group.Select((cart) => cart.User_Id).ToList());

            return productSqlModels.Select(productSqlModel => new Product(productSqlModel,
                                        ProductsById.GetValueOrDefault(productSqlModel.Id, new List<string>()))).ToList();
        }
        public async Task<bool> DeleteProductFromCart(string userId, string productId)
        {
            UserProductCart? productCart = await _context.ProductsCart.FirstOrDefaultAsync(cart => cart.Product_Id == productId && cart.User_Id == userId);

            if (productCart == null) return false;
            _context.ProductsCart.Remove(productCart);
            await _context.SaveChangesAsync();
            return true;

        }
        public async Task<bool> RemoveProductFromCart(string userId, string productId)
        {
            UserProductCart? productCart = await _context.ProductsCart.FirstOrDefaultAsync(cart => cart.Product_Id == productId && cart.User_Id == userId);

            if (productCart == null) return false;
            _context.ProductsCart.Remove(productCart);
            await _context.SaveChangesAsync();
            return true;

        }
        public async Task<bool> AddProductToCart(string userId, string productId)
        {
            UserProductCart? productCart = await _context.ProductsCart.FirstOrDefaultAsync(cart => cart.Product_Id == productId && cart.User_Id == userId);
            if (productCart == null)
            {
                UserProductCart userProductCart = new UserProductCart { Product_Id = productId, User_Id = userId };
                _context.ProductsCart.Add(userProductCart);
                await _context.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }


    }
}
