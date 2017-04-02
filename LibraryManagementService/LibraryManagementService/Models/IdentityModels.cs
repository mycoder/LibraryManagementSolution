using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using System.Data.Entity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LibraryManagementService.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class User : IdentityUser
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<User> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }

        public User()
        {
            this.UserIssuedBooks = new List<UserIssuedBook>();
        }

        [Required]
        [StringLength(100)]
        [Column(TypeName = "Varchar")]
        public string Name { get; set; }
        [StringLength(200)]
        [Column(TypeName = "Varchar")]
        
        public string RegistrationNo { get; set; }
       
        [StringLength(300)]
        [Required]
        [Column(TypeName = "Varchar")]
        public string Address { get; set; }
       

        [Required]
        
        [Column(TypeName = "Varchar")]
        public string IdentityID { get; set; }
        public int LoanNumber { get; set; }
        public int RequestNumber { get; set; }
        public string PhotoUrl { get; set; }
        public virtual List<UserIssuedBook> UserIssuedBooks { get; set; }
    }

    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext()
            : base("LibraryDBContext", throwIfV1Schema: false)
        {
            this.Configuration.LazyLoadingEnabled = false;
            this.Configuration.ProxyCreationEnabled = false;
        }

        public virtual DbSet<Author> Authors { get; set; }
        public virtual DbSet<Book> Books { get; set; }
        public virtual DbSet<Category> Categories { get; set; }

        public virtual DbSet<Desk> Desks { get; set; }

        public virtual DbSet<LibraryBuildingLevel> LibraryBuildingLevels { get; set; }

        public virtual DbSet<Publication> Publications { get; set; }
        public virtual DbSet<Shelf> Shelves { get; set; }

        public virtual DbSet<UserIssuedBook> UserIssuedBooks { get; set; }

        protected override void OnModelCreating(System.Data.Entity.DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<IdentityRole>().ToTable("Role");
            modelBuilder.Entity<IdentityUserRole>().ToTable("UserRole");
            modelBuilder.Entity<IdentityUserClaim>().ToTable("UserClaim");
            modelBuilder.Entity<IdentityUserLogin>().ToTable("UserLogin");
            //modelBuilder.Entity<User>().Ignore(c => c.Id);
            //.Ignore(c => c.LockoutEnabled)
            //.Ignore(c => c.LockoutEndDateUtc)
            //.Ignore(c => c.SecurityStamp)
            //.Ignore(c => c.TwoFactorEnabled)
            //.Ignore(c => c.EmailConfirmed)
            //.Ignore(c => c.PhoneNumberConfirmed)
            //.Ignore(c => c.AccessFailedCount);
            modelBuilder.Ignore<IdentityUser>();
        }
        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}