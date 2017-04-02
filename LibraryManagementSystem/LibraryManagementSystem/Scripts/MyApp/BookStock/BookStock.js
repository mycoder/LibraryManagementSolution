/// <reference path="../../LibraryService/Service.js" />

app.controller("BookStockCtrl", function ($scope, userFactory, $filter) {

    $scope.GeBookForStockUpdate= function () {
        var bookData = {
            Value: $scope.searchSpecificText,
            Column: $scope.Column
        }


        userFactory.getBookForUpdateStock(bookData).then(function (pl) {


            $scope.book = pl.data
            $scope.$watchCollection('book', function (newVal) {
                $scope.filteredSpecficItems = $filter('filter')(newVal, $scope.searchSpecificText)
            });

        },
             function (errorPl) {
                 $log.error('failure loading Desk', errorPl);
             });


    }
    $scope.Save = function () {
        var dataBook =$scope.book
        var dataBook = {

            BookName: dataBook.BookName,
            ISBN: dataBook.ISBN,
            PublicationDate: dataBook.PublicationDate,
            EditionNo: dataBook.EditionNo,
            BookCopy: $scope.BookCopy + dataBook.BookCopy,
            AccessCode: dataBook.AccessCode,
            BookCost: $scope.BookCost,
            Description: dataBook.Description,
            CategoryID: dataBook.CategoryID,
            AuthorID: dataBook.AuthorID,
            PublicationID: dataBook.PublicationID,
            LevelNoID: dataBook.LevelNoID,
            DeskID: dataBook.DeskID,
            ShelfID: dataBook.ShelfID,
            RequestNo: dataBook.RequestNo,
            LostCopy: dataBook.LostCopy,
            LoanCopy: dataBook.LoanCopy,
            CoverPhoto: dataBook.CoverPhoto,
            ID: dataBook.ID
        };


        var promisePut = userFactory.updateBook(dataBook);
        promisePut.then(function (pl) {
            alert("Book Stock Updated Successfuly");
            loadBook();
            Clear();
        }, function (err) {
            console.log("Err" + err);
        });

    }

    function loadBook() {
        var bookData = {
            Value: $scope.searchSpecificText,
            Column: $scope.Column
        }
        userFactory.getBookForUpdateStock(bookData).then(function (pl) {
            $scope.bookEdit = pl.data
            $scope.$watchCollection('bookEdit', function (newVal) {
                $scope.filteredItems = $filter('filter')(newVal)
            });

        },
              function (errorPl) {
                  $log.error('failure loading Book', errorPl);
              });

    }

    function Clear()
    {
        $scope.searchSpecificText = null;
        $scope.Column = "";
        $scope.BookCopy = null;
        $scope.BookCost = null;
    }
})

