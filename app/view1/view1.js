'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope, $http, filterFilter) {

    $scope.searchKeyword = '';
    $scope.listOfTypes = [];
    $scope.selectedType = null;
    $scope.selectedAction = null;
    $scope.selectedItems = [];
    $scope.allSelections = false;

    $http.get('https://cs1.iridize.com/api/latest/app/8MXQlGj6R8Ogx2PohL9E+w/guide/',  {
        headers: {'Authorization': 'Basic ZWxld2luc286RXlhbDMwMDc='}
    })
    .then(function successCallback(response) {
        console.log("successCallback:" + JSON.stringify(response));
        $scope.allData = response.data;

        $scope.data = $scope.allData;
        angular.forEach($scope.data, function (item) {

            var type = item.guide_type;
            if($scope.listOfTypes.indexOf(type) === -1)
            {
                $scope.listOfTypes.push(type);
            }
            arrayItemsInit();
        });

    }, function errorCallback(response) {
        //console.log("errorCallback:" + JSON.stringify(response));
    });

    $scope.search = function () {
        $http.get('https://cs1.iridize.com/api/latest/app/8MXQlGj6R8Ogx2PohL9E+w/guide/?k=' + $scope.searchKeyword,  {
            headers: {'Authorization': 'Basic ZWxld2luc286RXlhbDMwMDc='}
        })
            .then(function successCallback(response) {
                console.log("successCallback:" + JSON.stringify(response));
                $scope.data = response.data;
                arrayItemsInit();

            }, function errorCallback(response) {
                console.log("errorCallback:" + JSON.stringify(response));
            });

    };

    $scope.filter =function () {
        console.log($scope.selectedType);

        if($scope.selectedType !== null)
        {
            $scope.data = [];

            angular.forEach($scope.allData, function (item) {

                var type = item.guide_type;
                if(type === $scope.selectedType)
                {
                    $scope.data.push(item);
                }
            });
        }
        else {
            $scope.data = $scope.allData;
        }
        arrayItemsInit();
    };

    $scope.bulkActions =function () {

        console.log($scope.selectedAction);

        for(var i = 0; i < $scope.selectedItems.length; i++)
        {
            console.log(i + " " + $scope.data[i].apiName);
            if($scope.selectedItems[i])
            {
                var apiName = $scope.data[i].apiName;

                var api = 'https://cs1.iridize.com/api/latest/app/8MXQlGj6R8Ogx2PohL9E+w/guide/' + apiName + '/' + $scope.selectedAction;
                console.log(api);
                $http.get(api,  {
                    headers: {'Authorization': 'Basic ZWxld2luc286RXlhbDMwMDc='}
                })
                    .then(function successCallback(response) {


                    }, function errorCallback(response) {
                        //console.log("errorCallback:" + JSON.stringify(response));
                    });
            }

        }

    };

    $scope.toggleSelection = function () {
        console.log($scope.selectedItems);
    };

    $scope.changeAllSelections = function () {

        for(var i = 0; i < $scope.data.length; i++)
        {
            $scope.selectedItems[i] = $scope.allSelections;
        }
        console.log($scope.selectedItems);
    };

    var arrayItemsInit = function () {
        $scope.selectedItems = [];
        $scope.allSelections = false;
        angular.forEach($scope.data, function () {
            $scope.selectedItems.push(false);
        });
    }

});