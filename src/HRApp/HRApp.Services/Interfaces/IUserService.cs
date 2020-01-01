using HRApp.Models;
using HRApp.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HRApp.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserViewModel> GetUser(int userId);
        Task<UserViewModel> SignIn(string username, string password);
        Task<UserViewModel> CreateUserAsync(UserModel model);
        Task<UserViewModel> UpdateUserAsync(UserModel model);
        string GenerateJwtForUser(UserViewModel user);
    }
}
