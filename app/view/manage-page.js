'use strict';

angular.module('myApp.manage-page', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'view/manage-page.html',
    controller: 'ManagePageCtrl'
  });
}])

.controller('ManagePageCtrl', function($scope, $http) {

    $scope.searchKeyword = '';
    $scope.listOfTypes = [];
    $scope.selectedType = null;
    $scope.selectedAction = null;
    $scope.selectedItems = [];
    $scope.allSelections = false;
    var authorization = {'Authorization': 'Basic ZWxld2luc286RXlhbDMwMDc='};
    var url = 'https://cs1.iridize.com/api/latest/app/8MXQlGj6R8Ogx2PohL9E+w/guide/';



    $http.get(url, { headers: authorization })
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
            console.log("errorCallback:" + JSON.stringify(response));
        });

    $scope.search = function () {
        $http.get(url + '?k=' + $scope.searchKeyword, { headers: authorization })
            .then(function successCallback(response) {
                console.log("successCallback:" + JSON.stringify(response));
                $scope.data = response.data;
                arrayItemsInit();

                if($scope.data.length === 0) {
                    $scope.message = 'No Items';
                }

            }, function errorCallback(response) {
                $scope.data = [];
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

        if($scope.selectedAction)
        {
            for(var i = 0; i < $scope.selectedItems.length; i++)
            {

                if($scope.selectedItems[i])
                {
                    var apiName = $scope.data[i].apiName;

                    var api = url + apiName + '/' + $scope.selectedAction;
                    $http.get(api, { headers: authorization });
                }
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