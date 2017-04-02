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
    //[Authorize(Roles = "Librarian")]
    public class ShelvesController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Shelves
        public IQueryable<ShelfModel> GetShelves()
        {
            return db.Shelves.Select(x => new ShelfModel
            {
                ID = x.ID,
                ShelfName = x.ShelfName,
                DeskName = x.Desks.DeskName
            });
        }

        // GET: api/Shelves/5
        [ResponseType(typeof(Shelf))]
        public IHttpActionResult GetShelf(int id)
        {
            Shelf shelf = db.Shelves.Find(id);
            if (shelf == null)
            {
                return NotFound();
            }

            return Ok(shelf);
        }

        // PUT: api/Shelves/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutShelf(int id, Shelf shelf)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != shelf.ID)
            {
                return BadRequest();
            }

            db.Entry(shelf).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShelfExists(id))
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

        // POST: api/Shelves
        [ResponseType(typeof(Shelf))]
        public IHttpActionResult PostShelf(Shelf shelf)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Shelves.Add(shelf);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.Created);
        }

        // DELETE: api/Shelves/5
        [ResponseType(typeof(Shelf))]
        public IHttpActionResult DeleteShelf(int id)
        {
            Shelf shelf = db.Shelves.Find(id);
            if (shelf == null)
            {
                return NotFound();
            }

            db.Shelves.Remove(shelf);
            db.SaveChanges();

            return Ok(shelf);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ShelfExists(int id)
        {
            return db.Shelves.Count(e => e.ID == id) > 0;
        }

        [HttpGet]
        public List<Shelf> ShelfByDeskID(int id)
        {
            return db.Shelves.Where(x => x.DeskID == id).ToList();
        }
    }
}