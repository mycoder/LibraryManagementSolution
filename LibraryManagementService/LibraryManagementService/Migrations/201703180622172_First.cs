namespace LibraryManagementService.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class First : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BookAuthor",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        AuthorName = c.String(nullable: false, maxLength: 100, unicode: false),
                    })
                .PrimaryKey(t => t.ID)
                .Index(t => t.AuthorName, unique: true);
            
            CreateTable(
                "dbo.BookDetailsInfo",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        BookName = c.String(nullable: false, maxLength: 200, unicode: false),
                        PublicationDate = c.DateTime(nullable: false),
                        ISBN = c.String(nullable: false, maxLength: 100, unicode: false),
                        AccessCode = c.Int(nullable: false),
                        EditionNo = c.Int(nullable: false),
                        BookCopy = c.Int(nullable: false),
                        LoanCopy = c.Int(nullable: false),
                        LostCopy = c.Int(nullable: false),
                        RequestNo = c.Int(nullable: false),
                        BookCost = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Description = c.String(maxLength: 500, unicode: false),
                        CoverPhoto = c.String(maxLength: 100, unicode: false),
                        AuthorID = c.Int(nullable: false),
                        PublicationID = c.Int(nullable: false),
                        CategoryID = c.Int(nullable: false),
                        LevelNoID = c.Int(nullable: false),
                        DeskID = c.Int(nullable: false),
                        ShelfID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.BookAuthor", t => t.AuthorID, cascadeDelete: false)
                .ForeignKey("dbo.BookCategory", t => t.CategoryID, cascadeDelete: false)
                .ForeignKey("dbo.LibraryDesk", t => t.DeskID, cascadeDelete: false)
                .ForeignKey("dbo.LibraryBuildingLevels", t => t.LevelNoID, cascadeDelete: false)
                .ForeignKey("dbo.BookPublication", t => t.PublicationID, cascadeDelete: false)
                .ForeignKey("dbo.BookShelf", t => t.ShelfID, cascadeDelete: false)
                .Index(t => t.ISBN, unique: true)
                .Index(t => t.AuthorID)
                .Index(t => t.PublicationID)
                .Index(t => t.CategoryID)
                .Index(t => t.LevelNoID)
                .Index(t => t.DeskID)
                .Index(t => t.ShelfID);
            
            CreateTable(
                "dbo.BookCategory",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        CategoryName = c.String(nullable: false, maxLength: 100, unicode: false),
                    })
                .PrimaryKey(t => t.ID)
                .Index(t => t.CategoryName, unique: true);
            
            CreateTable(
                "dbo.LibraryDesk",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        DeskName = c.String(nullable: false, maxLength: 100, unicode: false),
                        LibraryBuildingLevelID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.LibraryBuildingLevels", t => t.LibraryBuildingLevelID, cascadeDelete: false)
                .Index(t => t.DeskName, unique: true)
                .Index(t => t.LibraryBuildingLevelID);
            
            CreateTable(
                "dbo.LibraryBuildingLevels",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        LevelNo = c.String(nullable: false, maxLength: 100, unicode: false),
                    })
                .PrimaryKey(t => t.ID)
                .Index(t => t.LevelNo, unique: true);
            
            CreateTable(
                "dbo.BookPublication",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        PublicationName = c.String(nullable: false, maxLength: 100, unicode: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.BookShelf",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        ShelfName = c.String(nullable: false, maxLength: 100, unicode: false),
                        DeskID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.LibraryDesk", t => t.DeskID, cascadeDelete: false)
                .Index(t => t.ShelfName, unique: true)
                .Index(t => t.DeskID);
            
            CreateTable(
                "dbo.UserIssuedBooks",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        UserID = c.String(maxLength: 128),
                        BookID = c.Int(nullable: false),
                        IssueDate = c.DateTime(),
                        isIssued = c.Boolean(nullable: false),
                        ReturnBookDate = c.DateTime(),
                        TimeOutDate = c.DateTime(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.BookDetailsInfo", t => t.BookID, cascadeDelete: false)
                .ForeignKey("dbo.User", t => t.UserID)
                .Index(t => t.UserID)
                .Index(t => t.BookID);
            
            CreateTable(
                "dbo.User",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false, maxLength: 100, unicode: false),
                        RegistrationNo = c.String(maxLength: 200, unicode: false),
                        Address = c.String(nullable: false, maxLength: 300, unicode: false),
                        IdentityID = c.String(nullable: false, maxLength: 8000, unicode: false),
                        LoanNumber = c.Int(nullable: false),
                        RequestNumber = c.Int(nullable: false),
                        PhotoUrl = c.String(),
                        Email = c.String(maxLength: 256),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(),
                        SecurityStamp = c.String(),
                        PhoneNumber = c.String(),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.UserName, unique: true, name: "UserNameIndex");
            
            CreateTable(
                "dbo.UserClaim",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(nullable: false, maxLength: 128),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.User", t => t.UserId, cascadeDelete: false)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.UserLogin",
                c => new
                    {
                        LoginProvider = c.String(nullable: false, maxLength: 128),
                        ProviderKey = c.String(nullable: false, maxLength: 128),
                        UserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })
                .ForeignKey("dbo.User", t => t.UserId, cascadeDelete: false)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.UserRole",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        RoleId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.User", t => t.UserId, cascadeDelete: false)
                .ForeignKey("dbo.Role", t => t.RoleId, cascadeDelete: false)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.Role",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UserRole", "RoleId", "dbo.Role");
            DropForeignKey("dbo.UserIssuedBooks", "UserID", "dbo.User");
            DropForeignKey("dbo.UserRole", "UserId", "dbo.User");
            DropForeignKey("dbo.UserLogin", "UserId", "dbo.User");
            DropForeignKey("dbo.UserClaim", "UserId", "dbo.User");
            DropForeignKey("dbo.UserIssuedBooks", "BookID", "dbo.BookDetailsInfo");
            DropForeignKey("dbo.BookShelf", "DeskID", "dbo.LibraryDesk");
            DropForeignKey("dbo.BookDetailsInfo", "ShelfID", "dbo.BookShelf");
            DropForeignKey("dbo.BookDetailsInfo", "PublicationID", "dbo.BookPublication");
            DropForeignKey("dbo.LibraryDesk", "LibraryBuildingLevelID", "dbo.LibraryBuildingLevels");
            DropForeignKey("dbo.BookDetailsInfo", "LevelNoID", "dbo.LibraryBuildingLevels");
            DropForeignKey("dbo.BookDetailsInfo", "DeskID", "dbo.LibraryDesk");
            DropForeignKey("dbo.BookDetailsInfo", "CategoryID", "dbo.BookCategory");
            DropForeignKey("dbo.BookDetailsInfo", "AuthorID", "dbo.BookAuthor");
            DropIndex("dbo.Role", "RoleNameIndex");
            DropIndex("dbo.UserRole", new[] { "RoleId" });
            DropIndex("dbo.UserRole", new[] { "UserId" });
            DropIndex("dbo.UserLogin", new[] { "UserId" });
            DropIndex("dbo.UserClaim", new[] { "UserId" });
            DropIndex("dbo.User", "UserNameIndex");
            DropIndex("dbo.UserIssuedBooks", new[] { "BookID" });
            DropIndex("dbo.UserIssuedBooks", new[] { "UserID" });
            DropIndex("dbo.BookShelf", new[] { "DeskID" });
            DropIndex("dbo.BookShelf", new[] { "ShelfName" });
            DropIndex("dbo.LibraryBuildingLevels", new[] { "LevelNo" });
            DropIndex("dbo.LibraryDesk", new[] { "LibraryBuildingLevelID" });
            DropIndex("dbo.LibraryDesk", new[] { "DeskName" });
            DropIndex("dbo.BookCategory", new[] { "CategoryName" });
            DropIndex("dbo.BookDetailsInfo", new[] { "ShelfID" });
            DropIndex("dbo.BookDetailsInfo", new[] { "DeskID" });
            DropIndex("dbo.BookDetailsInfo", new[] { "LevelNoID" });
            DropIndex("dbo.BookDetailsInfo", new[] { "CategoryID" });
            DropIndex("dbo.BookDetailsInfo", new[] { "PublicationID" });
            DropIndex("dbo.BookDetailsInfo", new[] { "AuthorID" });
            DropIndex("dbo.BookDetailsInfo", new[] { "ISBN" });
            DropIndex("dbo.BookAuthor", new[] { "AuthorName" });
            DropTable("dbo.Role");
            DropTable("dbo.UserRole");
            DropTable("dbo.UserLogin");
            DropTable("dbo.UserClaim");
            DropTable("dbo.User");
            DropTable("dbo.UserIssuedBooks");
            DropTable("dbo.BookShelf");
            DropTable("dbo.BookPublication");
            DropTable("dbo.LibraryBuildingLevels");
            DropTable("dbo.LibraryDesk");
            DropTable("dbo.BookCategory");
            DropTable("dbo.BookDetailsInfo");
            DropTable("dbo.BookAuthor");
        }
    }
}
