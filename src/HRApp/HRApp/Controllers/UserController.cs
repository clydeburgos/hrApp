using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HRApp.Extensions;
using HRApp.Models;
using HRApp.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HRApp.Controllers
{
    public class UserController : Controller
    {
        private readonly IUserService userService;
        public UserController(IUserService userService) {
            this.userService = userService;
        }

        [Route("api/users/{userId}")]
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get(int userId)
        {
            var user = await userService.GetUser(userId);

            return Ok(user);
        }

        [Route("api/users")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody]UserModel request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdUser = await userService.CreateUserAsync(request);
            return Ok(createdUser);
        }

        [Route("api/users/{userId}")]
        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Update([FromBody]UserModel request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdUser = await userService.UpdateUserAsync(request);
            return Ok(createdUser);
        }
    }
}