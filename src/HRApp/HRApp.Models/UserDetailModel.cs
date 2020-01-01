using System;
using System.Collections.Generic;
using System.Text;

namespace HRApp.Models
{
    public class UserDetailModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string FullAddress { get; set; }
        public string BankName { get; set; }
        public string BankFullAddress { get; set; }
        public string AccountNumber { get; set; }
        public string NetSalary { get; set; }
    }
}
