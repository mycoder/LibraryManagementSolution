/// <reference path="../../LibraryService/Service.js" />




app.controller('UserTypeCtrl', function ($scope, userFactory) {
    loadUserType();

    //Function to load all Employee records
    function loadUserType() {
        //var promiseGet = 
        userFactory.getUserType().then(function (pl) {
            $scope.UserTypes = pl.data
           
            console.log($scope.UserTypes)
        },
              function (errorPl) {
                  $log.error('failure loading UserType', errorPl);
              });

    }

    $scope.Add = function () {
        var UserTypeData = {
            UserTypeName: $scope.UserTypeName,

        };
        //If the flag is 1 the it si new record

        var promisePost = userFactory.addUserType(UserTypeData);
        promisePost.then(function (pl) {
            var data = pl.data;

            loadUserType();
        }, function (err) {
            console.log("Err" + err);
        });

        $scope.UserTypeName = "";
    };
    var UserType = []
    $scope.Edit = function (type) {
        UserType = this.type;
        $scope.UserTypeName = type.UserTypeName;

    }
    $scope.Save = function () {
        var dataID = UserType
        var dataUserType = {
            UserTypeName: $scope.UserTypeName,
            ID: dataID.ID
        };


        var promisePut = userFactory.updateUserType(dataID, dataUserType);
        promisePut.then(function (pl) {
            alert("Updated Successfuly");
            loadUserType();
        }, function (err) {
            console.log("Err" + err);
        });
        $scope.UserTypeName = "";
    }

    $scope.Delete = function () {

        var dataUserType = this.type;
        var x = confirm("Are you sure to delete this UserType " + dataUserType.ID + " ?");
        if (!x) {
            return false;
        }
        var promiseDelete = userFactory.deleteUserType(dataUserType);
        promiseDelete.then(function (pl) {

            loadUserType();
        }, function (err) {
            console.log("Err" + err);
        });
    }


});


app.service('FacService', function ($http) {
    var UserType = [];
    var urlUserType = 'http://localhost:1875/api/UserTypes/'
    var url = urlUserType + "GetUserTypes"
    $http.get(url)
       .success(function (data) {

           UserType = data;
           //console.log(UserType);
       })

    this.isDuplicateUserTypeName = function (UserTypeName) {


        for (var i in UserType) {

            if (UserType[i].UserTypeName == UserTypeName)
                return true;
        }
        return false;
    }

    this.getUserType = function () {
        return UserType;

    }
})

app.directive('checkUserTypeName', function (FacService) {
    return {
        restrict: "A",
        require: 'ngModel',
        link: function (scope, ele, attrs, ctrl) {

            ele.bind('blur', function () {
                scope.$apply(function () {
                    console.log("Run in blur!");
                    // Checking to see if the email has been already registered
                    if (FacService.isDuplicateUserTypeName(scope.UserTypeName)) {

                        ctrl.$setValidity('isDuplicateUserTypeName', false);


                        return scope.UserTypeName;;
                    } else {




                        ctrl.$setValidity('isDuplicateUserTypeName', true);

                        return scope.UserTypeName;
                    }
                })
            }


   )
        }
    }
});