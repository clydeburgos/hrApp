using System;

namespace HRApp.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public int CompanyId { get; set; } = 1;
        public string Username { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public int Role { get; set; } = 0;
        public bool IsActive { get; set; } = true;
    }
}
