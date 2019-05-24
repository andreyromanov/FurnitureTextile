
var db;
//database version setting
var version = 1.0;
//database name setting
var dbName = "tizendb";
//database display name setting
var dbDisplayName = "tizen_test_db";
//database size setting
var dbSize = 2 * 1024 * 1024;




function selectDB() {
  if (window.openDatabase) {
      //openDatabase(name, version, displayname, estimatedsize, callback);
      db = openDatabase(dbName, version, dbDisplayName, dbSize);
      //dropTable(db);
      //createTable(db);

      var name = document.getElementById("name").value;
      var email = document.getElementById("email").value;
      var pass = document.getElementById("password").value;

      //inserting data in table
      insertData(db, name, email, pass);
      window.location.href = "profile.html";
        
  } else {
      alert("Web SQL Database not supported in this browser");
  }
}


// create table
function createTable(db) {
  db.transaction(function (t) {
      t.executeSql("CREATE TABLE Reg_tbl (id INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT)", []);
  });
}

//inserting data in table
function insertData(db, name, email, password) {
  db.transaction(function (e) {
      //var day = new Date();
      e.executeSql("INSERT INTO Reg_tbl(name, email, password) VALUES (?, ?, ?)", [name, email, password], onSuccess, onError);
  });
}

function onSuccess(e) { }
function onError(e) { }

// drop table
function dropTable(db) {
  db.transaction(function (e) {
      e.executeSql("DROP TABLE Reg_tbl");
  });
}


window.onload = function () {
	db = openDatabase(dbName, version, dbDisplayName, dbSize);
	  //dropTable(db);
	  createTable(db);
	
	db.transaction(function (t) {
	    t.executeSql('SELECT COUNT(*) AS c FROM Reg_tbl', [], function (t, r) {
	      console.log( r.rows.item(0).c);
	      if(r.rows.item(0).c == 0){

	    	//alert('No rows'); 
	      } else if(r.rows.item(0).c == 1){
	    	  window.location.href = "profile.html";
	    	 }
	     // alert(r.rows.item(0).c);
	    }, function (tx, e) {
	      alert ("unknown: " + e.message);
	    });
	  });

};