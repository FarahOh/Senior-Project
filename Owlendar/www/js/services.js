angular.module('owlendar.services', [])

.factory('OwlendarServices', function ($q, $http, dbService) {
	return {

		getEventsFromURL: function () {

			var d = $q.defer();

			$http.get("https://calendar.kennesaw.edu/RSSFeeds.aspx?data=HwqQnFd0XZxjJjn8deKIKl%2frgUXlpet9Qg36KQDl2Eq%2bqpjhLlpC0PFJGtGoulEF", {
					transformResponse: function (cnv) {
						var x2js = new X2JS();
						var aftCnv = x2js.xml_str2json(cnv);
						return aftCnv;
					}
				})
				.success(function (response) {
					//console.log(response);
					d.resolve(response);
				})
				.error(function (err) {
					//console.log(err);
					d.resolve(err);
				});

			return d.promise;
		},

		insertEventsToDB: function (arrayEvents) {

			arrayEvents.forEach(function (event) {

				//var d = $q.defer();

				var query = "INSERT INTO events (title,author,description,category,start,link,guid) VALUES (?,?,?,?,?,?,?)";
				var queryErrorCallback = function (err) {
					//console.error(err);
					//d.resolve(err);
				}
				var querySuccessCallback = function (tx, res) {
					//console.log("insert succeess");
					//console.log(res.insertId);
					//d.resolve(res.insertId);
				}

				dbService.executeStatement(query, [event.title, event.author, event.description, event.category, event.start, event.link, event.guid], querySuccessCallback, queryErrorCallback);

				//return d.promise;
			});
		},
		
		getAllEvents: function () {

			var d = $q.defer();

            var query = "SELECT * FROM events";
            var queryErrorCallback = function (err) {
                console.error(err);
                d.resolve(err);
            }
            var querySuccessCallback = function (tx, res) {
                console.log("events count " + res.rows.item);
                console.log(res.rows.item);

                var eventList = [];

                for (var k = 0; k < res.rows.length; k++) {
                    eventList.push(res.rows.item(k));
                }
                d.resolve(eventList);
            };

            dbService.executeStatement(query, [], querySuccessCallback, queryErrorCallback);
            return d.promise;
		}
	}
});