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

                dropTable(db);
                createTable(db);

                //inserting data in table
                insertData(db, "images/art.jpg", "Арт", "");
                insertData(db, "images/dora.jpg", "Дора", "");
                insertData(db, "images/action.jpg", "Экшн", "");
                insertData(db, "images/delphi.jpg", "Делфи", "");
                insertData(db, "images/mansera.jpg", "Мансера", "");
                

                dataView(db);

            } else {
                alert("Web SQL Database not supported in this browser");
            }
        }

        //reads and displays values from the table
        function dataView(db) {
            var data = document.getElementById("tbody01");
            data.innerHTML = "";
            
            db.transaction(function (t) {
                t.executeSql("SELECT * FROM Cryptography_tbl", [],
                function (tran, r) {
                        for (var i = 0; i < r.rows.length; i++) {
                        var id = r.rows.item(i).id;
                        var title = r.rows.item(i).title;
                        var content = r.rows.item(i).content;
                        var insertday = r.rows.item(i).insertDay;

                        //data list rendering
                        if (data) {
                            data.innerHTML += '<h2 align="center">' + content + '</h2>' + '<img class="s-img" src="' + title + '"/><br />';
                           
                        }

                    }
                },
                function (t, e) { alert("Error:" + e.message); }
             );
            });
        }

        // create table
        function createTable(db) {
            db.transaction(function (t) {
                t.executeSql("CREATE TABLE Cryptography_tbl (id INTEGER PRIMARY KEY, title TEXT, content TEXT, insertDay TEXT)", []);
            });
        }

        //inserting data in table
        function insertData(db, title, context, insertDay) {
            db.transaction(function (e) {
                //var day = new Date();
                e.executeSql("INSERT INTO Cryptography_tbl(title, content, insertDay) VALUES (?, ?, ?)", [title, context, insertDay], onSuccess, onError);
            });
        }

        function onSuccess(e) { }
        function onError(e) { }

        // drop table
        function dropTable(db) {
            db.transaction(function (e) {
                e.executeSql("DROP TABLE Cryptography_tbl");
            });
        }

        window.onload = function () {
            selectDB();
        };