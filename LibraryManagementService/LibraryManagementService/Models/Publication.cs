using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace LibraryManagementService.Models
{
    [Table("BookPublication")]
    public class Publication
    {
       
        public Publication()
        {
            this.Books = new List<Book>();
        }
        [Key]
        public int ID { get; set; }
        [StringLength(100)]
        [Required]
        [Column(TypeName = "Varchar")]
        public string PublicationName { get; set; }

        public virtual List<Book> Books { get; set; }
    }
}