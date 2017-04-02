using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace LibraryManagementService.Models
{
    
    public class LibraryBuildingLevel
    {
        public LibraryBuildingLevel()
        {
            this.Books = new List<Book>();
            this.Desks = new List<Desk>();
        }
    
        public int ID { get; set; }
        [StringLength(100)]
        [Required]
        [Column(TypeName = "Varchar")]
        [Index(IsUnique = true)]
        public string LevelNo { get; set; }

        public virtual List<Book> Books { get; set; }

        public virtual List<Desk> Desks { get; set; }
    }
}