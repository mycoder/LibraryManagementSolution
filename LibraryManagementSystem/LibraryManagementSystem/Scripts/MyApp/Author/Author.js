/// <reference path="../../LibraryService/Service.js" />

app.controller('AuthorCtrl', function ($scope, $http, userFactory, $timeout) {

    $scope.loading = false;
    $scope.addMode = false;

    $scope.toggleEdit = function () {
        this.Auth.editMode = !this.Auth.editMode;
    };

    $scope.toggleAdd = function () {
        $scope.addMode = !$scope.addMode;

    };



    loadAuthor();

    //Function to load all Employee records
    function loadAuthor() {
        //var promiseGet = 
        userFactory.getAuthor().then(function (pl) {
            $scope.authors = pl.data
           
            console.log($scope.authors)
        },
              function (errorPl) {
                  $log.error('failure loading Author', errorPl);
              });

    }
    //Add Data
    $scope.Add = function () {
        var AuthorData = {
            AuthorName: $scope.AuthorName

        };
     
      
        var promisePost = userFactory.addAuthor(AuthorData).then(function (data) {
            $('#confirmModal').modal('hide');
           
            loadAuthor();
            $scope.AuthorName = "";
        }, function (err) {
            console.log("Err" + err);
        });

        
    };
    
    //Upodate
    $scope.Save = function () {
        var dataID = this.Auth;
        var dataAuthor = {
            AuthorName: this.Auth.AuthorName,
            ID: dataID.ID
        };


        var promisePut = userFactory.updateAuthor(dataID, dataAuthor);
        promisePut.then(function (pl) {
            $('#confirmModal2').modal('show');
            $timeout(function () { $('#confirmModal2').modal('hide'); }, 2000);
            loadAuthor();
        }, function (err) {
            console.log("Err" + err);
        });
        $scope.AuthorName = "";
    }

    

    //Delete Data
    $scope.Delete = function () {

        var dataAuthor = this.Auth;
        var promiseDelete = userFactory.deleteAuthor(dataAuthor);
        promiseDelete.then(function (pl) {
            $('#confirmModal3').modal('hide');
            loadAuthor();
        }, function (err) {
            console.log("Err" + err);
        });
    }
    //Use fore Create new modal
    $scope.showconfirm = function () {
        $('#confirmModal').modal('show');
    }

    //Use fore delete modal
    $scope.showconfirmdelet = function (data) {
        $scope.Auth = data;
        $scope.message = this.Auth.AuthorName;
        $('#confirmModal3').modal('show');
    };

});//Con

//Unic nesss

app.service('AuthorService', function ($http) {
    var Author = [];
    var urlAuthor = 'http://localhost:1875/api/Authors/'
    var url = urlAuthor + "checkUnique"
    $http.get(url)
       .success(function (data) {

           Author = data;
           console.log(Author);
       })

    this.isDuplicateAuthorName = function (AuthorName) {


        for (var i in Author) {

            if (Author[i] == AuthorName)
                return true;
        }
        return false;
    }

    this.getAuthor = function () {
        return Author;

    }


})

app.directive('checkAuthorName', function (AuthorService) {
    return {
        restrict: "A",
        require: 'ngModel',
        link: function (scope, ele, attrs, ctrl) {

            ele.bind('blur', function () {
                scope.$apply(function () {
                    console.log("Run in blur!");
                    // Checking to see if the email has been already registered
                    if (AuthorService.isDuplicateAuthorName(scope.AuthorName)) {

                        ctrl.$setValidity('isDuplicateAuthorName', false);


                        return scope.AuthorName;;
                    } else {




                        ctrl.$setValidity('isDuplicateAuthorName', true);

                        return scope.AuthorName;
                    }
                })
            }


   )
        }
    }
});