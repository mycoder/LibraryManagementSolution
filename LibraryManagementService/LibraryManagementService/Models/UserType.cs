using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace LibraryManagementService.Models
{
     [Table("LibraryUserType")]
    public class UserType
    {
        public UserType()
        {
            this.Users = new List<User>();
        }
        [Key]
        public int ID { get; set; }
        [StringLength(100)]
        [Required]
        [Column(TypeName = "Varchar")]
        public string UserTypeName { get; set; }

        public virtual List<User> Users { get; set; }
    }
}