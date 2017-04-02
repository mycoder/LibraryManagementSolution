using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace LibraryManagementService.Models
{
     [Table("LibraryUser")]
    public class User
    {
         public User()
        {
            this.UserIssuedBooks = new List<UserIssuedBook>();
        }
        [Key]
        public int ID { get; set; }
        [StringLength(200)]
        [Column(TypeName = "Varchar")]
        public string RegistrationNo { get; set; }
        [StringLength(100)]
        [Required]
        [Column(TypeName = "Varchar")]
       
        public string UserName { get; set; }
        [StringLength(300)]
        [Required]
        [Column(TypeName = "Varchar")]
        public string Address { get; set; }
        [StringLength(100)]
       
        [Required]
        [Column(TypeName = "Varchar")]
        [Index(IsUnique = true)]
        public string Email { get; set; }
        [StringLength(100)]
      
        [Required]
        [Column(TypeName = "Varchar")]
        public string Password { get; set; }
           [Column(TypeName = "Varchar")]
        public string IdentityID { get; set; }
        public int LoanNumber { get; set; }
        public int RequestNumber { get; set; }
       
        [Required]
        public int UserTypeID { get; set; }
       
       
        public virtual UserType UserType { get; set; }

        public virtual List<UserIssuedBook> UserIssuedBooks { get; set; }
       
    }
}