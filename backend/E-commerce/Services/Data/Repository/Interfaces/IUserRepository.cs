
using E_commerce.Models.Users;

namespace E_commerce.Services.Data.Repository.Interfaces
{
    public interface IUserRepository
    {
        Task<bool> CreateUserAsync(User newUser);
        Task<List<User>> GetAllUsersAsync(bool includePassword = false); 
        Task<User> GetOneUserAsync(string userId, bool includePassword = false);
        Task<bool> DeleteUserAsync(string userId);
        Task<User> EditUserAsync(string userId, User updatedUser);
        Task<User> GetUserByEmail(string userId);
    }
}
