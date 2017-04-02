using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LibraryManagementService.Models
{
    public class UserBookReturnModel
    {
        public string UserID { get; set; }
        public int ID { get; set; }
        public int BookID { get; set; }
        public string RegNo { get; set; }
        public string AuthorName { get; set; }


        public string PublicationName { get; set; }
        public string CoverPhoto { get; set; }

        public string CategoryName { get; set; }
        public string UserName { get; set; }

        public string BookName { get; set; }
        public string ISBN { get; set; }
        public DateTime? IssuedDate { get; set; }

        public DateTime? TimeOutDate { get; set; }
    }
}