/// <reference path="../angular.js" />
var app = angular.module('LibraryModule', ["ngRoute"]);

$(document).ready(function () {
    $('#signOut').hide();
});


app.config(['$httpProvider', function ($httpProvider) {
    var interceptor = function ($q, $window, $scope) {
        return {
            request: function (config) {
                var access_token = sessionStorage.getItem('accessToken');
                var userRole = sessionStorage.getItem('userRoles');
                //if (access_token != null && userRole == "Student") {
                //    config.headers['Authorization'] = 'Bearer ' + access_token;
                //    window.location.href = "#Student";
                //}
                //if (access_token != null && userRole == "Teacher") {
                //    config.headers['Authorization'] = 'Bearer ' + access_token;
                //    window.location.href = "#Teacher";
                //}
                //if (access_token != null && userRole == "Librarian") {
                //    config.headers['Authorization'] = 'Bearer ' + access_token;
                //    window.location.href = "../AdminMasterPage.html#/";
                //}
                //    if (userRole == null && access_token == null) {                    
                //        window.location.href = "../MasterPage.html#/";
                //    }
                //else {
                //    window.location.href = "../MasterPage.html#/";
                //}
                if (access_token != null) {
                    config.headers['Authorization'] = 'Bearer ' + access_token;

                }
                return config;
            },
            responseError: function (rejection) {
                if (rejection.status === 401 || rejection.status === 403) {
                    $window.location.href = "#UserLogin";
                    return $q.reject(rejection);
                }
                return $q.reject(rejection);
            }
        }
    }
    var params = ['$q', '$window'];
    interceptor.$inject = params;
    $httpProvider.interceptors.push(interceptor);
}]);

//==================

app.config(function ($routeProvider) {
    $routeProvider
      .when("/", {
          templateUrl: "../Template/UserLogin.html", controller: "UserCtrl"
      })
      .when("/Student", {
          templateUrl: "../Template/StudentRegistrationPage.html", controller: "UserCtrl"
      })
      .when("/Teacher", {
          templateUrl: "../Template/TeacherRegistrationPage.html", controller: "UserCtrl"
      })
        .when("/Librarian", {
            templateUrl: "../Template/LibrarianRegistrationPage.html", controller: "UserCtrl"
        })
        .when("/UserLogin", {
            templateUrl: "../Template/UserLogin.html", controller: "UserCtrl"
        })
        .when("/UserProfile", {
            templateUrl: "../Template/UserProfile.html", controller: "UserCtrl"
        })
        .when("/StudentHome", {
            templateUrl: "../StudentPanel.html", controller: "UserCtrl"
        })
        .when("/TeacherHome", {
            templateUrl: "../TeacherPanel.html", controller: "UserCtrl"
        })
        //.when("/Admin", {
        //    templateUrl: "../TeacherPanel.html", controller: "UserCtrl"
        //})
        .when("/CheckingID", {
            templateUrl: "../Template/CheckingID.html", controller: "UserCtrl"
        })
        .when("/MyAccount", {
            templateUrl: "../Template/UserProfile.html", controller: "UserCtrl"
        })        
        .when("/Loan", {
            templateUrl: "../Template/UserProfile.html", controller: "UserCtrl"
        })
        .when("/AdvanceSearch", {
            templateUrl: "../Template/AdvanceSearch.html", controller: "AdvanceBookSearchCtrl"
        })    
        .when("/Index", {
        templateUrl: "../Template/Index.html", controller: "BookSearchCtrl"
    })
});


//==================

var urlAuthor = 'http://localhost:1875/api/Authors/';
var urlCategory = 'http://localhost:1875/api/Categories/';
var urlDesk = 'http://localhost:1875/api/Desks/';
var urlPublication = 'http://localhost:1875/api/Publications/';
var urlLibraryBuildingLevel = 'http://localhost:1875/api/LibraryBuildingLevels/';
var urlShelf = 'http://localhost:1875/api/Shelves/';
var urlBook = 'http://localhost:1875/api/Books/';
var urlUserType = 'http://localhost:1875/api/UserTypes/';
var urlUser = 'http://localhost:1875/api/Users/';
var urlUserIssuedBook = 'http://localhost:1875/api/UserIssuedBooks/';

var accesstoken = sessionStorage.getItem('accessToken');

