
var app = angular.module("chatApp",[]);
var socket = io.connect("http://127.0.0.1:8080");

app.controller("chatController",function ($scope) {
    $scope.messages=[];

   console.log("chat");
   $scope.chat = {};
   $scope.send = function (data) {
       socket.emit('input',{"name": $scope.chat.username, "message":$scope.chat.message})
   }
   
   socket.on('output',function (data) {
       $scope.messages = data;
   })
});