// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var db = null;

angular.module('owlendar', ['ionic','owlendar.services','owlendar.controllers', 'ui.calendar','owlendar.dbService'])


//runs at startup and this is what executes the poll for events
.run(function($ionicPlatform,dbService) {
	
  //alert("startup");
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
	  
	  if (window.cordova && window.SQLitePlugin) { // because Cordova is platform specific and doesn't work when you run ionic serve

			window.sqlitePlugin.echoTest(function () {
				console.log('ECHO test OK');
			});

			window.sqlitePlugin.selfTest(function () {
				console.log('SELF test OK');
			});

			db = window.sqlitePlugin.openDatabase({
				name: 'owlendar.db',
				location: 'default'
			});
		} else {

			db = window.openDatabase("Owlendar", "1.0", "owlendar.db", 100 * 1024 * 1024); // browser webSql, a fall-back for debugging
			//alert("browser db (WebSQL) loaded");
		}

		if (db) {

			console.log("db should have been opened at this step");
			dbService.createTables();
			dbService.insertTestData();
			
		} else {
			console.log("db not loaded");
		}
	  
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'OwlendarCtrl'
  })

  .state('app.calendar', {
      url: '/calendar',
      views: {
        'menuContent': {
          templateUrl: 'templates/calendar.html'
        }
      }
    })


//detail.html page! Need to figure this out to display additional data from event.
  .state('app.details', {
      url: '/details',
      views: {
        'menuContent': {
          templateUrl: 'templates/details.html'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/calendar');
});
