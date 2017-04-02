/// <reference path="../../LibraryService/Service.js" />

app.controller('DeskCtrl', function ($scope, userFactory, $timeout) {

    $scope.loading = false;
    $scope.addMode = false;

    $scope.toggleEdit = function () {
        this.Des.editMode = !this.Des.editMode;
    };

    $scope.toggleAdd = function () {
        $scope.addMode = !$scope.addMode;

    };


    loadDesk();

    //Get Level no Dropdown
    userFactory.getLibraryBuildingLevel().then(function (pl) {
        $scope.levels = pl.data
      

    },
             function (errorPl) {
                 $log.error('failure loading Library Building Level', errorPl);
             });

    //Get Desk Data
    function loadDesk() {

        userFactory.getDesk().then(function (pl) {
            $scope.Desks = pl.data
          

        },
              function (errorPl) {
                  $log.error('failure loading Desk', errorPl);
              });

    }

    //Add Data for Desk
    $scope.Add = function () {
        var DeskData = {
            DeskName: $scope.DeskName,
            LibraryBuildingLevelID: $scope.levelNo
        };
        //If the flag is 1 the it si new record

        var promisePost = userFactory.addDesk(DeskData);
        promisePost.then(function (pl) {
            var data = pl.data;
            $('#confirmModal').modal('hide');
            loadDesk();
        }, function (err) {
            console.log("Err" + err);
        });

        $scope.DeskName = "";
        $scope.LibraryBuildingLevelID = -1;
    };
    //Edite
    $scope.Save = function () {
        var dataID = this.Des;
        var dataDesk = {
            DeskName: this.Des.DeskName,
            LibraryBuildingLevelID:this.levelNo,
            ID: dataID.ID
        };


        var promisePut = userFactory.updateDesk(dataID, dataDesk);
        promisePut.then(function (pl) {
            $('#confirmModal2').modal('show');

            $timeout(function () { $('#confirmModal2').modal('hide'); }, 2000);
            loadDesk();
        }, function (err) {
            console.log("Err" + err);
        });
        $scope.DeskName = "";
        $scope.levelNo = "";
    }
    //delete
    $scope.Delete = function () {

        var dataDesk = this.Des;
        
        var promiseDelete = userFactory.deleteDesk(dataDesk);
        promiseDelete.then(function (pl) {
            $('#confirmModal3').modal('hide');
            loadDesk();
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
        $scope.Des = data;
        $scope.message = this.Des.DeskName;
        $('#confirmModal3').modal('show');
    };
});//Con


app.service('DeskService', function ($http) {
    var Desk = [];
    var urlDesk = 'http://localhost:1875/api/Desks/'
    var url = urlDesk + "GetDesks"
    $http.get(url)
       .success(function (data) {

           Desk = data;
           console.log(Desk);
       })

    this.isDuplicateDeskName = function (DeskName) {


        for (var i in Desk) {

            if (Desk[i].DeskName == DeskName)
                return true;
        }
        return false;
    }

    this.getDesk = function () {
        return Desk;

    }
})

app.directive('checkDeskName', function (DeskService) {
    return {
        restrict: "A",
        require: 'ngModel',
        link: function (scope, ele, attrs, ctrl) {

            ele.bind('blur', function () {
                scope.$apply(function () {
                    console.log("Run in blur!");
                    // Checking to see if the email has been already registered
                    if (DeskService.isDuplicateDeskName(scope.DeskName)) {

                        ctrl.$setValidity('isDuplicateDeskName', false);


                        return scope.DeskName;;
                    } else {




                        ctrl.$setValidity('isDuplicateDeskName', true);

                        return scope.DeskName;
                    }
                })
            }


   )
        }
    }
});