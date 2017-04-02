using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace LibraryManagementService.Models
{
    public class UserIssuedBook
    {
        [Key]
        public int ID { get; set; }

        public string UserID { get; set; }
        public int BookID { get; set; }
       
        public Nullable<DateTime> IssueDate { get; set; }
        [Required]
        public bool isIssued { get; set; }

        public Nullable<DateTime> ReturnBookDate { get; set; }

        public Nullable<DateTime> TimeOutDate { get; set; }

        public virtual Book Books { get; set; }

        public virtual User Users { get; set; }
    }
}