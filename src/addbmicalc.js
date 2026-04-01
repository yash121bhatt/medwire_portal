var myApp=angular.module('myApp',[]);
myApp.controller('myController', function($scope){

  var globalHeight;
 var globalBMI;
  
  $scope.weight=130;
  $scope.feet=5;
  $scope.inches=9;

  
  
  $scope.convertHeight=function(feet, inches){
    var convertedHeight = (feet*12)+inches;
   $scope.globalHeight = convertedHeight;  /*<------------------------must define as scope variable*/
    return convertedHeight;
  };
  
  $scope.calcBMI=function(globalHeight, weight){
    var bmi=((weight/Math.pow(globalHeight,2))*703),
        globalBMI=bmi;
    $scope.test=globalBMI;
    return bmi.toFixed(2);
  };
  
  $scope.globalBMI=globalBMI;
  
  
  /*why wont this work when I pass in globalBMI as parameter?*/
  
  $scope.categorize=function(globalHeight, weight){
    var bmi=((weight/Math.pow(globalHeight,2))*703);
   var category;
    if(bmi>30){
      category="obese";
  } else if(bmi>25 && bmi<29.99) {
   category="overweight";
  }else if(bmi>18.5 && bmi<24.99) {
   category="healthy";
  }else if(bmi<18.5) {
   category="underweight";
  };
    return category;
  };
  
   
   
  
  

  
  
});
  
  
  
