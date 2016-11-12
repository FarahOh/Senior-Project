angular.module('owlendar.controllers', [])

.controller('OwlendarCtrl', function($scope, $ionicModal, $timeout, $ionicPopover) {

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

          //trying to get holidays from google?
          googleCalendarApiKey: '<YOUR API KEY>',
            events: [ // put the array in the `events` property
                {
                    title  : 'Day Event',
                    start  : '2016-11-11'
                },
                {
                    title  : 'Week long test event',
                    start  : '2016-11-14',
                    end    : '2016-11-19'
                },
                {
                    title  : 'event3',
                    start  : '2016-11-09T12:30:00',
                }
            ],
            //color: 'black',     // an option!
            //textColor: 'white' // an option!
        },

        //google api source? Doesnt work
        {
            googleCalendarId: 'abcd1234@group.calendar.google.com',
            color: 'yellow',   // an option!
            textColor: 'black' // an option!
        }

        // any other event sources...

  ];



  $scope.dayClick = function(date, jsEvent, view, resourceObj) {

    //$(this).css('background-color', 'gold');
    $scope.theDate = date.format('ddd, MMMM DD, YYYY ');


    //https://fullcalendar.io/docs/event_data/clientEvents/
    //$scope.eventsForToday = $('#calendar').fullCalendar('clientEvents', [])

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
        dayClick: $scope.dayClick,
		windowResize:$scope.windowResize
      }
    };

   //resize function //how to test?
   $('#calendar').fullCalendar({
    windowResize: function(view) {
        alert('The calendar has adjusted to a window resize');//remove on release
    }
});

  $scope.calendarConfig = {
  calendar:{
        viewRender: function(view, element) {
            $log.debug("View Changed: ", view.visStart, view.visEnd, view.start, view.end);
        }
    }
  };
});
