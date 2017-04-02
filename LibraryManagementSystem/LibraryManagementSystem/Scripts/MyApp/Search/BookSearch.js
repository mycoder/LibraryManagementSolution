/// <reference path="../../LibraryService/Service.js" />
/// <reference path="../../jquery-3.1.0.js" />


app.controller('BookSearchCtrl', function ($scope, userFactory, $filter) {


    $scope.GetBook = function () {
        var bookData = $scope.searchText;
        
        $scope.books = null;
        userFactory.getSearchBook(bookData).then(function (pl) {

            
            $scope.books = pl.data
             
    
        },
             function (errorPl) {
                 $log.error('failure loading Desk', errorPl);
             });


    }

    $scope.GetBookLocationByID = function (bookID) {
        $('#confirmModal3').modal('show');
        $scope.books = null;
       
        
        userFactory.getBookByID(bookID).then(function (pl) {

            
            $scope.bookLocation = pl.data
       
       console.log($scope.bookLocation)
      


    },
            function (errorPl) {
                $log.error('failure loading Desk', errorPl);
            });


    }


    $scope.GetBookDescriptionByID = function (bookID) {
        $scope.books = null;
        $scope.filterBooks = []

        userFactory.getBookByID(bookID).then(function (pl) {
            $('#confirmModaldescription').modal('show');

            $scope.bookDescription = pl.data


        },
            function (errorPl) {
                $log.error('failure loading Desk', errorPl);
            });


    }
})

