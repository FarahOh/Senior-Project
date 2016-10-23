import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngSanitize from 'angular-sanitize';
import 'ionic-sdk/release/js/ionic';
import 'ionic-sdk/release/js/ionic-angular';
import 'ionic-sdk/release/css/ionic.css';

angular.module('Owlendar', [
    angularMeteor,
    ngSanitize,
    'ionic'
  ])

    .controller('PartiesListCtrl', ['$scope', function($scope) {
      $scope.parties = [{
        'name': 'Dubstep-Free Zone',
        'description': 'Can we please just for an evening not listen to dubstep.'
      }, {
        'name': 'All dubstep all the time',
        'description': 'Get it on!'
      }, {
        'name': 'Savage lounging',
        'description': 'Leisure suit required. And only fiercest mannerszzzz.'
      }];
  }]);  