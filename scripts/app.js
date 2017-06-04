/**
 * Created by Kamdjou on 5/18/2017.
 */

var app = angular.module('myApp', ['ngRoute']);

//factory for all the data of the application
app.factory('BlogsService', ['$filter', function($filter) {
    var blogs = [
                    {
                        id: 201705191,  //this is generated using the following format: year-month-day-increamental_value_starting_with_1
                        title: "Benefits of using CSS-Preprocessors over Traditional CSS",
                        url_title: "Benefits_of_using_CSS-Preprocessors_over_Traditional_CSS",
                        description: "Professional developers have switch today to using CSS-preprocessor stylesheets. But, this does not exclude the facts that, many other developers are still wondering if they should make the switch over to using a CSS-preprocessor like SASS , LESS and Stylus instead of just plain CSS. Over these three most popular CSS-Preprocessor, We will focus more on SASS to illustrate the advantage of CSS-Preprocessors over Traditional CSS. In this article I will start with by answering; What is css-preprocessor ? And then followed by sharing with you a few reasons that convinced me to make the switch over to using SASS for all my projects.",
                        question1: "What is css-preprocessor stylesheet?",
                        answer1: "First of all, preprocessor is a program that takes one type of data and converts it to another type of data. In the case of HTML and CSS, some of the more popular preprocessor languages include Haml and Sass . Haml is processed into HTML and Sass is processed into CSS. So, css-preprocessor is just the conversion of sass, less and stylus files into plain css file. Here we are mentioning the most popular css-preprocessor languages used today as you can see in the figure below.",
                        image1: "./images/blogs/benefit_of_using_SASS_over_CSS/sass-vs-css.jpg",
                        image2: "./images/blogs/benefit_of_using_SASS_over_CSS/sass-vs-less-css.jpg",
                        created_at: "Friday, May 19, 2017"
                    }
                ];

    blogs.getall = function() {
        return blogs;
    }

    blogs.getOne = function(id) {
        return $filter('filter')(blogs, {'id': id});
    }

    return blogs;
}]);


//main controller
app.controller('mainCtrl', ['$scope','$location', function($scope,$location) {
    //get the clicked menu activated
    $scope.menuClass = function(page) {
        var current = $location.path().substring(1);
        return page === current ? "is-active" : "";
    };
}]);

//controller to handle the blogs listing
app.controller("BlogsCtrl", ['$scope', 'BlogsService', function ($scope, BlogsService) {
    $scope.blogs = BlogsService.getall();
}]);

//controller to handle the deteals of a blog
app.controller("BlogCtrl", ['$scope', '$routeParams', 'BlogsService', function ($scope, $routeParams, BlogsService) {
    var id = $routeParams.id;
    var blog = BlogsService.getOne(id);
    $scope.blog = blog[0];
}]);

//controller to handle the detail of the contact form
app.controller('ContactCtrl', ['$scope', '$http', '$timeout', '$route', function($scope, $http, $timeout, $route) {
    $route.reload();
    $scope.success = false;
    $scope.error = false;
    $scope.sent = function(){
        $http({
            method: "POST",
            url: "envoi.php",
            data: $.param($scope.form),  // pass in data as strings
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function(data) {
            console.log(data);
            if (!data.success) {
                $scope.error = !data.success;
                $timeout(function () { $scope.error = false; }, 4000);
            }
            else {
                console.log(data);
                $scope.success = data.success;
                $timeout(function () { $scope.success = false; }, 4000);
                $scope.form = {};
            }
        }).error(function(data) {
            $scope.error = !data.success;
            $timeout(function () { $scope.error = false; }, 4000);
        });
    }
}]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "blogs/blogs.html",
            controller  : "BlogsCtrl"
        })
        .when("/about", {
            templateUrl : "me/about.html"
        })
        .when("/portfolios", {
            templateUrl : "portfolios/portfolios.html"
        })
        .when("/portfolios/:id", {
            templateUrl : "portfolios/portfolio.html"
        })
        .when("/blogs", {
            templateUrl : "blogs/blogs.html",
            controller  : "BlogsCtrl"
        })
        .when("/blogs/:id/:title", {
            templateUrl : "blogs/blog.html",
            controller  : "BlogCtrl"
        })
        .when("/contact", {
            templateUrl : "me/contact.html",
            controller  : "ContactCtrl"
        });
});