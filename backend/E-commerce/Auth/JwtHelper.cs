using E_commerce.Models.Users;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace E_commerce.Auth
{
    public class JwtHelper
    {
        public static readonly string secretKey = "F8C2E94F-694F-4888-B434-7B0B228239D4";

        public static string GenerateAuthToken(User user)
        {
            SymmetricSecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            SigningCredentials credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            Claim[] claims = new Claim[]
            {
                new Claim("id",user.Id.ToString()),
                new Claim("_id",user.Id.ToString()),
                new Claim("isAdmin",user.IsAdmin.ToString()),
                new Claim("isBusiness",user.IsBusiness.ToString()),
                new Claim("first",user.Name.First.ToString()),
                new Claim("last",user.Name.Last.ToString()),
                new Claim("email",user.Email.ToString()),
                new Claim("phone",user.Phone.ToString()),
                new Claim("state",user.Address.State.ToString()),
                new Claim("country",user.Address.Country.ToString()),
                new Claim("city",user.Address.City.ToString()),
                new Claim("housenumber",user.Address.HouseNumber.ToString()),
                new Claim("zip",user.Address.Zip.ToString()),
                new Claim("street",user.Address.Street.ToString()),
                new Claim ("type",user.IsAdmin ? "Admin":user.IsBusiness ? "Business":"User")
            };

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: "ProductsServer",
                audience: "ProductReactFront",
                claims: claims,
                expires: DateTime.Now.AddDays(2),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
