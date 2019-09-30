// import { param } from "express-validator/check";
var token2;
var flag;
var text;

let module = angular.module("chat", ['ngRoute']);


module.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'templates/home.html',
           controller:'chatCtrl as ctrl'
        })
        .when('/login', {
            templateUrl: 'login.html',
            controller: 'chatCtrl as ctrl'
        })
        .when('/signup', {
            templateUrl: 'templates/signup.html',
            controller: 'chatCtrl as ctrl'
        })
        .when('/forgot', {
            templateUrl: 'templates/forgot.html',
            controller: 'chatCtrl as ctrl'
        })
        .when('/forgot/:id', {
            templateUrl: "templates/forgottoken.html",
            controller: 'chatCtrl as ctrl',
            resolve: {
                result: function ($route, $location) {
                    token2 = $route.current.params.id;
                    if ($route.current.params.id != null) {
                        return true;
                    }
                    else
                        $location.path('/');
                }
            }
          
        })
        .when('/chat',{
            templateUrl:"templates/chat.html",
            controller: 'chatCtrl as ctrl'
     })
})









/*



module.controller("chatCtrl", main)

function main($http, $location) {

    //this.token2='';
    this.text = '';
    this.data = {};
    this.message = '';
    this.routeSignup = function () {
        $location.path('/signup')
    }
    this.routeForgot = function () {
        $location.path('/forgot')
    }
    this.signup = function (name,email, password) {

        this.data = {
            name:name,
            email: email,
            password: password
        }
        $http({
            url: "http://localhost:3000/signup",
            method: "POST",
            data: this.data
        }).then(result => {
            console.log(result.data.message);
            this.message = result.data.message;
            alert(result.data.message);
            $location.path('/');

        }).catch(error => {
            console.log(error.data)
            this.message = error.data
            alert(error.data);

        })
    }

    this.login = function (email, password) {
        this.data = {
            email: email,
            password: password
        }
        $http({
            url: "http://localhost:3000/login",
            method: "POST",
            data: this.data
        }).then(result => {
            $http.defaults.headers.common['Authorization'] = result.data.Token
            console.log(result.data.message);
            this.message = result.data.message;
            alert(result.data.message);
            $location.path('/chat')
        }).catch(error => {
            console.log(error.data);
            this.message = error.data;
            this.message = error.data;
            alert(error.data)
        })
    }

    this.forgot = function (email) {
        this.data = {
            email: email
        }
        $http({
            url: "http://localhost:3000/forgot",
            method: "POST",
            data: this.data
        }).then(result => {
            // console.log(result)
            $http.defaults.headers.common['Authorization'] = result.data.Token
            token2 = result.data.Token;
            console.log(token2)
            // console.log(result.data.message)
            alert(result.data.message);
            this.message = result.data.message;
        }).catch(error => {
            console.log(error.data)
            alert(error.data)
            this.message = error.data
        })

    }
    this.forgotId = function (newpassword,confirmPassword) {
        this.data = {
            newpassword: newpassword,
            confirmPassword:confirmPassword
            //Token: token2
        }
        $http({
            url: 'http://localhost:3000/forgot/' + token2,
            method: "PATCH",
            data: this.data
        }).then(result => {
            console.log(result)
            alert(result.data);
            this.message = result.data;
            $location.path('/')
        }).catch(error => {
            console.log(error.data)
            alert(error.data)
        })
    }
}

*/