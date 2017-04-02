/// <reference path="../../LibraryService/Service.js" />

app.controller('BookCtrl', function ($scope, $log, userFactory, $timeout, FileUploadService) {

    $scope.loading = false;
    $scope.addMode = false;

    $scope.toggleEdit = function () {
        this.book.editMode = !this.book.editMode;
    };

    $scope.toggleAdd = function () {
        $scope.addMode = !$scope.addMode;

    };

    loadBook();

    userFactory.getCategory().then(function (pl) {
        $scope.categorys = pl.data
      

    },
             function (errorPl) {
                 $log.error('failure loading Category', errorPl);
             });
    userFactory.getAuthor().then(function (pl) {
        $scope.authors = pl.data
      

    },
           function (errorPl) {
               $log.error('failure loading Author', errorPl);
           });
    userFactory.getPublication().then(function (pl) {
        $scope.publications = pl.data
       

    },
           function (errorPl) {
               $log.error('failure loading Publication', errorPl);
           });
    userFactory.getLibraryBuildingLevel().then(function (pl) {
        $scope.levels = pl.data
      

    },
          function (errorPl) {
              $log.error('failure loading Level', errorPl);
          });

    $scope.DeskStateTextToShow = "Select Desk";
    $scope.GetDesk = function () {
        $scope.desks = null;
        $scope.ID = null;
        $scope.DeskName = null;
        var level = $scope.level;
        userFactory.DeskByLevelID(level).then(function (pl) {
            $scope.desks = pl.data
           
            $scope.DeskStateTextToShow = "Select Desk";

        },
             function (errorPl) {
                 $log.error('failure loading Desk', errorPl);
             });
    }
    $scope.ShelfStateTextToShow = "Select Shelf";
    $scope.GetShelf = function () {
        $scope.shelfs = null;
        $scope.ID = null;
        $scope.ShelfName = null;
        var desk = $scope.desk;
        userFactory.ShelfByDeskID(desk).then(function (pl) {
            $scope.shelfs = pl.data
            
            $scope.DeskStateTextToShow = "Select Shelf";

        },
             function (errorPl) {
                 $log.error('failure loading Shelf', errorPl);
             });
    }


    function loadBook() {

        userFactory.getBook().then(function (pl) {
            $scope.Books = pl.data
            

        },
              function (errorPl) {
                  $log.error('failure loading Book', errorPl);
              });

    }

   
    //Add  Book
    $scope.Add = function () {

       

        var BookData = {
           
            BookName: $scope.BookName,
            ISBN: $scope.ISBN,
            PublicationDate: $scope.PublicationDate,
            EditionNo: $scope.EditionNo,
            BookCopy: $scope.BookCopy,
            AccessCode: $scope.AccessCode,
            BookCost: $scope.BookCost,
            Description: $scope.Description,
            CategoryID: $scope.category,
            AuthorID: $scope.author,
            PublicationID: $scope.publication,
            LevelNoID: $scope.level,
            DeskID: $scope.desk,
            ShelfID: $scope.shelf,
           
        };
        //If the flag is 1 the it si new record

        var promisePost = userFactory.addBook(BookData,{
            withCredentials: true,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        });
        promisePost.then(function (pl) {
            var data = pl.data;
            $('#confirmModal').modal('hide');
            loadBook();
        }, function (err) {
            console.log("Err" + err);
        });

        Clear();
    };
    var books = []
    $scope.Edit = function (Book) {
        books = this.Book;
      
        $scope.BookName = Book.BookName;
       
        $scope.ISBN=Book.ISBN
        $scope.PublicationDate=Book.PublicationDate
        $scope.EditionNo = Book.EditionNo
        $scope.BookCopy = Book.BookCopy
        $scope.AccessCode = Book.AccessCode
        $scope.BookCost = Book.BookCost
        $scope.Description = Book.Description
        $scope.category=Book.CategoryName
        $scope.author= Book.AuthorName
        $scope.publication=Book.PublicationName
        $scope.level = Book.LevelNo
        $scope.desk=Book.DeskName
        $scope.shelf=Book.ShelfName
    }
    $scope.Save = function () {
        var dataID = books
        var dataBook = {
           
            BookName: $scope.BookName,
            ISBN: $scope.ISBN,
            PublicationDate: $scope.PublicationDate,
            EditionNo: $scope.EditionNo,
            BookCopy: $scope.BookCopy,
            AccessCode: $scope.AccessCode,
            BookCost: $scope.BookCost,
            Description: $scope.Description,
            CategoryID: $scope.category,
            AuthorID: $scope.author,
            PublicationID: $scope.publication,
            LevelNoID: $scope.level,
            DeskID: $scope.desk,
            ShelfID: $scope.shelf,
            ID: dataID.ID
        };


        var promisePut = userFactory.updateBook(dataID, dataBook);
        promisePut.then(function (pl) {
            alert("Updated Successfuly");
            loadBook();
        }, function (err) {
            console.log("Err" + err);
        });

    }

    $scope.Delete = function () {

        var dataBook = $scope.Books;
        //var x = confirm("Are you sure to delete this Book " + dataBook[0].ID + " ?");
        if (!x) {
            return false;
        }
        var promiseDelete = userFactory.deleteBook(dataBook);
        promiseDelete.then(function (pl) {

            loadBook();
        }, function (err) {
            console.log("Err" + err);
        });
    }

   var Clear = function () {
        $scope.BookName = null;
        $scope.PublicationDate = null
        $scope.EditionNo = null
        $scope.BookCopy = null
        $scope.ISBN = null
        $scope.category = null
        $scope.publication = null
        $scope.author = null
        $scope.desk = null
        $scope.shelf = null
        $scope.level = null
   }

    //Use fore Create new modal
   $scope.showconfirm = function () {
       $('#confirmModal').modal('show');
   }

    //Use fore delete modal
   $scope.showconfirmdelet = function (data) {
       $scope.book = data;
       $scope.message = this.book.BookName;
       $('#confirmModal3').modal('show');
   };

    //============================Image Upload=================================//

    //Declarationa and Function for Image Upload and Save Data
    //--------------------------------------------
    // Variables
   $scope.Message = "";
   $scope.FileInvalidMessage = "";
   $scope.SelectedFileForUpload = null;
   $scope.FileDescription_TR = "";
   $scope.IsFormSubmitted = false;
   $scope.IsFileValid = false;
   $scope.IsFormValid = false;

    //Form Validation
   $scope.$watch("form.$valid", function (isValid) {
       $scope.IsFormValid = isValid;
   });


    // THIS IS REQUIRED AS File Control is not supported 2 way binding features of Angular
    // ------------------------------------------------------------------------------------
    //File Validation
   $scope.ChechFileValid = function (file) {
       var isValid = false;
       if ($scope.SelectedFileForUpload != null) {

           if ((file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif') && file.size <= (1600 * 1200)) {
               $scope.FileInvalidMessage = "";
               isValid = true;
           }
           else {
               $scope.FileInvalidMessage = "Only JPEG/PNG/Gif Image can be upload )";
           }
       }
       else {
           $scope.FileInvalidMessage = "Image required!";
       }
       $scope.IsFileValid = isValid;

   };

    //File Select event 
   $scope.selectFileforUpload = function (file) {

       var files = file[0];
       $scope.Imagename = files.name;

       $scope.SelectedFileForUpload = file[0];


   }
    //----------------------------------------------------------------------------------------

    //Save File
   $scope.SaveFile = function () {
       $scope.IsFormSubmitted = true;

       $scope.Message = "";

       $scope.ChechFileValid($scope.SelectedFileForUpload);

       if ($scope.IsFormValid && $scope.IsFileValid) {

           FileUploadService.UploadFile($scope.SelectedFileForUpload).then(function (d) {
               var photourl = d.replace(/\"/g, "");
               var BookData = {

                   BookName: $scope.BookName,
                   ISBN: $scope.ISBN,
                   PublicationDate: $scope.PublicationDate,
                   EditionNo: $scope.EditionNo,
                   BookCopy: $scope.BookCopy,
                   AccessCode: $scope.AccessCode,
                   BookCost: $scope.BookCost,
                   Description: $scope.Description,
                   CategoryID: $scope.category,
                   AuthorID: $scope.author,
                   PublicationID: $scope.publication,
                   LevelNoID: $scope.level,
                   DeskID: $scope.desk,
                   ShelfID: $scope.shelf,
                   CoverPhoto: photourl
               };
               //If the flag is 1 the it si new record

               var promisePost = userFactory.addBook(BookData);
               promisePost.then(function (pl) {
                   var data = pl.data;
                   $timeout(function () { $('#confirmModal').modal('hide'); }, 2000);
                   loadBook();
               }, function (err) {
                   console.log("Err" + err);
               });
               $scope.IsFormSubmitted = false;
               ClearForm();

           }, function (e) {
               alert(e);
           });
       }
       else {
           $scope.Message = "All the fields are required.";
       }

   };
    //Clear form 
   function ClearForm() {

       $scope.Imagename = "";

       $scope.Description = "";


       angular.forEach(angular.element("input[type='file']"), function (inputElem) {
           angular.element(inputElem).val(null);
       });

       $scope.form.$setPristine();
       $scope.IsFormSubmitted = false;
   }



    //============================Image Upload End=================================//
});//con


app.service('FacService', function ($http) {
    var isbn = [];
    var urlBook = 'http://localhost:1875/api/Books/'
    var url = urlBook+ "GetBooks"
    $http.get(url)
       .success(function (data) {

           isbn = data;
           console.log(isbn);
       })

    this.isDuplicateISBN = function (ISBN) {


        for (var i in isbn) {

            if (isbn[i].ISBN == ISBN)
                return true;
        }
        return false;
    }

    this.getISBN = function () {
        return ISBN;

    }
})

app.directive('checkISBN', function (FacService) {
    return {
        restrict: "A",
        require: 'ngModel',
        link: function (scope, ele, attrs, ctrl) {

            ele.bind('blur', function () {
                scope.$apply(function () {
                    console.log("Run in blur!");
                    // Checking to see if the email has been already registered
                    if (FacService.isDuplicateISBN(scope.ISBN)) {

                        ctrl.$setValidity('isDuplicateISBN', false);


                        return scope.ISBN;;
                    } else {




                        ctrl.$setValidity('isDuplicateISBN', true);

                        return scope.isDuplicateISBN;
                    }
                })
            }


   )
        }
    }
});

app.factory('FileUploadService', function ($http, $q) {

    var fac = {};
    fac.UploadFile = function (file) {
        var formData = new FormData();
        formData.append("file", file);

        var defer = $q.defer();
        $http.post("http://localhost:1875/api/Books/UploadPhoto", formData,
            {
                withCredentials: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            })
        .success(function (d) {
            defer.resolve(d);
        })
        .error(function () {
            defer.reject("File Upload Failed!");
        });

        return defer.promise;

    }
    return fac;

    //---------------------------------------------
    //End of Image Upload and Insert record

    // This Method IS TO save image name


});