/// <reference path="../../LibraryService/Service.js" />




app.controller('CategoryCtrl', function ($scope, userFactory, $timeout) {

    $scope.loading = false;
    $scope.addMode = false;

    $scope.toggleEdit = function () {
        this.Cat.editMode = !this.Cat.editMode;
    };

    $scope.toggleAdd = function () {
        $scope.addMode = !$scope.addMode;

    };


    loadCategory();

    //Function to load all Employee records
    function loadCategory() {
        //var promiseGet = 
        userFactory.getCategory().then(function (pl) {
            $scope.Categorys = pl.data
         
            console.log($scope.Categorys)
        },
              function (errorPl) {
                  $log.error('failure loading Category', errorPl);
              });

    }

    $scope.Add = function () {
        var CategoryData = {
            CategoryName: $scope.CategoryName,

        };
        //If the flag is 1 the it si new record

        var promisePost = userFactory.addCategory(CategoryData);
        promisePost.then(function (pl) {
            var data = pl.data;
            $('#confirmModal').modal('hide');
            loadCategory();
        }, function (err) {
            console.log("Err" + err);
        });

        $scope.CategoryName = "";
    };

    //var Category = []
    //$scope.Edit = function (Cat) {
    //    Category = this.Cat;
    //    $scope.CategoryName = Cat.CategoryName;

    //}
    //Update Data
    $scope.Save = function () {
        var dataID = this.Cat
        var dataCategory = {
            CategoryName: this.Cat.CategoryName,
            ID: dataID.ID
        };


        var promisePut = userFactory.updateCategory(dataID, dataCategory);
        promisePut.then(function (pl) {
            $('#confirmModal2').modal('show');
            //$scope.message = this.dep.DepartmentName;
            $timeout(function () { $('#confirmModal2').modal('hide'); }, 2000);
            //alert("Updated Successfuly");
            loadCategory();
        }, function (err) {
            console.log("Err" + err);
        });
        $scope.CategoryName = "";
    }

    //delete
    $scope.Delete = function () {

        var dataCategory = this.Cat;
        //var x = confirm("Are you sure to delete this Category " + dataCategory.ID + " ?");
        //if (!x) {
        //    return false;
        //}
        var promiseDelete = userFactory.deleteCategory(dataCategory);
        promiseDelete.then(function (pl) {
            $('#confirmModal3').modal('hide');
            loadCategory();
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
        $scope.Cat = data;
        $scope.message = this.Cat.CategoryName;
        $('#confirmModal3').modal('show');
    };


});//con

//Uniqness

app.service('CategoryService', function ($http) {
    var Category = [];
    var urlCategory = 'http://localhost:1875/api/Categories/'
    var url = urlCategory + "GetCategories"
    $http.get(url)
       .success(function (data) {

           Category = data;
           //console.log(Category);
       })

    this.isDuplicateCategoryName = function (CategoryName) {


        for (var i in Category) {

            if (Category[i].CategoryName == CategoryName)
                return true;
        }
        return false;
    }

    this.getCategory = function () {
        return Category;

    }
})

app.directive('checkCategoryName', function (CategoryService) {
    return {
        restrict: "A",
        require: 'ngModel',
        link: function (scope, ele, attrs, ctrl) {

            ele.bind('blur', function () {
                scope.$apply(function () {
                    console.log("Run in blur!");
                    // Checking to see if the email has been already registered
                    if (CategoryService.isDuplicateCategoryName(scope.CategoryName)) {

                        ctrl.$setValidity('isDuplicateCategoryName', false);


                        return scope.CategoryName;;
                    } else {




                        ctrl.$setValidity('isDuplicateCategoryName', true);

                        return scope.CategoryName;
                    }
                })
            }


   )
        }
    }
});