using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LibraryManagementService.Models
{
    public class BookModel
    {
        public int ID { get; set; }
       
        public string BookName { get; set; }
       
        public DateTime PublicationDate { get; set; }
        
        public string ISBN { get; set; }

        public int AvailableBook { get; set; }
        public int AccessCode { get; set; }
        
        public int EditionNo { get; set; }
       
        public int BookCopy { get; set; }

      
        public int LoanCopy { get; set; }
       
        public int LostCopy { get; set; }
      


        public int RequestNo { get; set; }
        
        public decimal BookCost { get; set; }
        
        public string Description { get; set; }
       
        public string CoverPhoto { get; set; }
       
        public string AuthorName { get; set; }

      
        public string PublicationName{ get; set; }

       
        public string CategoryName { get; set; }

        public int TotalAuthorBook { get; set; }
        public int TotalBook { get; set; }
        public string LevelNo { get; set; }

        public bool isIssued { get; set; }
        public string DeskName { get; set; }

        public string UserName { get; set; }
        public string ShelfName { get; set; }


    }
}