angular.module('owlendar.controllers', [])

.controller('OwlendarCtrl', function ($scope, $ionicModal, $timeout, $ionicPopover, $filter, OwlendarServices) {

	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	// $scope.$on('$ionicView.enter', function(e) {
	// });

	//CALENDAR!
	//https://fullcalendar.io/docs/event_data/eventSources/

	$scope.$on('$ionicView.afterEnter', function () {
		
		$scope.fetchEventsFromDB();
	});

	// get events from xml and store them to database
	$scope.fetchEventsFromDB = function () {

			OwlendarServices.getAllEvents().then(function (eventList) {

				if (!eventList || eventList.length == 0) {

					//If there is not any event in database, get it from xml
					$scope.fetchEventsFromUrl();

				} else {

					console.log(eventList);
					
					$scope.eventList = eventList;

					//Refresh calendar events
						$('#calendar').fullCalendar('removeEvents');
						$('#calendar').fullCalendar('addEventSource',$scope.eventList);
					}
						});
		},
		// get events from xml and store them to database
	$scope.fetchEventsFromUrl = function () {

		OwlendarServices.getEventsFromURL().then(function (object) {

				var rss = object['rss'];
				var channel = rss['channel'];
				var items = channel['item'];

				var eventArray = [];
				items.forEach(function (item) {

					var event = {};
					event.title = item.title;

					if (item.pubDate) {
												
						event.start = $filter('date')(new Date(item.pubDate), 'yyyy-MM-dd HH:mm:ss');
						
						console.log(event.start);
						
					} else {
						event.start = "";
					}
					event.description = item.description;
					event.link = item.link;
					event.guid = item.guid;
					event.category = item.category;

					if (item.author) {
						event.author = item.author;
					} else {
						event.author = "";
					}

					eventArray.push(event);
				});

				//Insert all events
				OwlendarServices.insertEventsToDB(eventArray);

				// Get all events from DB
				$scope.fetchEventsFromDB();
			});
		},
	
		$scope.eventSources = [{
							//trying to get holidays from google?
							googleCalendarApiKey: '<YOUR API KEY>',
							events: []
								//color: 'orange',     // an option!
								//textColor: 'white' // an option!
        				},
      					//google api source? Doesnt work
						{
							googleCalendarId: 'abcd1234@group.calendar.google.com',
							color: 'yellow', // an option!
							textColor: 'black' // an option!
            			}];
						
					
	
//		$scope.eventSources = [
//	
//	        // your event source
//			{
//				//trying to get holidays from google?
//				googleCalendarApiKey: '<YOUR API KEY>',
//				events: [ // put the array in the `events` property
//					{
//						title: 'Blood Drive',
//						description: 'Proect Service',
//						start: '2016-11-2 10:30:00',
//						end: '2016-11-2 16:30:00',
//						location: 'Student Center Ballroom',
//						department: 'Volunteerism',
//						eventUrl: 'www.kennesaw.edu'
//	                },
//					{
//						title: 'Library 101 Walk-In Session',
//						description: 'Join us for an introduction to online library resources. Learn about all the resources KSUs libraries have to offer students to enhance your academic success. Presented by Rita Spisak, KSU Librarian.',
//						start: '2016-11-9 11:30:00',
//						end: '2016-11-9 12:30:00',
//						location: 'Student Center Room 261',
//						department: 'Adult and Commuter Affairs',
//						eventUrl: 'http://studentengagement.kennesaw.edu/acsa/events.php'
//	                },
//					{
//						title: 'Friendsgiving: Breakfast for Thanksgiving',
//						description: 'The Odyssey Peer Mentoring Program will be hosting our Friendsgiving: Breakfast for Thanksgiving event. Friendsgiving is open to all KSU student and includes a free breakfast along with socializing and networking with other students. Additionally, the Odyssey Peer Mentoring Program is conducting a food and toiletry drive for people in need during the holiday season. Feel free to drop off non-perishable food items and toiletries during the event or to room 261 in the Student Center.',
//						start: '2016-11-10 8:00:00',
//						end: '2016-11-10 10:00:00',
//						location: 'Student Center Leadership Room',
//						department: 'Odyssey Peer Mentoring Program',
//						eventUrl: 'http://studentengagement.kennesaw.edu/acsa/odyssey/events/upcoming-events.php'
//	                },
//					{
//						title: 'KSU ACF - Giving Thanks Potluck',
//						description: 'Dinner event',
//						start: '2016-11-15 17:00:00',
//						end: '2016-11-15 19:30:00',
//						location: 'Student Center ST214 (25) Staff Lounge',
//						department: 'Multicultural Student Retention Services',
//						eventUrl: 'https://calendar.kennesaw.edu/EventDetails.aspx?data=hHr80o3M7J7JmkwjAp30c%2fHYl%2fw6zDOV5rikI8HES93bc3RUMpisGvx3NwE0ZZvn'
//	                },
//					{
//						title: 'Student Life Progr - Movie and Mug Night',
//						description: 'Information Table event',
//						start: '2016-11-15 18:30:00',
//						end: '2016-11-15 21:30:00',
//						location: 'J.M Wilson Student Center (M) A200 (50) Lobby',
//						department: 'Student Life',
//						eventUrl: 'https://calendar.kennesaw.edu/EventDetails.aspx?data=hHr80o3M7J6GJqP4tMKLUTN0Lyr7lxRJX2OuwW0hNt4BDQmcIQNdeDEzdAQR8bvt'
//	                },
//					{
//						title: 'Student Life Progr - Movie and Mug Night',
//						description: 'Service Project event',
//						start: '2016-11-15 19:00:00',
//						end: '2016-11-15 21:30:00',
//						location: 'J.M Wilson Student Center (M) A201 A&B Ballroom Combo',
//						department: 'Student Life',
//						eventUrl: 'https://calendar.kennesaw.edu/EventDetails.aspx?data=hHr80o3M7J6GJqP4tMKLUTN0Lyr7lxRJX2OuwW0hNt4TE72R5M3mjdP21YtajcKR'
//	                },
//					{
//						title: 'ISP Staff Meeting',
//						description: ' Meeting event',
//						start: '2016-11-16 10:00:00',
//						end: '2016-11-16 12:30:00',
//						location: '',
//						department: 'Student Engagement',
//						eventUrl: 'https://calendar.kennesaw.edu/EventDetails.aspx?data=hHr80o3M7J4soiZvVpV8s77%2fgksIjAUqBdB5IH060PmmR%2bWSFbn%2bsLY1jn1N%2bQw7'
//	                },
//					{
//						title: 'St. Paul Street Church Evangelism - Freedom of Assembly',
//						description: 'Information Table event',
//						start: '2016-11-17 10:00:00',
//						end: '2016-11-17 11:30:00',
//						location: 'Miscellaneous Fields and Outdoor Spaces (M) Globe Area (400)',
//						department: 'Student Life',
//						eventUrl: 'https://calendar.kennesaw.edu/EventDetails.aspx?data=hHr80o3M7J5eNTOtorhuRGr2pTr6xxLWqW%2fCauwv8slKyzEJHyutPNhz%2bWkuoAEC'
//	                },
//					{
//						title: 'AAMI Weekly Meeting/Seminar',
//						description: '',
//						start: '2016-11-17 14:30:00',
//						end: '2016-11-17 15:30:00',
//						location: 'Burruss Building BB371 (33) Classroom',
//						department: 'Student Engagement',
//						eventUrl: 'https://calendar.kennesaw.edu/EventDetails.aspx?data=hHr80o3M7J7lHjLWtH7EGVy1r8r%2fY3VaOlIXgPslhSXNDM%2beJcuUDkUSyiY00nvH'
//	                },
//					{
//						title: 'RSO Classification Committee Meetings',
//						description: 'Meeting',
//						start: '2016-11-17 18:00:00',
//						end: '2016-11-17 19:30:00',
//						location: 'Student Center Room 214',
//						department: 'Student Life',
//						eventUrl: 'https://calendar.kennesaw.edu/EventDetails.aspx?data=hHr80o3M7J7DOCZRmTM1TkVQHMQAR5Lk53LFVP6iZV6wQHa8TAQDbNWJTWMTdlII'
//	                },
//					{
//						title: 'SOS Student Worker Training',
//						description: '',
//						start: '2016-11-18 12:30:00',
//						end: '2016-11-18 17:00:00',
//						location: 'Student Center ST205 Leadership Room',
//						department: 'Student Life',
//						eventUrl: 'https://calendar.kennesaw.edu/EventDetails.aspx?data=hHr80o3M7J7OPU267x7HPISVnUM59HlfOyvWszVvkUyuRQfiWEBO8GDNTnXCEzhj'
//	                },
//					{
//						title: 'Delta - Basketball Tournament',
//						description: 'Sports - Game/Match',
//						start: '2016-11-19 8:00:00',
//						end: '2016-11-19 23:00:00',
//						location: 'Gymnasium (M)',
//						department: 'KSU Sports and Entertainment Park',
//						eventUrl: 'https://calendar.kennesaw.edu/EventDetails.aspx?data=hHr80o3M7J7OPU267x7HPISVnUM59HlfOyvWszVvkUyuRQfiWEBO8GDNTnXCEzhj'
//	                },
//					{
//						title: 'Delta - Basketball Tournament',
//						description: 'Sports - Game/Match',
//						start: '2016-11-19 13:00:00',
//						end: '2016-11-19 16:00:00',
//						location: 'Gymnasium (M) Gym Court',
//						department: 'KSU Sports and Entertainment Park',
//						eventUrl: 'https://calendar.kennesaw.edu/EventDetails.aspx?data=hHr80o3M7J5jJnJMvall1B9GkSiqAYKZ3c4Ezx5bHIyHk9lDhbURl3ERRtntdAVW'
//	                },
//					{
//						title: 'ISP Staff Meeting',
//						description: 'Meeting',
//						start: '2016-11-23 10:00:00',
//						end: '2016-11-23 12:30:00',
//						location: '0096 301',
//						department: 'Student Engagement',
//						eventUrl: 'https://calendar.kennesaw.edu/EventDetails.aspx?data=hHr80o3M7J4soiZvVpV8s77%2fgksIjAUqBdB5IH060PlRydTNSdPW66v53tI%2fHkhs'
//	                },
//					{
//						title: 'Blood Drive',
//						description: 'Service Project',
//						start: '2016-11-29 12:00:00',
//						end: '2016-11-29 17:30:00',
//						location: 'J.M. Wilson Student Center (M) A201 A&B Ballroom Combo',
//						department: 'Student Life',
//						eventUrl: 'https://calendar.kennesaw.edu/EventDetails.aspx?data=hHr80o3M7J4soiZvVpV8s77%2fgksIjAUqBdB5IH060PlRydTNSdPW66v53tI%2fHkhs'
//	                },
//					{
//						title: 'Student Engagement SA/Tutor Lunch',
//						description: 'Luncheon',
//						start: '2016-11-29 12:00:00',
//						end: '2016-11-29 14:00:00',
//						location: 'Student Center ST205 (84) Leadership Room',
//						department: 'Student Life',
//						eventUrl: 'https://calendar.kennesaw.edu/EventDetails.aspx?data=hHr80o3M7J4%2bqWUc5lRvnGM%2bubkgYBSJrUlRFXZZVwd745SEIxmH0OaPos4Xukya'
//	                },
//					{
//						title: 'ISP Staff Meetings',
//						description: 'Meeting',
//						start: '2016-11-30 10:00:00',
//						end: '2016-11-30 12:30:00',
//						location: '0096 301',
//						department: 'Student Life',
//						eventUrl: 'https://calendar.kennesaw.edu/EventDetails.aspx?data=hHr80o3M7J4%2bqWUc5lRvnGM%2bubkgYBSJrUlRFXZZVwd745SEIxmH0OaPos4Xukya'
//	                },
//					{
//						title: 'AAMI Weekly Meeting/Seminar',
//						description: 'Meeting',
//						start: '2016-12-1 14:30:00',
//						end: '2016-12-1 15:30:00',
//						location: 'Burruss Building BB371 (33) Classroom',
//						department: 'Student Engagement',
//						eventUrl: 'https://calendar.kennesaw.edu/EventDetails.aspx?data=hHr80o3M7J7lHjLWtH7EGVy1r8r%2fY3VaOlIXgPslhSVn2iOMOYWmw%2fUim3r9Lu82'
//	                },
//	            ],
//				//color: 'orange',     // an option!
//				//textColor: 'white' // an option!
//	        },
//	      //google api source? Doesnt work
//			{
//				googleCalendarId: 'abcd1234@group.calendar.google.com',
//				color: 'yellow', // an option!
//				textColor: 'black' // an option!
//	            }
//	  ];

	// Event click
	$scope.alertEventOnClick = function (calEvent, jsEvent, view) {

		$scope.dayClick(calEvent.start, undefined, undefined, undefined);
	}

	$scope.dayClick = function (date, jsEvent, view, resourceObj) {

		//$(this).css('background-color', 'gold');
		$scope.theDate = date.format('ddd, MMMM DD, YYYY');

		// date for Selected day
		$scope.arrayEventsForSelectedDay = [];

		// 2016-10-09 12:30:00
		//yyyy-MM-dd HH:mm:ss
		$scope.selectedDate = date.format('YYYY-MM-DD'); //$filter('date')(new Date(date), 'MMMM-dd-yyyy');	  
		console.log("selectedDate : ", +$scope.selectedDate);

		// Get all events
		console.log("$scope.eventList : " + $scope.eventList);

		// Get events for selected date
		$scope.eventList.forEach(function (event) {

			console.log(event.start);
			
			var myDateTimeArray = event.start.split(" ");
			var myDateArray = myDateTimeArray[0].split("-");
			var eventDate = new Date(myDateArray[0],myDateArray[1]-1,myDateArray[2]); 
			var eventDateFormatted = $filter('date')(eventDate, 'yyyy-MM-dd');
			
			if ($scope.selectedDate == eventDateFormatted) {
				$scope.arrayEventsForSelectedDay.push(event);
			}
		})

		console.log("arrayEventsForSelectedDay : " + $scope.arrayEventsForSelectedDay);
		$scope.popover.show(jsEvent, $scope);
	}

	$scope.eventItemClicked = function ($index) {

		var event = $scope.arrayEventsForSelectedDay[$index];
		//$scope.popover.remove(); bug still exists when popover is removed
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
	//close button
	$scope.closeDetails = function () {
		$scope.modal.hide();
		window.location.reload();//BANDAID FIX FOR POPOVER+MODAL BUG
	};

	// Open the login modal
	$scope.getDetails = function () {
		$scope.modal.show();
	};

	// Open the login modal
	$scope.openEventUrl = function () {
		if ($scope.selectedEvent.link) {

			window.open($scope.selectedEvent.link, '_blank');
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
			alert('The calendar has adjusted to a window resize'); //remove on release
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