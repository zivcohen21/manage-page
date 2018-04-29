'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope, $http) {
    $http.get('https://cs1.iridize.com/api/latest/app/8MXQlGj6R8Ogx2PohL9E+w/guide/',  {
        headers: {'Authorization': 'Basic ZWxld2luc286RXlhbDMwMDc='}
    })
        .then(function successCallback(response) {
            //console.log("successCallback:" + JSON.stringify(response));
            $scope.data = response.data;

        }, function errorCallback(response) {
            //console.log("errorCallback:" + JSON.stringify(response));
        });
});