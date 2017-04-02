/// <reference path="../../LibraryService/Service.js" />


app.controller("UserReturnedBookCtrl", function (userFactory, $scope, $location, $filter) {

   
    $scope.GetIssuedBook = function () {
        var RegNo = $scope.regNoText

        userFactory.getUserIssuedBook(RegNo).then(function (pl) {


            $scope.books = pl.data
            $scope.$watchCollection('books', function (newVal) {
                $scope.filteredSpecficItems = $filter('filter')(newVal, $scope.regNoText);
            });

        },
             function (errorPl) {
                 $log.error('failure loading Desk', errorPl);
             });


    }

    $scope.GetIssuedUser = function () {
        var RegNo = $scope.regNoText

        userFactory.getIssuedUser(RegNo).then(function (pl) {


            $scope.user = pl.data
            $scope.$watchCollection('user', function (newVal) {
                $scope.filteredItems = $filter('filter')(newVal, $scope.regNoText);
            });

        },
             function (errorPl) {
                 $log.error('failure loading Desk', errorPl);
             });



    }

    function GetIssuedUserBooks() {
        var RegNo = $scope.regNoText

        userFactory.getUserIssuedBook(RegNo).then(function (pl) {


            $scope.books = pl.data
            $scope.$watchCollection('books', function (newVal) {
                $scope.filteredSpecficItems = $filter('filter')(newVal, $scope.regNoText);
            });

        },
           function (errorPl) {
               $log.error('failure loading Desk', errorPl);
           });


    }
 
    $scope.ReturnBook = function (book) {
      
        var dataReturnBook = {
            ReturnBookDate: book.returnDate,
            ID: book.ID,
            UserID: book.UserID,
            BookID: book.BookID,
            IssueDate: book.IssuedDate,
            TimeOutDate:book.TimeOutDate,
            isIssued:false
        };


        var promisePut = userFactory.updateUserReturnBook(dataReturnBook);
        promisePut.then(function (pl) {
            alert("Book returns Successfuly");
            GetIssuedUserBooks();
            
        }, function (err) {
            console.log("Err" + err);
        });
      
    }
})