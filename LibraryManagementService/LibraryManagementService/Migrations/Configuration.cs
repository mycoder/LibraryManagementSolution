namespace LibraryManagementService.Migrations
{
    using LibraryManagementService.Models;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<LibraryManagementService.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(LibraryManagementService.Models.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
            context.Roles.AddOrUpdate(x => x.Id, new IdentityRole() { Id = "1", Name = "Librarian" },
                new IdentityRole() { Id = "2", Name = "Student" },
                new IdentityRole() { Id = "3", Name = "Teacher" }
                );
            context.Authors.AddOrUpdate(x => x.ID,

             new Author() { ID = 2, AuthorName = "Charles Dickens" },
              new Author() { ID = 1, AuthorName = "Mark Twin" },
             new Author() { ID = 2, AuthorName = "Rindranath Tagore" },
              new Author() { ID = 1, AuthorName = "Dr. Mohammad Shahidullah" },
             new Author() { ID = 2, AuthorName = "Humayun Ahmed" },
              new Author() { ID = 1, AuthorName = "Michal Mudhushudhan Dotta" },
             new Author() { ID = 2, AuthorName = "Sharat Chndra Chattapadhay" },
              new Author() { ID = 1, AuthorName = "Mahathir Muhammad" },
             new Author() { ID = 2, AuthorName = "Stefin Hawking" },
              new Author() { ID = 1, AuthorName = "Shukanto Bhatrachajjay" },
             new Author() { ID = 2, AuthorName = "Johir Raihan" }

             );
            context.Publications.AddOrUpdate(x => x.ID,

                new Publication() { ID = 1, PublicationName = "Ajkal Prokashoni" },
                 new Publication() { ID = 2, PublicationName = "Adorn Publicationn" },
                new Publication() { ID = 3, PublicationName = "Anannya" },
                 new Publication() { ID = 4, PublicationName = "Agami Prokashoni" },
                new Publication() { ID = 5, PublicationName = "Annesha" },
                 new Publication() { ID = 6, PublicationName = "Ankur Prokashoni" },
                new Publication() { ID = 7, PublicationName = "Anupam Prokashoni" },
                 new Publication() { ID = 8, PublicationName = "Asia Publications" },
                new Publication() { ID = 9, PublicationName = "Biddyaprokash" },
                 new Publication() { ID = 10, PublicationName = "Madina Publications" },
                new Publication() { ID = 11, PublicationName = "Oitijjhya" }

                );
            context.Categories.AddOrUpdate(x => x.ID,

               new Category() { ID = 1, CategoryName = "Academic" },
                new Category() { ID = 2, CategoryName = "History" },
               new Category() { ID = 3, CategoryName = "Art" },
                new Category() { ID = 4, CategoryName = "Drama" },
               new Category() { ID = 5, CategoryName = "Diary" },
                new Category() { ID = 6, CategoryName = "Dictionary" },
               new Category() { ID = 7, CategoryName = "Science Fiction" },
                new Category() { ID = 8, CategoryName = "Novels" },
               new Category() { ID = 9, CategoryName = "Poem" },
                new Category() { ID = 10, CategoryName = "Science" },
               new Category() { ID = 11, CategoryName = "Religion" },
                new Category() { ID = 12, CategoryName = "Story" },
               new Category() { ID = 13, CategoryName = "Politics" }


               );


            context.Desks.AddOrUpdate(x => x.ID,

               new Desk() { ID = 1, DeskName = "Desk-A1", LibraryBuildingLevelID = 1 },
                new Desk() { ID = 2, DeskName = "Desk-A2", LibraryBuildingLevelID = 1 },
               new Desk() { ID = 3, DeskName = "Desk-A3", LibraryBuildingLevelID = 1 },
                new Desk() { ID = 4, DeskName = "Desk-B4", LibraryBuildingLevelID = 2 },
               new Desk() { ID = 5, DeskName = "Desk-B5", LibraryBuildingLevelID = 2 },
                new Desk() { ID = 6, DeskName = "Desk-B6", LibraryBuildingLevelID = 2 },
               new Desk() { ID = 7, DeskName = "Desk-C7", LibraryBuildingLevelID = 3 },
                new Desk() { ID = 8, DeskName = "Desk-C8", LibraryBuildingLevelID = 3 },
               new Desk() { ID = 9, DeskName = "Desk-C9", LibraryBuildingLevelID = 3 },
                new Desk() { ID = 10, DeskName = "Desk-D10", LibraryBuildingLevelID = 4 },
               new Desk() { ID = 11, DeskName = "Desk-D11", LibraryBuildingLevelID = 4 },
                new Desk() { ID = 12, DeskName = "Desk-D12", LibraryBuildingLevelID = 5 },
               new Desk() { ID = 13, DeskName = "Desk-E13", LibraryBuildingLevelID = 5 },
                new Desk() { ID = 14, DeskName = "Desk-E14", LibraryBuildingLevelID = 5 },
                     new Desk() { ID = 15, DeskName = "Desk-E15", LibraryBuildingLevelID = 5 }


               );

            context.LibraryBuildingLevels.AddOrUpdate(x => x.ID,

                          new LibraryBuildingLevel() { ID = 1, LevelNo = "Floor-A" },
                           new LibraryBuildingLevel() { ID = 2, LevelNo = "Floor-B" },
                          new LibraryBuildingLevel() { ID = 3, LevelNo = "Floor-C" },
                           new LibraryBuildingLevel() { ID = 4, LevelNo = "Floor-D" },
                          new LibraryBuildingLevel() { ID = 5, LevelNo = "Floor-E" }



                          );

            context.Shelves.AddOrUpdate(x => x.ID,

                           new Shelf() { ID = 1, ShelfName = "Shelf-1", DeskID = 1 },
                            new Shelf() { ID = 2, ShelfName = "Shelf-2", DeskID = 1 },
                           new Shelf() { ID = 3, ShelfName = "Shelf-3", DeskID = 2 },
                            new Shelf() { ID = 4, ShelfName = "Shelf-4", DeskID = 2 },
                           new Shelf() { ID = 5, ShelfName = "Shelf-5", DeskID = 3 },
                            new Shelf() { ID = 6, ShelfName = "Shelf-6", DeskID = 3 },
                           new Shelf() { ID = 7, ShelfName = "Shelf-7", DeskID = 4 },
                            new Shelf() { ID = 8, ShelfName = "Shelf-8", DeskID = 4 },
                           new Shelf() { ID = 9, ShelfName = "Shelf-9", DeskID = 5 },
                            new Shelf() { ID = 10, ShelfName = "Shelf-10", DeskID = 5 },
                           new Shelf() { ID = 11, ShelfName = "Shelf-11", DeskID = 6 },
                            new Shelf() { ID = 12, ShelfName = "Shelf-12", DeskID = 6 },
                           new Shelf() { ID = 13, ShelfName = "Shelf-13", DeskID = 7 },
                            new Shelf() { ID = 14, ShelfName = "Shelf-14", DeskID = 7 },
                                 new Shelf() { ID = 15, ShelfName = "Shelf-15", DeskID = 8 }


                           );
        }
    }
}
