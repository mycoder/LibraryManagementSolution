/// <reference path="../../LibraryService/Service.js" />


app.controller("UserIssuedBookCtrl", function (userFactory, $scope, $location, $filter, $log) {

    $scope.GetUser = function () {
        var UserData = $scope.regNoText;

       
        userFactory.getUserByRegNo(UserData).then(function (pl) {
            $scope.user = pl.data
            $scope.$watchCollection('user', function (newVal) {
                $scope.filteredItems = $filter('filter')(newVal, $scope.regNoText);
            });

        },
             function (errorPl) {
                 $log.error('failure loading Desk', errorPl);
             });


    }
    $scope.GeBookForIssued = function () {
        var bookData = {
            Value: $scope.searchSpecificText,
            Column: $scope.Column
        }


        userFactory.getBookForIssued(bookData).then(function (pl) {


            $scope.book = pl.data
            $scope.$watchCollection('book', function (newVal) {
                $scope.filteredSpecficItems = $filter('filter')(newVal, $scope.searchSpecificText);
            });

        },
             function (errorPl) {
                 $log.error('failure loading Desk', errorPl);
             });


    }

    $scope.GeBookForIssuedAgain = function () {
        var bookData = {
            Value: $scope.searchSpecificText,
            Column: $scope.Column
        }


        userFactory.getBookForIssued(bookData).then(function (pl) {


            $scope.bookAgain = pl.data
            $scope.$watchCollection('bookAgain', function (newVal) {
                $scope.filteredSpecficItemsAgain = $filter('filter')(newVal, $scope.searchSpecificText);
            });

        },
             function (errorPl) {
                 $log.error('failure loading Desk', errorPl);
             });
    }

  

    $scope.Add = function () {
        var BookIssuedData = {
            BookID: $scope.book.ID,
            UserID: $scope.user.Id,
            IssueDate: $scope.IssuedDate,
            ReturnBookDate:null,
            TimeOutDate: $scope.TimeOutDate,
            isIssued:true

        };
       

        var promisePost = userFactory.addUserIssuedBook(BookIssuedData);
        promisePost.then(function (pl) {
            $scope.IssuedBook = pl.data;
            GetIssuedBook();
            Clear();
            
          
          
        }, function (err) {
            //console.log("Err" + err);
            $scope.errorMessage = err.data
            Clear();
        });

      
    };
   function GetIssuedBook() {
        var IssuedData = {
            UserID: $scope.user.Id,
            BookID:$scope.book.ID
        }


        userFactory.getIssuedBookByUserID(IssuedData).then(function (pl) {
            $scope.issuedbook = pl.data
           

        },
             function (errorPl) {
                 $log.error('failure loading Issued book', errorPl);
             });


    }
    var Clear = function () {
        $scope.IssuedDate = null;
        //$scope.ReturnBookDate = null;
        $scope.TimeOutDate = null;
        $scope.book = null;
        $scope.user = null;
        $scope.regNoText = null;
        $scope.searchSpecificText = null;
        $scope.Column = "";
    }
})