"use strict";

angular.module('starter.controllers', [])
.controller('MainCtrl', function ($scope, dataprovider) {
  dataprovider.Dhammapada.then(function(d) { $scope.Book = d; });
})
.controller('VerseCtrl', function ($scope, $state, $stateParams, dataprovider) {
  var current = 0;
  var verse = parseInt($stateParams.verse)
  var succ = function(nr) { return ((nr+1) % 424) };
  var prev = function(nr) { return (424 + (nr-1)) % 424 };
  var loadzero = function(verse) { dataprovider.Verse(verse).then( function(v) { $scope.pagezero= v; })};
  var loadone  = function(verse) { dataprovider.Verse(verse).then( function(v) { $scope.pageone = v; })};
  var loadtwo  = function(verse) { dataprovider.Verse(verse).then( function(v) { $scope.pagetwo = v; })};
  loadzero(verse);
  loadone(succ(verse));
  loadtwo(prev(verse));
 
  var loadpages = function(idx) {
    switch(idx) {
      case 0:
        loadone(succ(verse));
        loadtwo(prev(verse));
        break;
      case 1:
        loadzero(prev(verse));
        loadtwo(succ(verse));
        break;
      case 2:
        loadzero(succ(verse));
        loadone(prev(verse));
        break;
    }
  }

  $scope.story = false;
  $scope.togglestory = function() { $scope.story = !$scope.story; };

  $scope.slideHasChanged = function(index) { 
    if ((!(index == 0 && current == 2) && index < current) || (current == 0 && index == 2)) {
      verse = prev(verse);
      loadpages(index);
    } else {
      verse = succ(verse);
      loadpages(index);
    }
    current = index;
  }
});
