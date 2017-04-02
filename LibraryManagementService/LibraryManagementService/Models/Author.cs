using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace LibraryManagementService.Models
{ 
    [Table("BookAuthor")]
    public class Author
    {
        public Author()
        {
            this.Books = new List<Book>();
        }
    
        public int ID { get; set; }
        [StringLength(100)]
        [Required]
        [Column(TypeName="Varchar")]
        [Index(IsUnique = true)]
        public string AuthorName { get; set; }

        public virtual List<Book> Books { get; set; }
    }
}