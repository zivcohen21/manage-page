'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ui.bootstrap',
  'ngRoute',
  'myApp.manage-page'

]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/'});
}]);