var authHeaders = {};




app.factory('userFactory', function ($http) {
    return {
        //Author
        getAuthor: function () {
            url = urlAuthor + "GetAuthors";
            return $http.get(url);
        },
        addAuthor: function (dataAuthor) {
            url = urlAuthor + "PostAuthor";
            return $http.post(url, dataAuthor);
        },
        deleteAuthor: function (dataAuthor) {
            url = urlAuthor + dataAuthor.ID;
            return $http.delete(url);
        },
        updateAuthor: function (dataID, dataAuthor) {
            url = urlAuthor + dataID.ID;
            return $http.put(url, dataAuthor)
        },
        checkUnique: function () {
            url = urlAuthor + "checkUnique";
            return $http.get(url)
        },


        //Category

        getCategory: function () {
            url = urlCategory + "GetCategories";
            return $http.get(url);
        },
        addCategory: function (dataCategory) {
            url = urlCategory + "PostCategory";
            return $http.post(url, dataCategory);
        },
        deleteCategory: function (dataCategory) {
            url = urlCategory + dataCategory.ID;
            return $http.delete(url);
        },
        updateCategory: function (dataID, dataCategory) {
            url = urlCategory + dataID.ID;
            return $http.put(url, dataCategory)
        },
        //Publication

        getPublication: function () {
            url = urlPublication + "GetPublications";
            return $http.get(url);
        },
        addPublication: function (dataPublication) {
            url = urlPublication + "PostPublication";
            return $http.post(url, dataPublication);
        },
        deletePublication: function (dataPublication) {
            url = urlPublication + dataPublication.ID;
            return $http.delete(url);
        },
        updatePublication: function (dataID, dataPublication) {
            url = urlPublication + dataID.ID;
            return $http.put(url, dataPublication)
        },

        ////Desk
        getDesk: function () {
            url = urlDesk + "GetDesks";
            return $http.get(url);
        },
        addDesk: function (dataDesk) {
            url = urlDesk + "PostDesk";
            return $http.post(url, dataDesk);
        },
        deleteDesk: function (dataDesk) {
            url = urlDesk + dataDesk.ID;
            return $http.delete(url);
        },
        updateDesk: function (dataID, dataDesk) {
            url = urlDesk + dataID.ID;
            return $http.put(url, dataDesk)
        },
        DeskByLevelID: function (level) {
            url = urlDesk + "DeskByLevelID?id=" + level;
            return $http.get(url);
        },


        ////LibraryBuildingLevel


        getLibraryBuildingLevel: function () {
            url = urlLibraryBuildingLevel + "GetLibraryBuildingLevels";
            return $http.get(url);
        },
        addLibraryBuildingLevel: function (dataLibraryBuildingLevel) {
            url = urlLibraryBuildingLevel + "PostLibraryBuildingLevel";
            return $http.post(url, dataLibraryBuildingLevel);
        },
        deleteLibraryBuildingLevel: function (dataLibraryBuildingLevel) {
            url = urlLibraryBuildingLevel + dataLibraryBuildingLevel.ID;
            return $http.delete(url);
        },
        updateLibraryBuildingLevel: function (dataID, dataLibraryBuildingLevel) {
            url = urlLibraryBuildingLevel + dataID.ID;
            return $http.put(url, dataLibraryBuildingLevel)
        },

        ////Shelf
        getShelf: function () {
            url = urlShelf + "GetShelves";
            return $http.get(url);
        },
        addShelf: function (dataShelf) {
            url = urlShelf + "PostShelf";
            return $http.post(url, dataShelf);
        },
        deleteShelf: function (dataShelf) {
            url = urlShelf + dataShelf.ID;
            return $http.delete(url);
        },
        updateShelf: function (dataID, dataShelf) {
            url = urlShelf + dataID.ID;
            return $http.put(url, dataShelf)
        },
        ShelfByDeskID: function (desk) {
            url = urlShelf + "ShelfByDeskID?id=" + desk;
            return $http.get(url);
        },

        ////Book

        getBook: function () {
            url = urlBook + "GetBooks";
            return $http.get(url);
        },
        addBook: function (dataBook) {
            url = urlBook + "PostBook";
            return $http.post(url, dataBook);
        },
        deleteBook: function (dataBook) {
            url = urlBook + dataBook.ID;
            return $http.delete(url);
        },
        updateBook: function (dataBook) {
            url = urlBook + dataBook.ID;
            return $http.put(url, dataBook)
        },
        getBookByID: function (dataID) {
            url = urlBook + dataID;
            return $http.get(url)
        },
        getSearchBook: function (dataBook) {
            url = urlBook + "GetBookBySearch?Value=" + dataBook;
            return $http.get(url)
        },
        getSearchSpecificBook: function (bookData) {
            url = urlBook + "BookBySpecificSearch?" + bookData.Coumn + "=" + bookData.Value;
            return $http.get(url)
        },

        getBookForIssued: function (bookData) {
            url = urlBook + "BookForIssued?" + bookData.Column + "=" + bookData.Value;
            return $http.get(url)
        },
        getBookForUpdateStock: function (bookData) {
            url = urlBook + "UpDateBookStock?" + bookData.Column + "=" + bookData.Value;
            return $http.get(url)
        },
        getIssuedBookReport: function (bookData) {
            url = urlBook + "GetIssuedBookReport?FromDate=" + bookData.FromDate + "&ToDate=" + bookData.ToDate + "&isIssued=" + bookData.isIssued;
            return $http.get(url);
        },
        getBookReportByBookName: function (bookData) {
            url = urlBook + "GetBookByBookName?FromDate=" + bookData.FromDate + "&ToDate=" + bookData.ToDate + "&dropColumn=" + bookData.dropColumn;
            return $http.get(url);
        },
        ////UserType
        getUserType: function () {
            url = urlUserType + "GetUserTypes";
            return $http.get(url);
        },
        addUserType: function (dataUserType) {
            url = urlUserType + "PostUserType";
            return $http.post(url, dataUserType);
        },
        deleteUserType: function (dataUserType) {
            url = urlUserType + dataUserType.ID;
            return $http.delete(url);
        },
        updateUserType: function (dataID, dataUserType) {
            url = urlUserType + dataID.ID;
            return $http.put(url, dataUserType)
        },

        ////User

        getUser: function () {
            url = urlUser + "GetUsers";
            return $http.get(url);
        },
        addUser: function (dataUser) {
            url = urlUser + "PostUser";
            return $http.post(url, dataUser);
        },
        deleteUser: function (dataUser) {
            url = urlUser + dataUser.ID;
            return $http.delete(url);
        },
        updateUser: function (dataID, dataUser) {
            url = urlUser + dataID.ID;
            return $http.put(url, dataUser)
        },

        getUserByRegNo: function (dataUser) {
            url = urlUser + "GetUserByRegNo?RegNo=" + dataUser;
            return $http.get(url)
        },

        getUserByUserName: function (dataUser) {
            url = urlUser + "GetUserByUserName?UserName=" + dataUser;
            return $http.get(url)
        },
        getUserRoles: function () {
            url = urlUser + "GetUserRole";
            return $http.get(url);
        },
        getUserByEmail:function(UserData)
        {
            url = urlUser + "GetUserByEmail?Email=" + UserData;
            return $http.get(url);
        },
        //User Issued Book

        getUserIssuedBook: function (RegNo) {
            url = urlUserIssuedBook + "GetUserIssuedDetails?RegNo=" + RegNo;
            return $http.get(url);
        },
        getUserIssuedBookByUserName: function (UserName) {
            url = urlUserIssuedBook + "GetUserIssuedDetailsByUserName?UserName=" + UserName;
            return $http.get(url);
        },
        getIssuedUser: function (RegNo) {
            url = urlUserIssuedBook + "GetBookIssuedUser?RegNo=" + RegNo;
            return $http.get(url);
        },
        addUserIssuedBook: function (dataUserIssuedBook) {
            urlBook = urlUserIssuedBook + "PostUserIssuedBook";
            return $http.post(urlBook, dataUserIssuedBook);
        },
        updateUserReturnBook: function (dataUserIssuedBook) {
            url = urlUserIssuedBook + dataUserIssuedBook.ID;
            return $http.put(url, dataUserIssuedBook)
        },
        getIssuedBookByUserID: function (IssuedData) {
            url = urlUserIssuedBook + "GetIssedUser?UserID=" + IssuedData.UserID + "&BookID=" + IssuedData.BookID;

            return $http.get(url)
        },
    };

});