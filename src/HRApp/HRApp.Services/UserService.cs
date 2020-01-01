using HRApp.Models;
using HRApp.Models.Configurations;
using HRApp.Models.ViewModels;
using HRApp.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace HRApp.Services
{
    public class UserService : IUserService
    {
        HRAppDBContext db;
        AuthenticationServiceConfig authConfig;
        public UserService(HRAppDBContext db, AuthenticationServiceConfig authConfig) {
            this.db = db;
            this.authConfig = authConfig;
        }

        public async Task<UserViewModel> GetUser(int userId) {
            var data = await (from u in db.Users
                        join c in db.Companies
                        on u.CompanyId equals c.Id select new UserViewModel
                        { 
                            Id = u.Id,
                            Username = u.Username,
                            FirstName = u.FirstName,
                            LastName = u.LastName,
                            Email = u.Email,
                            CompanyId = c.Id,
                            CompanyName = c.CompanyName,
                            Role = u.Role,
                            IsActive = u.IsActive,
                            RoleName = ((int)u.Role).ToString(),
                        }).SingleOrDefaultAsync(u => u.Id == userId);
            return data;
        }
        public async Task<UserViewModel> SignIn(string username, string password) {
            var user = await db.Users.SingleOrDefaultAsync(u => u.Username == username);
            if (user != null) {
                var hashedPassword = user.Password.ToString();
                var match = BCrypt.Net.BCrypt.Verify(password, hashedPassword);
                if (match)
                {
                    return await GetUser(user.Id);
                }
            }
            return null;
        }
        public async Task<UserViewModel> CreateUserAsync(UserModel model) {
            var user = await GetUser(model.Id);
            if (user == null) {
                var newUser = new UserModel();
                newUser.FirstName = model.FirstName;
                newUser.LastName = model.LastName;
                newUser.Email = model.Email;
                newUser.IsActive = true;
                newUser.Username = model.Username;
                newUser.Password = BCrypt.Net.BCrypt.HashPassword(model.Password);
                newUser.FirstName = model.FirstName;

                db.Users.Add(newUser);
                await db.SaveChangesAsync();
                int userId = newUser.Id;
                return await GetUser(userId);
            }
            return null;
        }
        public async Task<UserViewModel> UpdateUserAsync(UserViewModel model) {
            var user = await GetUser(model.Id);
            if (user != null)
            {
                user.FirstName = model.FirstName;
                user.LastName = model.LastName;
                user.Email = model.Email;
                user.IsActive = true;
                user.Username = model.Username;
                user.FirstName = model.FirstName;

                var userDetails = await db.UserDetails.SingleOrDefaultAsync(ud => ud.UserId == model.Id);
                if (userDetails != null) {
                    userDetails.FullAddress = model.UserDetails.FullAddress;
                    userDetails.BankName = model.UserDetails.BankName;
                    userDetails.BankFullAddress = model.UserDetails.BankFullAddress;
                    userDetails.AccountNumber = model.UserDetails.AccountNumber;
                    userDetails.NetSalary = model.UserDetails.NetSalary;
                }

                await db.SaveChangesAsync();
                return user;
            }
            return null;
        }
        public string GenerateJwtForUser(UserViewModel user) {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authConfig.JwtSigningKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
                {
                    new Claim("id", user.Id.ToString()),
                    new Claim("first_name", user.FirstName),
                    new Claim("last_name", user.LastName),
                    new Claim("username", user.Username),
                    new Claim("email", user.Email),
                    new Claim("company_id", user.CompanyId.ToString()),
                    new Claim("company_name", user.CompanyName),
                    new Claim("role", ((int)user.Role).ToString())
                };

            var token = new JwtSecurityToken(
                issuer: authConfig.JwtIssuer,
                audience: authConfig.JwtAudience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(authConfig.JwtValidForMinutes),
                signingCredentials: creds);

            var handler = new JwtSecurityTokenHandler();
            var jwt = handler.WriteToken(token);

            return jwt;
        }
    }
}
