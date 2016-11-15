angular.module('owlendar.controllers', [])

.controller('OwlendarCtrl', function ($scope, $ionicModal, $timeout, $ionicPopover, $filter) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  // $scope.$on('$ionicView.enter', function(e) {
  // });

    

  //CALENDAR!
  //https://fullcalendar.io/docs/event_data/eventSources/
  var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();


  $scope.eventSources = [
    
        // your event source
        {
            //trying to get holidays from google?
            googleCalendarApiKey: '<YOUR API KEY>',
            events: [ // put the array in the `events` property
                {
                    title  : 'KSU ACF - Giving Thanks Potluck',
                    desc  : 'Dinner event',
                    start  : '2016-11-15 5:00:00', 
                    end : '2016-11-15 7:30:00',
                    location : 'Student Center ST214 (25) Staff Lounge',
                    department : 'Multicultural Student Retention Services', 
                    eventUrl : 'https://calendar.kennesaw.edu/EventDetails.aspx?data=hHr80o3M7J7JmkwjAp30c%2fHYl%2fw6zDOV5rikI8HES93bc3RUMpisGvx3NwE0ZZvn'
                },
                {
                    title  : 'event2',
                    desc  : 'event2 Desc',
                    start  : '2016-10-11 3:30:00',
                    end    : '2016-10-14 12:30:00'
                },
                {
                    title  : 'event3',
                    desc  : 'event3 Desc',
                    start  : '2016-10-09 12:30:00',
                },
				{
                    title  : 'Yesterday Event',
                    desc  : 'Yesterday Event Desc',
                    start  : new Date(y, m, d - 1, 16, 0),
					eventUrl  : "http://www.twitter.com",
                },
				{
                    title  : 'Today Event',
                    desc  : 'Today Event Desc',
                    start  : new Date(y, m, d, 16, 0),
					eventUrl  : "http://www.google.com",
                },
				{
                    title  : 'Tomorrow Event',
                    desc  : 'Tomorrow Event Desc',
                    start  : new Date(y, m, d + 1, 16, 0),					
					eventUrl  : "http://www.facebook.com",
                },
				{
                    title  : 'Tomorrow Event 1',
                    desc  : 'Tomorrow Event 1 Desc',
                    start  : new Date(y, m, d + 1, 16, 0),
					eventUrl  : "http://www.yahoo.com",
                },
				{
                    title  : 'American Red Cross Blood Drive- Marietta',
                    desc  : 'Tomorrow Event 1 Desc',
                    start  : '2016-11-29 12:00:00',
                    end    : '2016-11-29 17:00:00',
					eventUrl  : "http://www.yahoo.com",
                }
            ],
            //color: 'orange',     // an option!
            //textColor: 'white' // an option!
        },
      //google api source? Doesnt work
            {
                googleCalendarId: 'abcd1234@group.calendar.google.com',
                color: 'yellow',   // an option!
                textColor: 'black' // an option!
            }
  ];

  // Event click
 $scope.alertEventOnClick = function(calEvent, jsEvent, view) {
		 
     $scope.dayClick(calEvent.start, undefined, undefined,undefined);
}

 $scope.dayClick = function (date, jsEvent, view, resourceObj) {
     
     //$(this).css('background-color', 'gold');
    $scope.theDate = date.format('ddd, MMMM DD, YYYY');
     
    // date for Selected day
     $scope.arrayEventsForSelectedDay = [];
     
    // 2016-10-09 12:30:00
     //yyyy-MM-dd HH:mm:ss
    $scope.selectedDate =  date.format('YYYY-MM-DD'); //$filter('date')(new Date(date), 'MMMM-dd-yyyy');	  
	  console.log("selectedDate : ",+$scope.selectedDate);
	  
	  // Get all events
	  var events = $scope.eventSources[0].events;
	  console.log("events : "+ events);
	  
	  // Get events for selected date
	  events.forEach(function(event){
		  
          //var dateStart = $filter('date')(new Date(event.start));
		  var eventDate = $filter('date')(new Date(event.start), 'yyyy-MM-dd');
		  
		  if ($scope.selectedDate == eventDate) {
			 $scope.arrayEventsForSelectedDay.push(event);			 
		  }
	  })
	  
	console.log("arrayEventsForSelectedDay : "+ $scope.arrayEventsForSelectedDay );
	  
    $scope.popover.show(jsEvent, $scope);

  }
  
   $scope.eventItemClicked = function($index){
		
       var event = $scope.arrayEventsForSelectedDay[$index];
       
       $scope.selectedEvent = event;
       
       $scope.getDetails();
		
	}


        // .fromTemplateUrl() method
        $ionicPopover.fromTemplateUrl('templates/popover.html', {
            scope: $scope
        }).then(function (popover) {
            $scope.popover = popover;
        });


        //$scope.popover = $ionicPopover.fromTemplate('templates/popover.html', {
          //  scope: $scope
        //});

        //Cleanup the popover when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.popover.remove();
        });
        // Execute action on hidden popover
        $scope.$on('popover.hidden', function () {
            // Execute action
        });
        // Execute action on remove popover
        $scope.$on('popover.removed', function () {
            // Execute action
        });

        // Form data for the login modal
        $scope.detailsData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/details.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeDetails = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.getDetails = function () {
            $scope.modal.show();
        };
    
        // Open the login modal
        $scope.openEventUrl = function () {
            if ($scope.selectedEvent.eventUrl) {
                
                window.open($scope.selectedEvent.eventUrl, '_blank');
            }
        };

        $scope.uiConfig = {
            calendar: {
                height: 600,

                editable: true,
                header: {
                    left: 'title',
                    //center: 'title',
                    right: 'prev, today, next'
                },
                eventClick: $scope.alertEventOnClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                dayClick: $scope.dayClick,
                windowResize: $scope.windowResize
            }
        };

        //resize function //how to test?
        $('#calendar').fullCalendar({
            windowResize: function (view) {
                alert('The calendar has adjusted to a window resize');//remove on release
            }
        });

        $scope.calendarConfig = {
            calendar: {
                viewRender: function (view, element) {
                    $log.debug("View Changed: ", view.visStart, view.visEnd, view.start, view.end);
                }
            }
        };
    });
