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
using System.IO;

namespace LibraryManagementService.Controllers
{
    public class BooksController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();
          //[Authorize(Roles = "Librarian")]
        // GET: api/Books
        public IQueryable<BookModel> GetBooks()
        {
            return db.Books.Select(x => new BookModel
            {
                ID = x.ID,
                BookName = x.BookName,
                BookCopy = x.BookCopy,
                BookCost = x.BookCost,
                EditionNo = x.EditionNo,
                AccessCode = x.AccessCode,
                ISBN = x.ISBN,
                AuthorName = x.Author.AuthorName,
                CategoryName = x.Category.CategoryName,
                PublicationDate = x.PublicationDate,
                PublicationName = x.Publication.PublicationName,
                Description = x.Description,
                DeskName = x.Desks.DeskName,
                ShelfName = x.Shelf.ShelfName,
                LevelNo = x.LevelNo.LevelNo,
                LoanCopy = x.LoanCopy,
                LostCopy = x.LostCopy,


            });
        }
          ////[Authorize]
        // GET: api/Books/5
        [ResponseType(typeof(Book))]
        public IHttpActionResult GetBook(int id)
        {

           BookModel book = db.Books.Select(x => new BookModel
            {
                ID = x.ID,
                BookName = x.BookName,
                BookCopy = x.BookCopy,
                RequestNo = x.RequestNo,
                AvailableBook = x.BookCopy - x.LoanCopy,
                DeskName = x.Desks.DeskName,
                ISBN = x.ISBN,
                PublicationDate=x.PublicationDate,
                EditionNo=x.EditionNo,
                AuthorName=x.Author.AuthorName,
                PublicationName=x.Publication.PublicationName,
                CategoryName=x.Category.CategoryName,
                
                LevelNo = x.LevelNo.LevelNo,
                ShelfName = x.Shelf.ShelfName

            }).SingleOrDefault(x => x.ID == id);



            if (book == null)
            {
                return NotFound();
            }

            return Ok(book);
        }
          //[Authorize(Roles="Librarian")]
        // PUT: api/Books/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBook(int id, Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != book.ID)
            {
                return BadRequest();
            }

            db.Entry(book).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
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
          //[Authorize(Roles = "Librarian")]
        // POST BookCoverImage
        [HttpPost]
      
