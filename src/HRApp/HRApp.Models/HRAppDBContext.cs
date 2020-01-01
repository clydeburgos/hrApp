using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace HRApp.Models
{
    public class HRAppDBContext : DbContext
    {
        public HRAppDBContext() { }
        public HRAppDBContext(DbContextOptions<HRAppDBContext> options)
            : base(options)
        { 
        }
        public DbSet<UserModel> Users { get; set; }
        public DbSet<CompanyModel> Companies { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseSqlServer(@"Data Source=.;Initial Catalog=HRAppDB;User ID=sa;Password=sa123;");
        }
    }
}
