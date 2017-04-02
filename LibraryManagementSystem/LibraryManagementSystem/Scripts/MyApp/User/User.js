/// <reference path="../../LibraryService/Service.js" />
/// <reference path="../../jquery-3.1.0.js" />

app.service('loginservice', function ($http) {

    this.login = function (userlogin) {

        var resp = $http({
            //url: "http://localhost:1875/Token",
            //method: "POST",
            //data: $.param({ grant_type: 'password', username: userlogin.username, password: userlogin.password }),
            //headers: {
            //    'Content-Type': 'application/x-www-form-urlencoded'
            //}
            url: 'http://localhost:1875/Token',
            method: 'Post',
            contentType: 'application/json',
            data: $.param({
                grant_type: 'password',
                username: userlogin.username,
                password: userlogin.password
            })
        });
        return resp;
    };
});



app.controller('UserCtrl', function ($scope, $log, userFactory, $http, loginservice, FileUploadService, $timeout) {
    //$(document).ready(function myfunction() {
    //    $('.sidebar-menu').hide();
    //})
    $scope.LoadData = function () {
        var ID = $scope.IdentityID;
        if ($scope.usertype == "Student") {
            $http.get('http://localhost:3275/odata/Students?$filter=StudentIdentityID%20eq%20' + ID)
                .success(function (data) {
                    var stData = data.value
                    var count = 0;
                    for (var k in stData) {
                        if (stData.hasOwnProperty(k)) {
                            ++count;
                        }
                    }
                    if (count < 2 && count > 0) {
                        $scope.student = stData[0].StudentIdentityID;
                        if ($scope.student == ID) {
                            window.location.href = "#Student";
                        }
                    }

                    else {
                        alert("Identity ID doesnt exist!")
                    }
                })
                .error(function (err) {
                    alert("Identity ID doesnt exist!")
                })
            //window.location.href = "#Student";
        }
        else if ($scope.usertype == 'Teacher') {
            $http.get('http://localhost:3275/odata/Teachers?$filter=TeacherIdentityID%20eq%20' + ID).success(function (data) {
                var stData = data.value
                var count = 0;
                for (var k in stData) {
                    if (stData.hasOwnProperty(k)) {
                        ++count;
                    }
                }
                if (count < 2 && count > 0) {
                    $scope.Teacher = stData[0].TeacherIdentityID;
                    if ($scope.Teacher == ID) {
                        window.location.href = "#Teacher";
                    }
                }

                else {
                    alert("Identity ID doesnt exist!")
                }
            })
              .error(function (err) {
                  alert("Identity ID doesnt exist!")
              })
                        //window.location.href = "#Teacher";
        }
        else if ($scope.usertype == 'Librarian') {
            $http.get('http://localhost:3275/odata/Librarians?$filter=LibrarianIdentityID%20eq%20' + ID).success(function (data) {
                var stData = data.value
                var count = 0;
                for (var k in stData) {
                    if (stData.hasOwnProperty(k)) {
                        ++count;
                    }
                }
                if (count < 2 && count > 0) {
                    $scope.Librarian = stData[0].LibrarianIdentityID;
                    if ($scope.Librarian == ID) {
                        window.location.href = "#Librarian";
                    }
                    
                }

                else {
                    alert("Identity ID doesnt exist!")
                }
            })
               .error(function (err) {
                   alert("Identity ID doesnt exist!")
               })
            //window.location.href = "#Librarian";
        }
    }
        
    
    $scope.users = {};

    function GetUser() {
        
 var UserData= $scope.Email

        userFactory.getUserByEmail(UserData).then(function (pl) {
            $scope.user = pl.data
            //console.log($scope.user)
            //$scope.$watchCollection('user', function (newVal) {
            //    $scope.filteredItems = $filter('filter')(newVal, $scope.regNoText);
            //});

        },
             function (errorPl) {
                 $log.error('failure loading Desk', errorPl);
             });
    }
   

    //$scope.Add = function () {
       

        
    //};
    //var User = []
    //$scope.Edit = function (user) {
    //    User = this.user;
    //    $scope.UserName = user.UserName;
    //    $scope.RegistrationNo = user.RegistrationNo;
    //    $scope.Address = user.Address;
    //    $scope.Email = user.Email;
    //    $scope.Password = user.Password;
    //    $scope.IdentityID = user.IdentityID;
    //    $scope.usertype = user.UserType.UserTypeName;

    //}
    //$scope.Save = function () {
    //    var dataID = User
    //    var UserData = {
    //        UserName: $scope.UserName,
    //        RegistrationNo: $scope.RegistrationNo,
    //        Address: $scope.Address,
    //        Email: $scope.Email,
    //        Password: $scope.Password,
    //        IdentityID: $scope.IdentityID,
    //        UserTypeID: $scope.usertype

    //    };


    //    var promisePut = userFactory.updateUser(dataID, dataUser);
    //    promisePut.then(function (pl) {
    //        alert("Updated Successfuly");
    //        loadUser();
    //    }, function (err) {
    //        console.log("Err" + err);
    //    });
    //    $scope.UserName = "";
    //}

    //$scope.Delete = function () {

    //    var dataUser = this.user;
    //    var x = confirm("Are you sure to delete this User " + dataUser.ID + " ?");
    //    if (!x) {
    //        return false;
    //    }
    //    var promiseDelete = userFactory.deleteUser(dataUser);
    //    promiseDelete.then(function (pl) {

    //        loadUser();
    //    }, function (err) {
    //        console.log("Err" + err);
    //    });
    //}    

    $scope.redirect = function () {
        window.location.href = '/Dashboard/Index';
    };    

    $scope.login = function () {
        var userLogin = {
            grant_type: 'password',
            username: $scope.userLoginEmail,
            password: $scope.userLoginPassword
        };

        var promiselogin = loginservice.login(userLogin);

        promiselogin.then(function (resp) {

            $scope.userName = resp.data.userName;
            sessionStorage.setItem('userName', resp.data.userName);
            sessionStorage.setItem('accessToken', resp.data.access_token);
            sessionStorage.setItem('refreshToken', resp.data.refresh_token);

            var userRoles = userFactory.getUserRoles();
            userRoles.then(function (resp) {            
                //alert("Data: " + resp.data["value"]);
                //alert("Data: " + resp.data["value"][0]);
                sessionStorage.setItem('userRoles', resp.data);
                var role = sessionStorage.getItem('userRoles');
                if (role == 'Student') {
                    window.location.href = "#StudentHome";
                    $('.sidebar-menu').show();
                }
                if (role == 'Teacher') {
                    window.location.href = "#TeacherHome";
                    $('.sidebar-menu').show();
                }
                if (role == 'Librarian') {
                    window.location.href = "../AdminMasterPage.html#/";
                }
                // if your want to redirect different dashboard then check it here
                //window.location.href = '/Dashboard/Index';
                
            }, function (err) { alert("Error: " + err.status + "\n" + err); });


        }, function (err) {

            $scope.responseData = "Error " + err.status;
        });
    }

    //============================Image Upload=================================//

    //Declarationa and Function for Image Upload and Save Data
    //--------------------------------------------
    // Variables
    $scope.Message = "";
    $scope.FileInvalidMessage = "";
    $scope.SelectedFileForUpload = null;
    $scope.FileDescription_TR = "";
    $scope.IsFormSubmitted = false;
    $scope.IsFileValid = false;
    $scope.IsFormValid = false;

    //Form Validation
    $scope.$watch("form.$valid", function (isValid) {
        $scope.IsFormValid = isValid;
    });


    // THIS IS REQUIRED AS File Control is not supported 2 way binding features of Angular
    // ------------------------------------------------------------------------------------
    //File Validation
    $scope.ChechFileValid = function (file) {
        var isValid = false;
        if ($scope.SelectedFileForUpload != null) {

            if ((file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif') && file.size <= (1600 * 1200)) {
                $scope.FileInvalidMessage = "";
                isValid = true;
            }
            else {
                $scope.FileInvalidMessage = "Only JPEG/PNG/Gif Image can be upload )";
            }
        }
        else {
            $scope.FileInvalidMessage = "Image required!";
        }
        $scope.IsFileValid = isValid;

    };

    //File Select event 
    $scope.selectFileforUpload = function (file) {

        var files = file[0];
        $scope.Imagename = files.name;

        $scope.SelectedFileForUpload = file[0];


    }
    //----------------------------------------------------------------------------------------

    //Save File
    $scope.SaveFile = function () {
        $scope.IsFormSubmitted = true;

        $scope.Message = "";

        $scope.ChechFileValid($scope.SelectedFileForUpload);

        if ($scope.IsFormValid && $scope.IsFileValid) {

            FileUploadService.UploadFile($scope.SelectedFileForUpload).then(function (d) {
                var photourl = d.replace(/\"/g, "");
                var usertype = document.getElementById("Usertype").value;
                var UserData = {
                    Name: $scope.Name,
                    Address: $scope.Address,
                    Email: $scope.Email,
                    Password: $scope.Password,
                    IdentityID: $scope.IdentityID,
                    UserTypeID: usertype,
                    PhoneNumber: $scope.PhoneNumber,
                    PhotoUrl: photourl
                };
                //If the flag is 1 the it si new record

                var promisePost = userFactory.addUser(UserData);
                promisePost.then(function (pl) {
                    var data = pl.data;
                    GetUser();
                    $('#confirmModal2').modal('show');
                    //$timeout(function () { $('#confirmModal2').modal('hide'); }, 2000);
                    $('#confirmModal2').on('hidden.bs.modal', function () {
                        window.location.href = "#UserLogin";
                    });
                    //loadUser();
                    //window.location.href = "#UserLogin";
                }, function (err) {
                    console.log("Err" + err);
                });



                //$http.post('/api/Image/', ItmDetails).success(function (data) {
                //    alert("Added Successfully!!");
                //    $scope.addMode = false;
                //    $scope.Images.push(data);
                //    $scope.loading = false;
                //}).error(function (data) {
                //    $scope.error = "An Error has occured while Adding Customer! " + data;
                //    $scope.loading = false;
                //});
                //alert(d.Message + " Item Saved!");
                $scope.IsFormSubmitted = false;
                ClearForm();

            }, function (e) {
                alert(e);
            });
        }
        else {
            $scope.Message = "All the fields are required.";
        }

    };
    //Clear form 
    function ClearForm() {

        $scope.Imagename = "";

        $scope.Description = "";


        angular.forEach(angular.element("input[type='file']"), function (inputElem) {
            angular.element(inputElem).val(null);
        });

        $scope.form.$setPristine();
        $scope.IsFormSubmitted = false;
    }



    //============================Image Upload End=================================//

    //============
});





//app.service('FacService', function ($http,$scope) {
//    var emails = [];
//    var ID=$scope.IdentityID
//    $http.get("http://localhost:2795/odata/Student?$filter=" + ID)
//       .success(function (data) {

//           id = data.value;
//           if (id == ID)
//           {
               
//           }
//           console.log(id);
//       })

//    this.isDuplicateEmail = function () {


//        for (var i in emails) {

//            if (emails[i].Email == Email)
//                return true;
//        }
//        return false;
//    }

//    this.getEmail = function () {
//        return emails;

//    }
//})

//app.directive('checkEmail', function (FacService) {
//    return {
//        restrict: "A",
//        require: 'ngModel',
//        link: function (scope, ele, attrs, ctrl) {

//            ele.bind('blur', function () {
//                scope.$apply(function () {
//                    console.log("Run in blur!");
//                     Checking to see if the email has been already registered
//                    if (FacService.isDuplicateEmail(scope.Email)) {

//                        ctrl.$setValidity('isDuplicateEmail', false);


//                        return scope.Email;;
//                    } else {




//                        ctrl.$setValidity('isDuplicateEmail', true);

//                        return scope.Email;
//                    }
//                })
//            }


//   )
//        }
//    }
//});


//=============



app.factory('FileUploadService', function ($http, $q) {

    var fac = {};
    fac.UploadFile = function (file) {
        var formData = new FormData();
        formData.append("file", file);

        var defer = $q.defer();
        $http.post("http://localhost:1875/api/Users/UploadPhoto", formData,
            {
                withCredentials: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            })
        .success(function (d) {
            defer.resolve(d);
        })
        .error(function () {
            defer.reject("File Upload Failed!");
        });

        return defer.promise;

    }
    return fac;

    //---------------------------------------------
    //End of Image Upload and Insert record

    // This Method IS TO save image name


});