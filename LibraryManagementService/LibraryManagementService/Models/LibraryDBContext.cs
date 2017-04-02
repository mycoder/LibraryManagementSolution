using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;
using System.Web.Mvc;
namespace LibraryManagementService.Models
{
    public class LibraryDBContext:DbContext
    {
        public LibraryDBContext()
            : base("LibraryDBContext")
        {
            
        }

       
       
        
    }
}