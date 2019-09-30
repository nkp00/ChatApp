
(function () {


    var socket = io.connect('http://localhost:3000/#!/chat');  
    var app = angular.module('chat');
    app.controller("chatCtrl", main)
    var record = {};               // record is an empty object which will contain the data of sender,receiver and the text message
    var i;
    var loginUser;                 // Storing the current logged in user 
    var contact;                    // Stroing the current receiver

    // Definfing the chatCtrl controller
    function main($http, $location, services, $scope) {

        this.text = '';
        this.data = {};
        this.message = '';
    //  Getting all the registered users data using a GET request
        $http({
            url: "http://localhost:3000/get",
            method: "GET",  
        }).then(result => {
            // callback(null,result)
            for(let i in result.data){
                if(result.data[i].email==loginUser)
               result.data.splice(i,1)
              // console.log(arry)
            }
            $scope.name = result.data

        }).catch(error => {
            // callback(error)
            console.log(error)
        })


// The home page has a Signup and forget Password button defining the routes for them
        this.routeSignup = function () {
            $location.path('/signup')
        }
        this.routeForgot = function () {
            $location.path('/forgot')
        }
// signup fucntion which takes three arguments (user name, email and password)and Creates a new user.
        this.signup = function (name, email, password) {

            this.data = {
                name: name,
                email: email,
                password: password
            }
            services.signup1(this.data, (error, result) => {
                if (error) {
                    console.log(error.data)
                    this.message = error.data
                    alert(error.data)
                }
                if (result) {
                    console.log(result.data.message);
                    this.message = result.data.message;
                    alert(result.data.message);
                    $location.path('/');

                }
            })

        }

// Login function which is taking two arguments (user email and password) and check the data for valid credentials 
        this.login = function (email, password) {
            this.data = {
                email: email,
                password: password
            }
            services.login1(this.data, (error, result) => {
                if (error) {
                    console.log(error.data)
                    this.message = error.data
                    alert(error.data)
                }
                if (result) {
                    flag = true;
                    console.log(result.data.message);
                    this.message = result.data.message;
                    // console.log(this.data)
                    record.sender = this.data.email;
                    loginUser = this.data.email;
                    console.log(record)
                    alert(result.data.message);
                    $location.path('/chat');
                    i = 0;

                }
            })

        }
// forgot function takes an agrument (User email), varifies the email and sends an email to the registered mail to reset the password
        this.forgot = function (email) {
            this.data = {
                email: email
            }
            services.forgot1(this.data, (error, result) => {
                if (error) {
                    console.log(error.data)
                    this.message = error.data
                    alert(error.data)
                }
                if (result) {
                    console.log(result.data.message);
                    this.message = result.data.message;
                    alert(result.data.message);
                    // $location.path('/');

                }
            })

        }
        this.forgotId = function (newpassword, confirmPassword) {
            // console.log("on the upper part")
            this.data = {
                newpassword: newpassword,
                confirmPassword: confirmPassword
            }
            services.forgotId1(this.data, (error, result) => {
                if (error) {
                    console.log(error)
                    this.message = error.data
                    alert(error.data)
                }
                if (result) {
                    console.log(result.data);
                    this.message = result.data;
                    alert(result.data);
                    $location.path('/');

                }
            })
        }
//ChatApp functions
// the send fucntion is associated with the send button, Whenever a user clicks the send button this function gets triggered
// It takes the text message as argument and displays the message


        this.send = function (message) {
            if (!message) {
                alert("please type some message");
            }
            else {
                record.chatHistory = message
                socket.emit('message', {
                    message: record
                })

            }
            this.message = '';
        }
// Whenever a user click on the contacts this function gets triggered it just collects the previous chat history and display that
        this.nameClick = function (item) {
            record.receiver = item.email;
            record.name = item.name;
            record.chatHistory = '';

            this.nam = item.name
            contact = item.email;

            console.log(record)

            socket.emit('message', {
                message: record
            })
        }
        socket.on('message', function (message) {
            // console.log(`nkp${message.chatHistory[0].message}`)
            //console.log(message)
            if ((message.sender === loginUser && message.receiver === contact) || (message.sender === contact && message.receiver === loginUser)) {
                $scope.$apply(() => {
                    $scope.text = message.chatHistory
                })
            }
        })
    }

})()

