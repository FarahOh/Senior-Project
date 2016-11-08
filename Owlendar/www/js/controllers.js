angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopover) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  // $scope.$on('$ionicView.enter', function(e) {
  // });


  //CALENDAR!
  //https://fullcalendar.io/docs/event_data/eventSources/
  $scope.eventSources = [
    
        // your event source
        {
            events: [ // put the array in the `events` property
                {
                    title  : 'Blood Drive',
                    start  : '2016-11-11'
                },
                {
                    title  : 'Finals Week',
                    start  : '2016-11-14',
                    end    : '2016-11-19'
                },
                {
                    title  : 'Zach Crys',
                    start  : '2016-11-09',
                }
            ],
            //color: 'black',     // an option!
            //textColor: 'white' // an option!
        }

        // any other event sources...

  ];

  

  $scope.dayClick = function(date, jsEvent, view, resourceObj) {

    //$(this).css('background-color', 'gold');
    $scope.theDate = date.format('ddd, MMMM DD, YYYY ');


    //https://fullcalendar.io/docs/event_data/clientEvents/
    $scope.eventsForToday = $('#calendar').fullCalendar('clientEvents', [])

    //$scope.eventsForToday = uiConfig.calendar.myCalendar.fullCalendar('clientEvents', []);


    //$scope.eventsForToday = myCalendar.fullCalendar('clientEvents', []);
    //alert($('.calendar').fullCalendar('clientEvents', []));
    $scope.popover.show(jsEvent, $scope);
    //alert('Date: ' + date.format('ddd, MMMM DD, YYYY '));
    //alert('Resource ID: ' + resourceObj.id);

  }


  // .fromTemplateUrl() method
  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });


  $scope.popover = $ionicPopover.fromTemplate('templates/popover.html', {
    scope: $scope
  });



  $scope.uiConfig = {
      calendar:{
        height: 600,
        editable: true,
        header:{
          left: 'title',
          //center: 'title',
          right: 'prev, today, next'
        },
        eventClick: $scope.alertEventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        dayClick: $scope.dayClick
      }
    };



  $scope.calendarConfig = {
  calendar:{
        viewRender: function(view, element) {
            $log.debug("View Changed: ", view.visStart, view.visEnd, view.start, view.end);
        }
    }
  };


  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
