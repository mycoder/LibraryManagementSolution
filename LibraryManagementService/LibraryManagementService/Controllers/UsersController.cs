using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using LibraryManagementService.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System.Threading.Tasks;
using System.Security.Claims;
using System.IO;

namespace LibraryManagementService.Controllers
{
   
    public class UsersController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Users
        public IQueryable<UserModel> GetUsers()
        {
            return db.Users.Select(x => new UserModel { 
            Id=x.Id,
            UserName=x.UserName,
            Email=x.Email,
            Address=x.Address,
            IdentityID=x.IdentityID,
            RegistrationNo=x.RegistrationNo,            
            LoanNumber=x.LoanNumber,
            RequestNumber=x.RequestNumber


            });
        }

        // GET: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/Users/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUser(string id, User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.Id)
            {
                return BadRequest();
            }

            db.Entry(user).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        private ApplicationUserManager _userManager;
        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set { _userManager = value; }
        }

        // POST BookCoverImage
        [HttpPost]
        //[AllowAnonymous]
        public string UploadPhoto()
        {
            string sPath = System.Web.Hosting.HostingEnvironment.MapPath("/CoverPhoto/");

            System.Web.HttpPostedFile file = System.Web.HttpContext.Current.Request.Files[0];

            string fileName = new FileInfo(file.FileName).Name;

            Guid id = new Guid();

            string modifiedFileName = "http://localhost:1875/CoverPhoto/" + id.ToString() + "_" + fileName;

            file.SaveAs(sPath + Path.GetFileName(modifiedFileName));

            return modifiedFileName;
        }

        // POST: api/Users
        [ResponseType(typeof(User))]
        public async Task<IHttpActionResult> PostUser(UserModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new User() { UserName = model.Email, Email = model.Email,Name=model.Name, Address = model.Address, IdentityID = model.IdentityID, RegistrationNo = GetRegistrationID(model), PhoneNumber = model.PhoneNumber, PhotoUrl = model.PhotoUrl };
            IdentityResult result = await UserManager.CreateAsync(user, model.Password);
            UserManager.AddToRole(user.Id, model.UserTypeId);

            return Ok();  

            //db.Users.Add(user);
            //db.SaveChanges();

            //return StatusCode(HttpStatusCode.Created);
        }

        // DELETE: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult DeleteUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            db.SaveChanges();

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(string id)
        {
            return db.Users.Count(e => e.Id == id) > 0;
        }
        [HttpGet]
        public User GetUserByRegNo(string RegNo)
        {
            return db.Users.Where(x => x.RegistrationNo == RegNo).SingleOrDefault();
        }
        [HttpGet]
        public User GetUserByUserName(string UserName)
        {
            return db.Users.Where(x => x.UserName == UserName).SingleOrDefault();
        }

        [HttpGet]
        public List<string> GetUserRole()
        {
            var roles = ((ClaimsIdentity)User.Identity).Claims
                .Where(c => c.Type == ClaimTypes.Role)
                .Select(c => c.Value).ToList<string>();

            return roles;
        }

        public string GetRegistrationID(UserModel user)
        {
          var users=  db.Users;

          string Regno = (users.Count() + 1).ToString() + user.IdentityID;
          return Regno;
        }

        public User GetUserByEmail(string Email) 
        {
           return db.Users.Where(x => x.Email == Email).SingleOrDefault();
        }
    }
}