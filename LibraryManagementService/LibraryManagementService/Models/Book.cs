using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Web.Mvc;
using System.Linq;
using System.Web;

namespace LibraryManagementService.Models
{
    [Table("BookDetailsInfo")]
    public class Book
    {
        public Book()
        {
            this.UserIssuedBooks = new List<UserIssuedBook>();
        }
        
        public int ID { get; set; }
        [StringLength(200)]
        [Required]
        [Column(TypeName = "Varchar")]
        public string BookName { get; set; }
        [Required]
        public DateTime PublicationDate { get; set; }
        [StringLength(100)]
        [Required]
        [Column(TypeName = "Varchar")]
        [Index(IsUnique = true)]
        public string ISBN { get; set; }
        [Required]
        [Range(0, int.MaxValue)]
        public int AccessCode { get; set; }
        [Required]
        [Range(0,int.MaxValue)]
        public int EditionNo { get; set; }
        [Required]
        [Range(0, int.MaxValue)]
        public int BookCopy { get; set; }
       
        [Range(0, int.MaxValue)]
        public int LoanCopy { get; set; }
        [Range(0, int.MaxValue)]
        public int LostCopy { get; set; }
        [Range(0, int.MaxValue)]

       
        public int RequestNo { get; set; }
        [Required]
        [Range(0, int.MaxValue)]
        public decimal BookCost { get; set; }
        [StringLength(500)]
        
        [Column(TypeName = "Varchar")]
        public string Description { get; set; }
        [StringLength(100)]

        [Column(TypeName = "Varchar")]
        public string CoverPhoto { get; set; }
        [Required]
        public int AuthorID { get; set; }

        [Required]
        public int PublicationID { get; set; }

        [Required]
        public int CategoryID { get; set; }

        [Required]
        public int LevelNoID { get; set; }
       
        [Required]
        public int DeskID { get; set; }
      
        [Required]
        public int ShelfID { get; set; }


        public virtual Author Author { get; set; }
        public virtual Category Category { get; set; }
        public virtual Desk Desks { get; set; }
        public virtual LibraryBuildingLevel LevelNo { get; set; }
        public virtual Publication Publication { get; set; }
        public virtual Shelf Shelf { get; set; }
        public virtual List<UserIssuedBook> UserIssuedBooks { get; set; }
    }
}