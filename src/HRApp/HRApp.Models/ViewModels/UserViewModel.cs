using System;
using System.Collections.Generic;
using System.Text;

namespace HRApp.Models.ViewModels
{
    public class UserViewModel
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Role { get; set; } = 0;
        public string RoleName { get; set; }
        public bool IsActive { get; set; }
        public UserDetailViewModel UserDetails { get; set; }
    }

    public class UserDetailViewModel {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string FullAddress { get; set; }
        public string BankName { get; set; }
        public string BankFullAddress { get; set; }
        public string AccountNumber { get; set; }
        public string NetSalary { get; set; }
    }
}
