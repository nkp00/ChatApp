(function (){
var app = angular.module('chat');
app.service('services',function($http){

    this.signup1=function(data,callback){
        $http({
            url: "http://localhost:3000/signup",
            method: "POST",
            data:data
        }).then(result => {
          
            callback(null,result)
        
        }).catch(error => {
           
            callback(error)
        
        })
    }

    this.login1=function(data,callback){
        $http({
            url: "http://localhost:3000/login",
            method: "POST",
            data:data
        }).then(result => {
          
            callback(null,result)
        
        }).catch(error => {
          
            callback(error)
        
        })

    }
    this.forgot1=function(data,callback){
        $http({
            url: "http://localhost:3000/forgot",
            method: "POST",
            data:data
        }).then(result => {

            callback(null,result)
        
        }).catch(error => {
           
            callback(error)
        
        })
    }
    this.forgotId1=function(data,callback){
        $http({
            url: "http://localhost:3000/forgot/"+token2,
            method: "PATCH",
            data:data
        }).then(result => {
            callback(null,result)
        
        }).catch(error => {
            callback(error)
        
        })

    }
    // this.getdata=function(callback){
    //     $http({
    //         url:"http://localhost:3000/get",
    //         method:"GET",
    //      }).then(result => {
    //         callback(null,result)
        
    //      }).catch(error => {
    //         callback(error)
    //    })
        
    // }
  })
})();