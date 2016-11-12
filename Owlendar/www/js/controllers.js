angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopover,$filter) {

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
            events: [ // put the array in the `events` property
                {
                    title  : 'event1',
                    start  : '2016-10-11'
                },
                {
                    title  : 'event2',
                    start  : '2016-10-11',
                    end    : '2016-10-14'
                },
                {
                    title  : 'event3',
                    start  : '2016-10-09T12:30:00',
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
            color: 'orange',     // an option!
            textColor: 'white' // an option!
        }
  ];

  // Event click
 $scope.alertEventOnClick = function(calEvent, jsEvent, view) {
		 
     $scope.dayClick(calEvent.start, undefined, undefined,undefined);
}

  $scope.dayClick = function(date, jsEvent, view, resourceObj) {

    //$(this).css('background-color', 'gold');
    $scope.theDate = date.format('ddd, MMMM DD, YYYY ');

    // date for Selected day
    $scope.selectedDate = $filter('date')(new Date(date), 'MMM dd, yyyy');	  
	  console.log("selectedDate : ",+$scope.selectedDate);
	  
	  $scope.arrayEventsForSelectedDay = [];

	  // Get all events
	  var events = $scope.eventSources[0].events;
	  console.log("events : "+ events);
	  
	  // Get events for selected date
	  events.forEach(function(event){
		  
		  var eventDate = $filter('date')(new Date(event.start), 'MMM dd, yyyy');
		  
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

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
