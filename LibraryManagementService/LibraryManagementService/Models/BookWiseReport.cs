using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LibraryManagementService.Models
{
    public class BookWiseReport
    {
        public string BookName { get; set; }
        public int TotalBook { get; set; }
        public string AuthorName { get; set; }
        public int TotalAuthorBook { get; set; }
        public string PublicationName { get; set; }
        public int TotalPublicationBook { get; set; }
    }
}