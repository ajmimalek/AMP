using AMP.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMP.Data
{
    public class AMPContext : DbContext
    {
        public AMPContext(DbContextOptions<AMPContext> opt) : base(opt)
        { }

        public DbSet<User> Users { get; set; }
        public DbSet<Build> Builds { get; set; }
        public DbSet<Changes> Changes { get; set; }
        public DbSet<CodeCoverage> CodeCoverage { get; set; }
        public DbSet<CodeInspections> CodeInspections { get; set; }
        public DbSet<Files> Files { get; set; }
        public DbSet<Sprint> Sprints { get; set; }
        public DbSet<Story> Stories { get; set; }
        public DbSet<Models.Task> Tasks { get; set; }
        //Seeding Data when runing the application
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Get User Infos from JIRA myself
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Email).IsUnique();
            });
            modelBuilder.Entity<User>()
                .HasData(
                new User()
                {
                    Id = Guid.NewGuid(),
                    UserName = "ajmimalek",
                    Name="Malek Ajmi",
                    Password = BCrypt.Net.BCrypt.HashPassword("malek123"),
                    ConfirmPassword = BCrypt.Net.BCrypt.HashPassword("malek123"),
                    Email = "malek.ajmi@se.linedata.com",
                    Role = "Developer"
                },
                new User()
                {
                    Id = Guid.NewGuid(),
                    UserName = "adeladel",
                    Password = BCrypt.Net.BCrypt.HashPassword("adel336"),
                    ConfirmPassword = BCrypt.Net.BCrypt.HashPassword("adel336"),
                    Email = "adel.adel@se.linedata.com",
                    Role = "Manager"
                }
            );
            modelBuilder.Entity<Build>()
                .HasOne(b => b.Changes)
                .WithOne(c => c.Build)
                .HasForeignKey<Changes>(c => c.BuildFK);
        }
    }
}

