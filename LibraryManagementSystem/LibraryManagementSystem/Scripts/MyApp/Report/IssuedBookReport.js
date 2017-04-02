/// <reference path="../../LibraryService/Service.js" />


app.controller("IssuedBookReportCtrl", function (userFactory, $scope, $location, $filter) {

   
 
    $scope.GetIssuedBookReport = function () {
        var bookData = {
            FromDate: $scope.FromDate,
            ToDate: $scope.ToDate,
            isIssued:$scope.isIssued
        }


        userFactory.getIssuedBookReport(bookData).then(function (pl) {
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
