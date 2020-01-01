using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRApp.Extensions
{
    public static class ControllerExtensions
    {
        public static int GetUserId(this Controller controller)
        {
            return int.Parse(controller.User.Claims.FirstOrDefault(c => c.Type == "id").Value);
        }

        public static int GetUserCompanyId(this Controller controller)
        {
            return int.Parse(controller.User.Claims.FirstOrDefault(c => c.Type == "company_id").Value);
        }
    }
}
