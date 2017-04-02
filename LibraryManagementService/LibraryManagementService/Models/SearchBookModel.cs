using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LibraryManagementService.Models
{
    public class SearchBookModel
    {
        public int ID { get; set; }
        public DateTime  PublicationDate { get; set; }
        public string AuthorName { get; set; }
        public string BookName { get; set; }
        public int AvailAbleBook { get; set; }
        public string ISBN { get; set; }
        public string PublicationName { get; set; }
        public string CoverPhoto { get; set; }
        public int EditionNo { get; set; }
    }
}