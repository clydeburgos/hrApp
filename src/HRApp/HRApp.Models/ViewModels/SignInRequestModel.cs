using System.ComponentModel.DataAnnotations;

namespace HRApp.Models.ViewModels
{
    public class SignInRequestModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
