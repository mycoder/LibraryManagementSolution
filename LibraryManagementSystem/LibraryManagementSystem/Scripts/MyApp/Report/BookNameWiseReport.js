/// <reference path="../../LibraryService/Service.js" />


app.controller("BookNameWiseReportCtrl", function (userFactory, $scope, $location, $filter) {



    $scope.GetBookReportByBookName = function () {
        var bookData = {
            FromDate: $scope.FromDate,
            ToDate: $scope.ToDate,
            dropColumn: $scope.dropColumn
        }


        userFactory.getBookReportByBookName(bookData).then(function (pl) {
            $scope.books = pl.data
            $scope.$watchCollection('books', function (newVal) {
                $scope.filteredItems = $filter('filter')(newVal);
            });

        },
             function (errorPl) {
                 $log.error('failure loading books', errorPl);
             });


    }
   
})
