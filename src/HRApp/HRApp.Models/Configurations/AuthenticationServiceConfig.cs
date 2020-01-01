using System;
using System.Collections.Generic;
using System.Text;

namespace HRApp.Models.Configurations
{
    public class AuthenticationServiceConfig
    {
        public string JwtSigningKey { get; set; }
        public string JwtIssuer { get; set; }
        public string JwtAudience { get; set; }
        public int JwtValidForMinutes { get; set; }
    }
}
