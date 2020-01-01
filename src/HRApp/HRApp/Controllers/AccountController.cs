using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HRApp.Models.ViewModels;
using HRApp.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HRApp.Controllers
{
    public class AccountController : Controller
    {
        private readonly IUserService userService;

        public AccountController(IUserService userService)
        {
            this.userService = userService;
        }

        [Route("api/account/signin")]
        [HttpPost]
        public async Task<IActionResult> SignIn([FromBody] SignInRequestModel request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await userService.SignIn(request.Username, request.Password);
            if (user == null)
            {
                return BadRequest("Unable to find user. Please check your username and password.");
            }

            if (!user.IsActive)
            {
                return BadRequest("Your account is inactive. Please contact an administrator to re-activate your account.");
            }

            var jwt = userService.GenerateJwtForUser(user);

            return Ok(new { token = jwt });
        }
    }
}