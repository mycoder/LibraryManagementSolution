/// <reference path="../../LibraryService/Service.js" />

app.controller('ShelfCtrl', function ($scope, userFactory, $timeout) {

    $scope.loading = false;
    $scope.addMode = false;

    $scope.toggleEdit = function () {
        this.shelf.editMode = !this.shelf.editMode;
    };

    $scope.toggleAdd = function () {
        $scope.addMode = !$scope.addMode;

    };

    loadShelf();

    userFactory.getDesk().then(function (pl) {
        $scope.desks = pl.data
      

    },
             function (errorPl) {
                 $log.error('failure loading desk', errorPl);
             });
    function loadShelf() {

        userFactory.getShelf().then(function (pl) {
            $scope.Shelfs = pl.data
            

        },
              function (errorPl) {
                  $log.error('failure loading Shelf', errorPl);
              });

    }
    //Add New Shelf
    $scope.Add = function () {
        var ShelfData = {
            ShelfName: $scope.ShelfName,
            DeskID: $scope.desk
        };
        //If the flag is 1 the it si new record

        var promisePost = userFactory.addShelf(ShelfData);
        promisePost.then(function (pl) {
            var data = pl.data;
            $('#confirmModal').modal('hide');
            loadShelf();
        }, function (err) {
            console.log("Err" + err);
        });

        $scope.ShelfName = "";
        $scope.DeskID = -1;
    };
    //var Shelf = []
    //$scope.Edit = function (shelf) {
    //    Shelf = this.shelf;
    //    $scope.ShelfName = shelf.ShelfName;
    //    $scope.desk = shelf.Desk.ID
    //}
    //Edite Shelf
    $scope.Save = function () {
        var dataID =this.shelf;
        var dataShelf = {
            ShelfName:this.shelf.ShelfName,
            DeskID:this.desk,
            ID: dataID.ID
        };


        var promisePut = userFactory.updateShelf(dataID, dataShelf);
        promisePut.then(function (pl) {
            $('#confirmModal2').modal('show');

            $timeout(function () { $('#confirmModal2').modal('hide'); }, 2000);
            loadShelf();
        }, function (err) {
            console.log("Err" + err);
        });
        $scope.ShelfName = "";
        $scope.desk = "";
    }
    //Delete
    $scope.Delete = function () {

        var dataShelf = this.shelf;
        //var x = confirm("Are you sure to delete this Shelf " + dataShelf.ID + " ?");
        //if (!x) {
        //    return false;
        //}
        var promiseDelete = userFactory.deleteShelf(dataShelf);
        promiseDelete.then(function (pl) {
            $('#confirmModal3').modal('hide');
            loadShelf();
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
        $scope.shelf = data;
        $scope.message = this.shelf.ShelfName;
        $('#confirmModal3').modal('show');
    };

});//com


app.service('FacService', function ($http) {
    var Shelf = [];
    var urlShelf = 'http://localhost:1875/api/Shelves/'
    var url = urlShelf + "GetShelves"
    $http.get(url)
       .success(function (data) {

           Shelf = data;
           console.log(Shelf);
       })

    this.isDuplicateShelfName = function (ShelfName) {


        for (var i in Shelf) {

            if (Shelf[i].ShelfName == ShelfName)
                return true;
        }
        return false;
    }

    this.getShelf = function () {
        return Shelf;

    }
})

app.directive('checkShelfName', function (FacService) {
    return {
        restrict: "A",
        require: 'ngModel',
        link: function (scope, ele, attrs, ctrl) {

            ele.bind('blur', function () {
                scope.$apply(function () {
                    console.log("Run in blur!");
                    // Checking to see if the email has been already registered
                    if (FacService.isDuplicateShelfName(scope.ShelfName)) {

                        ctrl.$setValidity('isDuplicateShelfName', false);


                        return scope.ShelfName;;
                    } else {




                        ctrl.$setValidity('isDuplicateShelfName', true);

                        return scope.ShelfName;
                    }
                })
            }


   )
        }
    }
});