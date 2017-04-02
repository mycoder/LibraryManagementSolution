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
    public class DesksController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Desks
        public IQueryable<DeskModel> GetDesks()
        {
            return db.Desks.Select(x => new DeskModel
            {

                ID = x.ID,
                DeskName = x.DeskName,
                LevelNo = x.LibraryBuildingLevels.LevelNo

            });
        }

        // GET: api/Desks/5
        [ResponseType(typeof(Desk))]
        public IHttpActionResult GetDesk(int id)
        {
            Desk desk = db.Desks.Find(id);
            if (desk == null)
            {
                return NotFound();
            }

            return Ok(desk);
        }

        // PUT: api/Desks/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDesk(int id, Desk desk)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != desk.ID)
            {
                return BadRequest();
            }

            db.Entry(desk).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DeskExists(id))
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

        // POST: api/Desks
        [ResponseType(typeof(Desk))]
        public IHttpActionResult PostDesk(Desk desk)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Desks.Add(desk);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.Created);
        }

        // DELETE: api/Desks/5
        [ResponseType(typeof(Desk))]
        public IHttpActionResult DeleteDesk(int id)
        {
            Desk desk = db.Desks.Find(id);
            if (desk == null)
            {
                return NotFound();
            }

            db.Desks.Remove(desk);
            db.SaveChanges();

            return Ok(desk);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DeskExists(int id)
        {
            return db.Desks.Count(e => e.ID == id) > 0;
        }
        [HttpGet]
        public List<Desk> DeskByLevelID(int id)
        {
            return db.Desks.Where(x => x.LibraryBuildingLevelID == id).ToList();
        }
    }
}