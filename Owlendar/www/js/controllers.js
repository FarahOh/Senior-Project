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
                    title  : 'event1',
                    start  : '2016-10-11 12:30:00'
                },
                {
                    title  : 'event2',
                    start  : '2016-10-11 3:30:00',
                    end    : '2016-10-14 12:30:00'
                },
                {
                    title  : 'event3',
                    start  : '2016-10-09 12:30:00',
                },
				{
                    title  : 'Yesterday Event',
                    start  : new Date(y, m, d - 1, 16, 0),
					eventUrl  : "http://www.twitter.com",
                },
				{
                    title  : 'Today Event',
                    start  : new Date(y, m, d, 16, 0),
					eventUrl  : "http://www.google.com",
                },
				{
                    title  : 'Tomorrow Event',
                    start  : new Date(y, m, d + 1, 16, 0),					
					eventUrl  : "http://www.facebook.com",
                },
				{
                    title  : 'Tomorrow Event 1',
                    start  : new Date(y, m, d + 1, 16, 0),
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
     
    // 2016-10-09 12:30:00
     //yyyy-MM-dd HH:mm:ss
    $scope.selectedDate =  date.format('YYYY-MM-DD'); //$filter('date')(new Date(date), 'MMMM-dd-yyyy');	  
	  console.log("selectedDate : ",+$scope.selectedDate);
	  
	  $scope.arrayEventsForSelectedDay = [];

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
		if (event.eventUrl) {	

			 window.open(event.eventUrl, '_blank');
			 return false;
        }
	}


        // .fromTemplateUrl() method
        $ionicPopover.fromTemplateUrl('templates/popover.html', {
            scope: $scope
        }).then(function (popover) {
            $scope.popover = popover;
        });


        $scope.popover = $ionicPopover.fromTemplate('templates/popover.html', {
            scope: $scope
        });



        $ionicModal.fromTemplateUrl('templates/details.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });


        $scope.modal = $ionicModal.fromTemplate('templates/details.html', {
            scope: $scope
        });



        $scope.openModal = function () {
            $scope.modal.show(jsEvent, $scope);
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
