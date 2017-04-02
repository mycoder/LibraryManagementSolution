/// <reference path="../../LibraryService/Service.js" />


app.controller("UserProfileCtrl", function (userFactory, $scope, $location, $filter) {
    GetUser();
    
    function GetUser() {
        var UserData = sessionStorage.getItem('userName');
        $scope.userRole = sessionStorage.getItem('userRoles');
        $('#signOut').show();

        userFactory.getUserByUserName(UserData).then(function (pl) {
            $scope.user = pl.data
            console.log($scope.user)
            $scope.$watchCollection('user', function (newVal) {
                $scope.filteredItems = $filter('filter')(newVal, $scope.regNoText);
            });

        },
             function (errorPl) {
                 $log.error('failure loading Desk', errorPl);
             });
    }  
    $scope.GetIssuedBook = function () {
        var UserName = sessionStorage.getItem('userName');

        userFactory.getUserIssuedBookByUserName(UserName).then(function (pl) {


            $scope.books = pl.data
            $scope.$watchCollection('books', function (newVal) {
                $scope.filteredSpecficItems = $filter('filter')(newVal, $scope.regNoText);
            });

        },
             function (errorPl) {
                 $log.error('failure loading Desk', errorPl);
             });


    }

    // Log Out

    $scope.logout = function () {

        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('userRoles');
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('refreshToken');
        window.location.href = "../MasterPage.html#/";
    };

    //=====
})