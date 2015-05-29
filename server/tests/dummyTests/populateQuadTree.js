var app = require('../../app');
var gpsController = require('../../Controllers/gpsController.js');
var userController = require('../../Controllers/userController.js');
var User = require('../../Models/User.js');
var mocha = require('mocha');


var populateApp = function(num){

  var userArr = [];
//creates an array of dummy users 
  var createDummyUserArr = function(num){ 

    //creates fake userId 
    var userId = function() {
      var id = "";
      while (id.length < 7) {
        id +=  Math.floor(Math.random() * (10 - 1) + 1);
      }
      return id;
    };

    // generates random 10 digit username
    var randomName = function() {
      var name = "";
      var letters = "abcdefghijklmnopqrstuvwxyz";
      for(var i=0; name.length<11; i++){
        var slice = Math.floor(Math.random()*27)
        name += letters.slice(slice, slice+1);
      }
      return name;
    };
    
    //generates random Lat in SF
    var genRndLat = function(){
      var genLat = JSON.stringify(Math.random()*(122.510728 - 122.387475) + 122.387475 * -1);
      return genLat.slice(0, 11);
    }
    //generates random Long in SF
    var genRndLong = function(){
      var genLong = JSON.stringify(Math.random()*(37.808712 - 37.709369) + 37.709369);
      return genLong.slice(0, 9);
    }

    for(var i=0; i<num; i++){
      var createUser = function(){
        var dummyUser = {body: {}}
        dummyUser.body.userId = userId();
        dummyUser.body.x = genRndLong();
        dummyUser.body.y = genRndLat();
        dummyUser.body.username = randomName();
        dummyUser.body.password = randomName();
        // dummyUser.body.inbox = []; 
        userArr.push(dummyUser);
      }();
    }
  };

  createDummyUserArr(num);

  var populateUserDB = function(){
    for(var i=0; i<userArr.length; i++){
      userController.signupUser(userArr[i]);
    }
  }();
  // calls the insertCoords method from gps conroller for all dummy users
  var populateQuadTree = function(){
    for(var i=0; i<userArr.length; i++){
      gpsController.insertCoords(userArr[i]);
    }
  }();


  User.find({}, function(err, res){
    if(err){
      console.log("this the error from pop: ", err);
    } else {
      console.log(res);
    }
  });

  // User.remove({}, function(err, result){
  //   if(err){
  //     console.log(err);
  //   } else {
  //     console.log(result);
  //   }
  // });

};


populateApp(5);


