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

namespace LibraryManagementService.Controllers
{
    //[Authorize]
    public class UserIssuedBooksController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/UserIssuedBooks
        public IQueryable<UserIssuedBook> GetUserIssuedBooks()
        {
            return db.UserIssuedBooks;
        }

        // GET: api/UserIssuedBooks/5
        [ResponseType(typeof(UserIssuedBook))]
        public IHttpActionResult GetUserIssuedBook(int id)
        {

            UserBookReturnModel returnBook = db.UserIssuedBooks.Select(x => new UserBookReturnModel
            {   UserID=x.UserID,
                ID = x.ID,
                UserName = x.Users.UserName,
                ISBN = x.Books.ISBN,
                RegNo = x.Users.RegistrationNo,
                BookName = x.Books.BookName,
                IssuedDate=x.IssueDate,
                TimeOutDate=x.TimeOutDate
            }).SingleOrDefault(x => x.ID == id);
           
            if (returnBook == null)
            {
                return NotFound();
            }

            return Ok(returnBook);
        }

        // PUT: api/UserIssuedBooks/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUserIssuedBook(int id, UserIssuedBook userIssuedBook)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != userIssuedBook.ID)
            {
                return BadRequest();
            }

            db.Entry(userIssuedBook).State = EntityState.Modified;

            try
            {
                var user = db.Users.SingleOrDefault(x => x.Id == userIssuedBook.UserID);
                user.LoanNumber = user.LoanNumber - 1;
                var book = db.Books.SingleOrDefault(x => x.ID == userIssuedBook.BookID);
                book.LoanCopy = book.LoanCopy - 1;
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserIssuedBookExists(id))
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

        // POST: api/UserIssuedBooks
        [ResponseType(typeof(UserIssuedBook))]
        public IHttpActionResult PostUserIssuedBook(UserIssuedBook userIssuedBook)
        {
            var user = db.Users.SingleOrDefault(x => x.Id == userIssuedBook.UserID);
            user.LoanNumber = user.LoanNumber + 1;
            var book = db.Books.SingleOrDefault(x => x.ID == userIssuedBook.BookID);
            book.LoanCopy = book.LoanCopy + 1;
            if (user.LoanNumber > 2 || userIssuedBook.isIssued==false)
            {
                return BadRequest("You are already borrowed 2 books, Return a book then you can borrow a new book!");
            }
            if (book.BookCopy-book.LoanCopy == -1)
            {
                return BadRequest("There are no books in stock!");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.UserIssuedBooks.Add(userIssuedBook);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.Created);
        }

        // DELETE: api/UserIssuedBooks/5
        [ResponseType(typeof(UserIssuedBook))]
        public IHttpActionResult DeleteUserIssuedBook(int id)
        {
            UserIssuedBook userIssuedBook = db.UserIssuedBooks.Find(id);
            if (userIssuedBook == null)
            {
                return NotFound();
            }

            db.UserIssuedBooks.Remove(userIssuedBook);
            db.SaveChanges();

            return Ok(userIssuedBook);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserIssuedBookExists(int id)
        {
            return db.UserIssuedBooks.Count(e => e.ID == id) > 0;
        }
        [HttpGet]
        public List<UserBookReturnModel> GetUserIssuedDetails(string RegNo)
        {
            return db.UserIssuedBooks.Where(x => x.Users.RegistrationNo == RegNo && x.isIssued==true).Select(x => new UserBookReturnModel
            {
                ID=x.ID,
                UserID = x.UserID,
                BookID = x.BookID,
                ISBN=x.Books.ISBN,
                AuthorName=x.Books.Author.AuthorName,
                PublicationName=x.Books.Publication.PublicationName,
                CategoryName=x.Books.Category.CategoryName,
                UserName = x.Users.UserName,
                BookName = x.Books.BookName,
                IssuedDate = x.IssueDate,
                TimeOutDate = x.TimeOutDate,
                RegNo = x.Users.RegistrationNo,
                CoverPhoto = x.Books.CoverPhoto
            }).ToList();

        }
        [HttpGet]
        public List<UserBookReturnModel> GetUserIssuedDetailsByUserName(string UserName)
        {
            return db.UserIssuedBooks.Where(x => x.Users.UserName == UserName && x.isIssued == true).Select(x => new UserBookReturnModel
            {
                ID = x.ID,
                UserID = x.UserID,
                BookID = x.BookID,
                ISBN = x.Books.ISBN,
                AuthorName = x.Books.Author.AuthorName,
                PublicationName = x.Books.Publication.PublicationName,
                CategoryName = x.Books.Category.CategoryName,
                UserName = x.Users.UserName,
                BookName = x.Books.BookName,
                IssuedDate = x.IssueDate,
                TimeOutDate = x.TimeOutDate,
                RegNo = x.Users.RegistrationNo
            }).ToList();

        }

        [HttpGet]
       public UserModel GetBookIssuedUser(string RegNo)
        {
            return db.Users.Select(x => new UserModel
              {
                  PhotoUrl = x.PhotoUrl,
                  UserName = x.UserName,
                  RegistrationNo = x.RegistrationNo,
                  Address = x.Address
              }).SingleOrDefault(x => x.RegistrationNo == RegNo);

        }
        [HttpGet]
        public UserBookReturnModel GetIssedUser(string UserID,int BookID)
        {

            UserBookReturnModel returnBook = db.UserIssuedBooks.Where(x=>x.UserID==UserID &&x.BookID==BookID).OrderByDescending(x=>x.UserID).Select(x => new UserBookReturnModel
            {
                UserID = x.UserID,
                ID = x.ID,
                UserName = x.Users.UserName,
                ISBN = x.Books.ISBN,
                RegNo = x.Users.RegistrationNo,
                BookName = x.Books.BookName,
                IssuedDate = x.IssueDate,
                TimeOutDate = x.TimeOutDate
            }).FirstOrDefault();

            return returnBook;
        }

        //Report Book

       
    }
}