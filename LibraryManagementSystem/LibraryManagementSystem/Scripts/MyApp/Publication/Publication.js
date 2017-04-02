/// <reference path="../../LibraryService/Service.js" />

app.controller('PublicationCtrl', function ($scope, userFactory,$timeout) {

    $scope.loading = false;
    $scope.addMode = false;

    $scope.toggleEdit = function () {
        this.Pub.editMode = !this.Pub.editMode;
    };

    $scope.toggleAdd = function () {
        $scope.addMode = !$scope.addMode;

    };
    loadPublication();

    //Function to load all Employee records
    function loadPublication() {
        //var promiseGet = 
        userFactory.getPublication().then(function (pl) {
            $scope.Publications = pl.data
           
            console.log($scope.Publications)
        },
              function (errorPl) {
                  $log.error('failure loading Publication', errorPl);
              });

    }
    //Add data
    $scope.Add = function () {
        var PublicationData = {
            PublicationName: $scope.PublicationName,

        };
        //If the flag is 1 the it si new record

        var promisePost = userFactory.addPublication(PublicationData);
        promisePost.then(function (pl) {
            var data = pl.data;
            $('#confirmModal').modal('hide');
            loadPublication();
        }, function (err) {
            console.log("Err" + err);
        });

        $scope.PublicationName = "";
    };


   // Update daTa
    $scope.Save = function () {

        var dataID = this.Pub
        var dataPublication = {
            PublicationName: this.Pub.PublicationName,
            ID: dataID.ID
        };


        var promisePut = userFactory.updatePublication(dataID, dataPublication);
        promisePut.then(function (pl) {
            $('#confirmModal2').modal('show');
            
            $timeout(function () { $('#confirmModal2').modal('hide'); }, 2000);
           
            loadPublication();
        }, function (err) {
            console.log("Err" + err);
        });
        $scope.PublicationName = "";
    }
    //delete
    $scope.Delete = function () {

        var dataPublication = this.Pub;
        var promiseDelete = userFactory.deletePublication(dataPublication);
        promiseDelete.then(function (pl) {
            $('#confirmModal3').modal('hide');
            loadPublication();
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
        $scope.Pub = data;
        $scope.message = this.Pub.PublicationName;
        $('#confirmModal3').modal('show');
    };


});//con

//uniqness
app.service('PublicationService', function ($http) {
    var Publication = [];
    var urlPublication = 'http://localhost:1875/api/Publications/'
    var url = urlPublication + "GetPublications"
    $http.get(url)
       .success(function (data) {

           Publication = data;
           //console.log(Publication);
       })

    this.isDuplicatePublicationName = function (PublicationName) {


        for (var i in Publication) {

            if (Publication[i].PublicationName == PublicationName)
                return true;
        }
        return false;
    }

    this.getPublication = function () {
        return Publication;

    }
})

app.directive('checkPublicationName', function (PublicationService) {
    return {
        restrict: "A",
        require: 'ngModel',
        link: function (scope, ele, attrs, ctrl) {

            ele.bind('blur', function () {
                scope.$apply(function () {
                    console.log("Run in blur!");
                    // Checking to see if the email has been already registered
                    if (PublicationService.isDuplicatePublicationName(scope.PublicationName)) {

                        ctrl.$setValidity('isDuplicatePublicationName', false);


                        return scope.PublicationName;;
                    } else {




                        ctrl.$setValidity('isDuplicatePublicationName', true);

                        return scope.PublicationName;
                    }
                })
            }


   )
        }
    }
});