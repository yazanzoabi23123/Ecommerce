using E_commerce.Models.Cart;
using E_commerce.Models.Products;
using E_commerce.Models.Users;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace DotNetCardsServer.Services.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<UserSqlModel> Users { get; set; }
        public DbSet<ProductSqlModel> Products { get; set; }
        public DbSet<UserProductCart> ProductsCart { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserProductCart>()
                .HasOne(ucl => ucl.User)
                .WithMany()
                .HasForeignKey(ucl => ucl.User_Id)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<UserProductCart>()
                 .HasOne(ucl => ucl.Product)
                 .WithMany()
                 .HasForeignKey(ucl => ucl.Product_Id)
                 .OnDelete(DeleteBehavior.Restrict);
        }

    }
   
}
