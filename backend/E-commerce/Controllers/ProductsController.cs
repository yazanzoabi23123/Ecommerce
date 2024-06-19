using E_commerce.InterFaces;
using E_commerce.Models;
using E_commerce.Models.Cart;
using E_commerce.Models.Products;
using E_commerce.Models.Users;
using E_commerce.Services.Products;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using System.Security.Claims;

namespace E_commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productsService;

        public ProductsController(IProductService productsService)
        {
            _productsService = productsService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllProducts()
        {
            List<Product> products = await _productsService.GetAllProductsAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetProduct(string id)
        {
            try
            {
            Product product = await _productsService.GetProductByIdAsync(id);
                return Ok(product);
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> CreateProduct([FromBody] Product newProduct)
        {
            var claims = HttpContext.User.Claims;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Product createdProduct = await _productsService.CreateProductAsync(newProduct);
            return CreatedAtAction(nameof(GetProduct), new { id = createdProduct.Id }, createdProduct);
        }

        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(string id, [FromBody] Product updatedProduct)
        {
            //bool.TryParse(HttpContext.User.FindFirstValue("isAdmin"), out bool isAdmin);
            //if (!await _productsService.IsOwner(id, HttpContext.User.FindFirstValue("id") ?? "") && !isAdmin)
            //{
            //    return Unauthorized("You can only delete your own cards");
            //}
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                await _productsService.UpdateProductAsync(id, updatedProduct);
                return NoContent();
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteProduct(string id)
        {
            //bool.TryParse(HttpContext.User.FindFirstValue("isAdmin"), out bool isAdmin);
            //if (!await _productsService.IsOwner(id, HttpContext.User.FindFirstValue("id") ?? "") && !isAdmin)
            //{
            //    return Unauthorized("You can only delete your own products");
            //}
            try
            {
                await _productsService.DeleteProductAsync(id);
                return NoContent();
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpGet("my-Products/{userId}")]
        public async Task<IActionResult> GetMyProducts()
        {
            string userId = HttpContext.User.FindFirstValue("Id") ?? "";
            List<Product> cards = await _productsService.GetMyProductsAsync(userId);
            return Ok(cards);
        }

        [HttpPatch("{ProductId}/Cart/{userId}")]
        [AllowAnonymous]
        public async Task<IActionResult> AddProductToCart(string productId, string userId)
        {

            try
            {
                await _productsService.AddProductToCartAsync(productId, userId);
                return NoContent();
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }
        //public async Task<IActionResult> RemoveFromCart(string productId)
        //{
        //    UserProductCart? productCart = await _productsService.ProductsCart.FirstOrDefaultAsync(cart => cart.Product_Id == productId && cart.User_Id == userId);

        //    if (productCart == null) return false;
        //    _context.ProductsCart.Remove(productCart);
        //    await _context.SaveChangesAsync();
        //    return true;
        //}

    }
}


