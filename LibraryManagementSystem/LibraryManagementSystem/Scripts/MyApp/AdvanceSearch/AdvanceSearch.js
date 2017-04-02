/// <reference path="../LibraryService/Service.js" />

app.controller('AdvanceBookSearchCtrl', function ($scope, userFactory, $filter) {

    $scope.GetSearchBook = function () {
        var bookData = $scope.searchText;

        
        userFactory.getSearchBook(bookData).then(function (pl) {


            $scope.books = pl.data
            $scope.$watchCollection('books', function (newVal) {
                $scope.filteredItems = $filter('filter')(newVal, $scope.searchText);
            });

        },
             function (errorPl) {
                 $log.error('failure loading Desk', errorPl);
             });


    }
    $scope.GetSearchSpecificBook = function () {
        var bookData = {
            Value: $scope.searchSpecificText,
            Coumn: $scope.Column
        }


        userFactory.getSearchSpecificBook(bookData).then(function (pl) {


            $scope.Specificbooks = pl.data
            $scope.$watchCollection('Specificbooks', function (newVal) {
                $scope.filteredSpecficItems = $filter('filter')(newVal, $scope.searchText);
            });

        },
             function (errorPl) {
                 $log.error('failure loading Desk', errorPl);
             });


    }

    $scope.GetBookLocationByID = function (bookID) {
        
        $scope.books = null;


        userFactory.getBookByID(bookID).then(function (pl) {

            
            $scope.bookLocation = pl.data
            $('#confirmModal3').modal('show');
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
    
})//con
