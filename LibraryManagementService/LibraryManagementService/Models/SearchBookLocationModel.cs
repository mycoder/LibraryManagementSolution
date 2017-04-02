using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LibraryManagementService.Models
{
    public class SearchBookLocationModel
    {
        public int ID { get; set; }
        public string BookName { get; set; }

        public string ISBN { get; set; }

        public string ShelfName { get; set; }

        public string DeskName { get; set; }

        public string LevelNo { get; set; }

        public int BookCopy { get; set; }

        public int AvailAbleBook { get; set; }

        public int RequestNo { get; set; }
    }
}