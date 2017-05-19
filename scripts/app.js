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

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "blogs/blogs.html"
        })
        .when("/blogs", {
            templateUrl : "blogs/blogs.html"
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
            templateUrl : "me/contact.html"
        });
});