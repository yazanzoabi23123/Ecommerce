using E_commerce.Models;
using E_commerce.Models.Users;

namespace E_commerce.InterFaces
{
    public interface IUserService
    {
        Task<object> CreateUserAsync(User newUser);

        Task<List<User>> GetUsersAsync();

        Task<User> GetOneUserAsync(string userId);

        Task DeleteUserAsync(string userId);
        Task<User> EditUserAsync(string userId, User updatedUser);

        Task<User> LoginAsync(LoginModel loginModel);
    }
}
