/// <reference path="../../LibraryService/Service.js" />




app.controller('LibraryBuildingLevelCtrl', function ($scope, userFactory,$timeout) {

    $scope.loading = false;
    $scope.addMode = false;

    $scope.toggleEdit = function () {
        this.level.editMode = !this.level.editMode;
    };

    $scope.toggleAdd = function () {
        $scope.addMode = !$scope.addMode;

    };
    loadLibraryBuildingLevel();

    //Function to load all Employee records
    function loadLibraryBuildingLevel() {
        //var promiseGet = 
        userFactory.getLibraryBuildingLevel().then(function (pl) {
            $scope.levels = pl.data
          
            console.log($scope.levels)
        },
              function (errorPl) {
                  $log.error('failure loading LibraryBuildingLevel', errorPl);
              });

    }
    //Add New Level
    $scope.Add = function () {
        var LibraryBuildingLevelData = {
            LevelNo: $scope.levelNo,

        };
        //If the flag is 1 the it si new record

        var promisePost = userFactory.addLibraryBuildingLevel(LibraryBuildingLevelData);
        promisePost.then(function (pl) {
            var data = pl.data;
            $('#confirmModal').modal('hide');
            loadLibraryBuildingLevel();
        }, function (err) {
            console.log("Err" + err);
        });

        $scope.levelNo = "";
    };
    //var LibraryBuildingLevel = []
    //$scope.Edit = function (level) {
    //    LibraryBuildingLevel = this.level;
    //    $scope.levelNo = level.LevelNo;

    //}
    $scope.Save = function () {
        var dataID = this.level;
        var dataLibraryBuildingLevel = {
            LevelNo: this.level.LevelNo,
            ID: dataID.ID
        };


        var promisePut = userFactory.updateLibraryBuildingLevel(dataID, dataLibraryBuildingLevel);
        promisePut.then(function (pl) {
            $('#confirmModal2').modal('show');
            $timeout(function () { $('#confirmModal2').modal('hide'); }, 2000);
            loadLibraryBuildingLevel();
        }, function (err) {
            console.log("Err" + err);
        });
        $scope.levelNo = "";
    }
    //Delete
    $scope.Delete = function () {

        var dataLibraryBuildingLevel = this.level;
        var promiseDelete = userFactory.deleteLibraryBuildingLevel(dataLibraryBuildingLevel);
        promiseDelete.then(function (pl) {
            $('#confirmModal3').modal('hide');
            loadLibraryBuildingLevel();
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
        $scope.level = data;
        $scope.message = this.level.LevelNo;
        $('#confirmModal3').modal('show');
    };

});//con


app.service('LevelService', function ($http) {
    var LibraryBuildingLevel = [];
    var urlLibraryBuildingLevel = 'http://localhost:1875/api/LibraryBuildingLevels/'
    var url = urlLibraryBuildingLevel + "GetLibraryBuildingLevels"
    $http.get(url)
       .success(function (data) {

           LibraryBuildingLevel = data;
           //console.log(LibraryBuildingLevel);
       })

    this.isDuplicateLevelNo = function (levelNo) {


        for (var i in LibraryBuildingLevel) {

            if (LibraryBuildingLevel[i].LevelNo == levelNo)
                return true;
        }
        return false;
    }

    this.getLibraryBuildingLevel = function () {
        return LibraryBuildingLevel;

    }
})

app.directive('checkLevelNo', function (LevelService) {
    return {
        restrict: "A",
        require: 'ngModel',
        link: function (scope, ele, attrs, ctrl) {

            ele.bind('blur', function () {
                scope.$apply(function () {
                    console.log("Run in blur!");
                    // Checking to see if the email has been already registered
                    if (LevelService.isDuplicateLevelNo(scope.levelNo)) {

                        ctrl.$setValidity('isDuplicateLevelNo', false);


                        return scope.levelNo;;
                    } else {




                        ctrl.$setValidity('isDuplicateLevelNo', true);

                        return scope.levelNo;
                    }
                })
            }


   )
        }
    }
});