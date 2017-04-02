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
    public class PublicationsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Publications
        public IQueryable<Publication> GetPublications()
        {
            return db.Publications;
        }

        // GET: api/Publications/5
        [ResponseType(typeof(Publication))]
        public IHttpActionResult GetPublication(int id)
        {
            Publication publication = db.Publications.Find(id);
            if (publication == null)
            {
                return NotFound();
            }

            return Ok(publication);
        }

        // PUT: api/Publications/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPublication(int id, Publication publication)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != publication.ID)
            {
                return BadRequest();
            }

            db.Entry(publication).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PublicationExists(id))
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

        // POST: api/Publications
        [ResponseType(typeof(Publication))]
        public IHttpActionResult PostPublication(Publication publication)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Publications.Add(publication);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.Created);
        }

        // DELETE: api/Publications/5
        [ResponseType(typeof(Publication))]
        public IHttpActionResult DeletePublication(int id)
        {
            Publication publication = db.Publications.Find(id);
            if (publication == null)
            {
                return NotFound();
            }

            db.Publications.Remove(publication);
            db.SaveChanges();

            return Ok(publication);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PublicationExists(int id)
        {
            return db.Publications.Count(e => e.ID == id) > 0;
        }
    }
}