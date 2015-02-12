'use strict';

/**
* @ngdoc function
* @name radarApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the radarApp
*/

angular.module('radarApp')
.controller('MainCtrl', ['$scope', '$jet', function ($scope, $jet) {
  $scope.status = 'disconnected';
  $scope.disconnect = function() {
    if ($scope.peer) {
      $scope.peer.$close();
    }
    delete $scope.elements;
    $scope.status = 'disconnected';
  };
  $scope.connect = function(url) {
    $scope.status = 'connecting';
    delete $scope.elements;
    if ($scope.peer) {
      $scope.peer.$close();
    }
    $scope.peer = new $jet.$Peer({
      url: url,
      scope: $scope
    });
    $scope.peer.$connected.then(function() {
      $scope.status = 'connected';
    }, function() {
      $scope.status = 'disconnected';
    });
  };

  $scope.reset = function() {
    if ($scope.elements) {
      $scope.elements.$unfetch();
    }
    delete $scope.elements;
  };

  $scope.showfetchExpressionAsJSON = false;
  $scope.maxFetchEntries = 20;
  $scope.fetchCaseSensitive = true;
  $scope.fetchExpression = {};

  $scope.makeFetchExpression = function() {
    if ($scope.fetchForm.$invalid) {
      return;
    }
    var pathFilters = $scope.pathFilters;
    var valueFilters = $scope.valueFilters;
    $scope.fetchExpression.sort = {};
    $scope.fetchExpression.sort.from = 1;
    $scope.fetchExpression.sort.to = 20;

    var activePathFilters = pathFilters.filter(function(pathFilter) {
      return pathFilter.value !== '';
    });
    if (activePathFilters.length === 0) {
      delete $scope.fetchExpression.path;
    } else {
      $scope.fetchExpression.path = {};
      $scope.fetchExpression.path.caseInsensitive = !!!$scope.fetchCaseSensitive;
    }
    activePathFilters.forEach(function(pathFilter) {
      var val;
      pathFilter.invalid = false;
      if (pathFilter.toJSON) {
        try {
          val = pathFilter.toJSON(pathFilter.value);
        } catch(e) {
          pathFilter.invalid = true;
          return;
        }
      } else {
        val = pathFilter.value;
      }
      $scope.fetchExpression.path[pathFilter.op] = val;
    });

    var activeValueFilters = valueFilters.filter(function(valueFilter) {
      return valueFilter.value !== undefined;
    });
    delete $scope.fetchExpression.value;
    delete $scope.fetchExpression.valueField;
    activeValueFilters.forEach(function(valueFilter) {
      if (valueFilter.fieldString !== '') {
        $scope.fetchExpression.valueField = $scope.fetchExpression.valueField || {};
        var valueFieldRule = {};
        valueFieldRule[valueFilter.op] = valueFilter.value;
        $scope.fetchExpression.valueField[valueFilter.fieldString] = valueFieldRule;
      } else {
        $scope.fetchExpression.value = $scope.fetchExpression.value || {};
        $scope.fetchExpression.value[valueFilter.op] = valueFilter.value;
      }
    });
    if ($scope.fetchSortCriteria === 'byValue') {
      if ($scope.fetchSortByValueFieldString !== '') {
        $scope.fetchExpression.sort.byValueField = {};
        $scope.fetchExpression.sort.byValueField[$scope.fetchSortByValueFieldString] = $scope.fetchSortByValueType
      } else {
        $scope.fetchExpression.sort.byValue = $scope.fetchSortByValueType;
      }
    }
    $scope.fetchExpression.sort.descending = $scope.fetchSortDirection === 'descending';
    $scope.fetchExpressionJSON = angular.toJson($scope.fetchExpression,2);
  };

  $scope.fetch = function() {
    if ($scope.status !== 'connected') {
      return;
    }
    $scope.reset();
    $scope.makeFetchExpression();
    $scope.elements = $scope.peer.$fetch($scope.fetchExpression);
    $scope.elements.$autoSave(false);
  };

  $scope.inputTypes = {
    string: 'text',
    number: 'number'
  };

  $scope.caseSensitive = false;

  $scope.pathFilters = [
  {
    op: 'contains',
    value: '',
    info: '(e.g.: id)'
  },
  {
    op: 'startsWith',
    value: '',
    info: '(e.g: players)'
  },
  {
    op: 'containsOneOf',
    value: '',
    info: '(e.g: status LEDS)',
    toJSON: function(value) {
      return value.split(' ')
    }
  },
  {
    op: 'containsAllOf',
    value: '',
    info: '(e.g: status LEDS)',
    toJSON: function(value) {
      return value.split(' ')
    }
  }
  ];

  $scope.valueFilters = [
  {
    op: 'equals',
    //value: '',
    fieldString: ''
  }];


  $scope.fetchSortCriteria = 'byPath';
  $scope.fetchSortByValueFieldString = '';
  $scope.fetchSortByValueType = 'number';
  $scope.fetchSortDirection = 'descending';

}]);