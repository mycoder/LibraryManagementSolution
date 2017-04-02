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
    public class LibraryBuildingLevelsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/LibraryBuildingLevels
        public IQueryable<LibraryBuildingLevel> GetLibraryBuildingLevels()
        {
            return db.LibraryBuildingLevels;
        }

        // GET: api/LibraryBuildingLevels/5
        [ResponseType(typeof(LibraryBuildingLevel))]
        public IHttpActionResult GetLibraryBuildingLevel(int id)
        {
            LibraryBuildingLevel libraryBuildingLevel = db.LibraryBuildingLevels.Find(id);
            if (libraryBuildingLevel == null)
            {
                return NotFound();
            }

            return Ok(libraryBuildingLevel);
        }

        // PUT: api/LibraryBuildingLevels/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutLibraryBuildingLevel(int id, LibraryBuildingLevel libraryBuildingLevel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != libraryBuildingLevel.ID)
            {
                return BadRequest();
            }

            db.Entry(libraryBuildingLevel).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LibraryBuildingLevelExists(id))
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

        // POST: api/LibraryBuildingLevels
        [ResponseType(typeof(LibraryBuildingLevel))]
        public IHttpActionResult PostLibraryBuildingLevel(LibraryBuildingLevel libraryBuildingLevel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.LibraryBuildingLevels.Add(libraryBuildingLevel);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.Created);
        }

        // DELETE: api/LibraryBuildingLevels/5
        [ResponseType(typeof(LibraryBuildingLevel))]
        public IHttpActionResult DeleteLibraryBuildingLevel(int id)
        {
            LibraryBuildingLevel libraryBuildingLevel = db.LibraryBuildingLevels.Find(id);
            if (libraryBuildingLevel == null)
            {
                return NotFound();
            }

            db.LibraryBuildingLevels.Remove(libraryBuildingLevel);
            db.SaveChanges();

            return Ok(libraryBuildingLevel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LibraryBuildingLevelExists(int id)
        {
            return db.LibraryBuildingLevels.Count(e => e.ID == id) > 0;
        }
    }
}