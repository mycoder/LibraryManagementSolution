using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LibraryManagementService.Models
{
    public class UserModel
    {
        public string Id { get; set; }
        public string RegistrationNo { get; set; }
        public string UserName { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string IdentityID { get; set; }
        public int LoanNumber { get; set; }
        public int RequestNumber { get; set; }
        public string UserTypeId { get; set; }
        public string PhotoUrl { get; set; }
        public string PhoneNumber { get; set; }
        public string Name { get; set; }
    }
}