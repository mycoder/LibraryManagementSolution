using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace LibraryManagementService.Models
{
    [Table("LibraryDesk")]
    public class Desk
    {
         
        public Desk()
        {
            this.Books = new List<Book>();
            
        }
        [Key]
        public int ID { get; set; }
        [StringLength(100)]
        [Required]
        [Column(TypeName = "Varchar")]
        [Index(IsUnique = true)]
        public string DeskName { get; set; }

       
        public virtual List<Book> Books { get; set; }

        public int LibraryBuildingLevelID { get; set; }

        public virtual LibraryBuildingLevel LibraryBuildingLevels { get; set; }
    }
}