angular.module('owlendar.dbService', [])

.factory('dbService', function () {

	//---------------------- function responsible to create all the tables once ----------------------
	var createTables = function () {
		db.transaction(function (tx) {
				//tx.executeSql("DROP TABLE events");					  	    

				tx.executeSql("CREATE TABLE IF NOT EXISTS events (id integer primary key , title text, author text, description text, category text, start text, link text, guid text)", [], function () {}, function () {});				
			},

			function () {
				console.error("Failed to create tables into database ");
			});
	};

	//------------------------ function used to create and delete fake data ---------------------------
	var insertTestData = function () {
		console.log("data is going to be inserted into db");
		db.transaction(function (tx) {
			
			//Delete test data
			//tx.executeSql("DELETE FROM events", []);
			
			//Insert test data
			//tx.executeSql("INSERT INTO events (title,author,description,category,start,link,guid) VALUES (?,?,?,?,?,?,?)", ["test","test1","test2","test3","test4","test5","test6"], function () {});

			},
			function () {
				console.error("Failed to insert items into database");
			});
	};

	//function to be used in all services to execute sql statements
	var executeStatement = function (query, params, sucessCallback, errorCallback) {
		if (db) {
			db.transaction(function (tx) {
				tx.executeSql(query, params, sucessCallback, errorCallback)
			});
		} else {
			console.error("db is not opened");
		}
	};

	return {
		createTables: createTables,
		insertTestData: insertTestData,
		executeStatement: executeStatement
	}
});