using E_commerce.Services.Data;
using E_commerce.InterFaces;
using E_commerce.Services.Products;
using E_commerce.Services.Data.Repository.Interfaces;
using E_commerce.Services.Data.Repository.Products;
using E_commerce.Services.Data.Repository.Users;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.EntityFrameworkCore;
using E_commerce.MiddleWares;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using E_commerce.Auth;
using DotNetCardsServer.Services.Data;
using E_commerce.Services.Users;

namespace E_commerce
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
            builder.Services.AddSingleton(serviceProvider =>
            {
                var configuration = serviceProvider.GetService<IConfiguration>();
                return MongoDbService.CreateMongoClient(configuration);
            });

            builder.Services.AddCors(options => {
                options.AddPolicy("myCorsPolicy", policy =>
                {
                    policy.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
                });
            });

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                            .AddJwtBearer(options =>
                            {

                                options.TokenValidationParameters = new TokenValidationParameters
                                {
                                    ValidateIssuer = true,
                                    ValidateAudience = true,
                                    ValidateLifetime = true,
                                    ValidateIssuerSigningKey = true,
                                    ValidIssuer = "ProductsServer",
                                    ValidAudience = "ProductReactFront",
                                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtHelper.secretKey))
                                };
                            });

            builder.Services.AddAuthorization(options =>
            {
                options.AddPolicy("MustBeAdmin", policy => policy.RequireClaim("type", "Admin"));
                options.AddPolicy("MustBeBusinessOrAdmin", policy => policy.RequireClaim("type", "Business", "Admin"));
            });

            builder.Services.AddScoped<IUserRepository, UserRepositoryMongoDb>();
            builder.Services.AddScoped<IProductRepository, ProductRepositoryMongoDb>();
            builder.Services.AddScoped<IProductService, ProductsService>();
            builder.Services.AddScoped<IUserService, UserService>();
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseCors("myCorsPolicy");
            app.UseHttpsRedirection();
            app.UseMiddleware<ReqResLoggerMiddleware>();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}