        public string UploadPhoto()
        {
            string sPath = System.Web.Hosting.HostingEnvironment.MapPath("/CoverPhoto/");

            System.Web.HttpPostedFile file = System.Web.HttpContext.Current.Request.Files[0];

            string fileName = new FileInfo(file.FileName).Name;

            Guid id = new Guid();

            string modifiedFileName = "http://localhost:1875/CoverPhoto/" + id.ToString() + "_" + fileName; ;

            file.SaveAs(sPath + Path.GetFileName(modifiedFileName));

            return modifiedFileName;
        }
          //[Authorize(Roles = "Librarian")]
        // POST: api/Books
        [ResponseType(typeof(Book))]
        public IHttpActionResult PostBook(Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            db.Books.Add(book);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.Created);
        }
          //[Authorize(Roles = "Librarian")]
        // DELETE: api/Books/5
        [ResponseType(typeof(Book))]
        public IHttpActionResult DeleteBook(int id)
        {
            Book book = db.Books.Find(id);
            if (book == null)
            {
                return NotFound();
            }

            db.Books.Remove(book);
            db.SaveChanges();

            return Ok(book);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BookExists(int id)
        {
            return db.Books.Count(e => e.ID == id) > 0;
        }
        //[Authorize]
        [HttpGet]
        public List<SearchBookModel> GetBookBySearch(string Value)
        {
            return db.Books.Where(x => x.Author.AuthorName.StartsWith(Value) || x.Publication.PublicationName.StartsWith(Value) || x.BookName.StartsWith(Value) || x.ISBN == Value).Select(x => new SearchBookModel
            {

                AuthorName = x.Author.AuthorName,
                ID = x.ID,
                BookName = x.BookName,
                EditionNo = x.EditionNo,
                PublicationName=x.Publication.PublicationName,
                PublicationDate = x.PublicationDate,
                AvailAbleBook = x.BookCopy - x.LoanCopy,
                CoverPhoto = x.CoverPhoto
            }).ToList();
        }
        ////[Authorize]
        [HttpGet]
        public List<SearchBookModel> BookBySpecificSearch([FromUri] SearchBookModel searchBook)
        {
            var BookList = db.Books.Select(x => new SearchBookModel
              {

                  AuthorName = x.Author.AuthorName,
                  ID = x.ID,
                  BookName = x.BookName,
                  EditionNo = x.EditionNo,
                  PublicationName = x.Publication.PublicationName,
                  PublicationDate = x.PublicationDate,
                  AvailAbleBook = x.BookCopy - x.LoanCopy,
                  CoverPhoto = x.CoverPhoto
              }).AsQueryable();

            List<SearchBookModel> books = new List<SearchBookModel>();

            if (!string.IsNullOrEmpty(searchBook.BookName))
            {
                books = BookList.Where(x => x.BookName.StartsWith(searchBook.BookName)).ToList();
            }

            if (!string.IsNullOrEmpty(searchBook.AuthorName))
            {
                books = BookList.Where(x => x.AuthorName.StartsWith(searchBook.AuthorName)).ToList();
            }
            if (!string.IsNullOrEmpty(searchBook.PublicationName))
            {
                books = BookList.Where(x => x.PublicationName.StartsWith(searchBook.PublicationName)).ToList();
            }



            return books;
        }
        ////[Authorize]
        [HttpGet]
        public SearchBookModel BookForIssued([FromUri] SearchBookModel searchBook)
        {
            var BookList = db.Books.Select(x => new SearchBookModel
            {

                AuthorName = x.Author.AuthorName,
                ID = x.ID,
                BookName = x.BookName,
                EditionNo = x.EditionNo,
                PublicationName = x.Publication.PublicationName,
                PublicationDate = x.PublicationDate,
                AvailAbleBook = x.BookCopy - x.LoanCopy,
                ISBN=x.ISBN,
                CoverPhoto = x.CoverPhoto
            }).AsQueryable();
            SearchBookModel books = new SearchBookModel();

            if (!string.IsNullOrEmpty(searchBook.BookName))
            {
                books = BookList.Where(x => x.BookName==searchBook.BookName).SingleOrDefault();
            }

            if (!string.IsNullOrEmpty(searchBook.ISBN))
            {
                books = BookList.Where(x => x.ISBN==searchBook.ISBN).SingleOrDefault();
            }
           


            return books;
        }
        //[Authorize]
        [HttpGet]
        public Book UpDateBookStock([FromUri] Book book)
        {
            var books = db.Books.AsQueryable();

            Book aBook = new Book();
            if (!string.IsNullOrEmpty(book.BookName))
            {
                aBook = books.Where(x => x.BookName == book.BookName).SingleOrDefault();
            }

            if (!string.IsNullOrEmpty(book.ISBN))
            {
                aBook = books.Where(x => x.ISBN == book.ISBN).SingleOrDefault();
            }
            return aBook;
        }
        //Book Report
        [HttpGet]
        //[Authorize]
        public List<BookModel> GetIssuedBookReport(DateTime FromDate, DateTime ToDate, bool isIssued)
        {
            return db.UserIssuedBooks.Where(x => x.IssueDate >= FromDate && x.IssueDate <= ToDate && x.isIssued == isIssued).Select(x => new BookModel
            {
                ID = x.ID,
                BookName = x.Books.BookName,
                BookCopy = x.Books.BookCopy,
                BookCost = x.Books.BookCost,
                EditionNo = x.Books.EditionNo,
                AccessCode = x.Books.AccessCode,
                ISBN = x.Books.ISBN,
                AuthorName = x.Books.Author.AuthorName,
                CategoryName = x.Books.Category.CategoryName,
                PublicationDate = x.Books.PublicationDate,
                PublicationName = x.Books.Publication.PublicationName,
                Description = x.Books.Description,
                DeskName = x.Books.Desks.DeskName,
                ShelfName = x.Books.Shelf.ShelfName,
                LevelNo = x.Books.LevelNo.LevelNo,
                LoanCopy = x.Books.LoanCopy,
                LostCopy = x.Books.LostCopy


            }).ToList();
        }

          ////[Authorize]
        [HttpGet]
        public List<BookWiseReport> GetBookByBookName(DateTime FromDate, DateTime ToDate, string dropColumn)
        {
            List<BookWiseReport> bookList = new List<BookWiseReport>();
            var books = db.Books.Join(db.UserIssuedBooks, x => x.ID, y => y.BookID, (x, y) => new
            {
                book = x,
                Issued = y

            }).Where(x => x.Issued.IssueDate >= FromDate && x.Issued.IssueDate <= ToDate);

            if ("AuthorName" == dropColumn)
            {
                bookList = books.GroupBy(x => x.book.Author.AuthorName).Select(x => new BookWiseReport
                  {
                      AuthorName = x.Key,
                      TotalAuthorBook = x.Count(),


                  }).ToList();


            }
            if ("BookName" == dropColumn)
            {
                 bookList = books.
                 GroupBy(x => x.book.BookName).Select(x => new BookWiseReport
                 {
                     BookName = x.Key,
                     TotalBook = x.Count(),


                 }).ToList();
            }

            if("PublicationName"==dropColumn)
            {
                bookList = books.GroupBy(x => x.book.Publication.PublicationName).Select(x => new BookWiseReport
                  {
                      PublicationName = x.Key,
                      TotalBook = x.Count(),


                  }).ToList();
            }





            return bookList;


        }

       
       
    }
}