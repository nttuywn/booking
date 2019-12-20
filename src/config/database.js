import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "Reactoffline.db";
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 200000;

export default class Database {

    initDB() {
        let db;
        return new Promise((resolve) => {
            // console.log("Plugin integrity check ...");
            SQLite.echoTest()
                .then(() => {
                    // console.log("Integrity check passed ...");
                    // console.log("Opening database ...");
                    SQLite.openDatabase(
                        database_name,
                        database_version,
                        database_displayname,
                        database_size
                    )
                        .then(DB => {
                            db = DB;
                            // console.log("Database OPEN");
                            db.executeSql('SELECT 1 FROM BOOKING LIMIT 1').then(() => {
                                // console.log("Database is ready ... executing query ...");
                            }).catch((error) => {
                                // console.log("Received error: ", error);
                                // console.log("Database not yet ready ... populating data");
                                db.transaction((tx) => {
                                    tx.executeSql(`CREATE TABLE IF NOT EXISTS BOOKING (
                                        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
                                        name TEXT, 
                                        phone TEXT, 
                                        hour TEXT, 
                                        minute TEXT, 
                                        date TEXT, 
                                        status TEXT)`
                                    );
                                }).then(() => {
                                    // console.log("Table created successfully");
                                }).catch(error => {
                                    // console.log(error);
                                });
                            });
                            resolve(db);
                        })
                        .catch(error => {
                            // console.log(error);
                        });
                })
                .catch(error => {
                    // console.log("echoTest failed - plugin not functional");
                });
        });
    };

    closeDatabase(db) {
        if (db) {
            // console.log("Closing DB");
            db.close()
                .then(status => {
                    // console.log("Database CLOSED");
                })
                .catch(error => {
                    this.errorCB(error);
                });
        } else {
            // console.log("Database was not OPENED");
        }
    };

    addBooking(booking) {
        return new Promise((resolve) => {
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql(`
                    INSERT INTO BOOKING(name, phone, hour, minute, date, status) VALUES (?, ?, ?, ?, ?, ?)`,
                        [booking.name, booking.phone, booking.hour, booking.minute, booking.date, booking.status])
                        .then(([tx, results]) => {
                            resolve(results);
                        });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    // console.log(err);
                });
            }).catch((err) => {
                // console.log(err);
            });
        });
    }

    listProduct() {
        return new Promise((resolve) => {
            const listBooking = [];
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT b.name, b.phone, b.hour, b.minute, b.date FROM  BOOKING b', []).then(([tx, results]) => {
                        // console.log("Query completed");
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            // console.log(`ID: ${row.id}, Name: ${row.name}, Phone: ${row.phone}, Hour: ${row.hour}, Minute: ${row.minute}, Date: ${row.date}, row`)
                            const { id, name, phone, hour, minute, date, status } = row;
                            listBooking.push({
                                id, name, phone, hour, minute, date, status
                            });
                        }
                        // console.log(listBooking);
                        resolve(listBooking);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    // console.log(err);
                });
            }).catch((err) => {
                // console.log(err);
            });
        });
    }

    listTodayBooking(date) {
        return new Promise((resolve) => {
            const listBooking = [];
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM  BOOKING b WHERE b.date = ? ORDER BY b.hour ASC, b.minute ASC ', [date]).then(([tx, results]) => {
                        // console.log("Query completed");
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            // console.log(`ID: ${row.id}, Name: ${row.name}, Phone: ${row.phone}, Hour: ${row.hour}, Minute: ${row.minute}, Date: ${row.date}, row`)
                            const { id, name, phone, hour, minute, date, status } = row;
                            listBooking.push({
                                id, name, phone, hour, minute, date, status
                            });
                        }
                        // console.log(listBooking);
                        resolve(listBooking);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    // console.log(err);
                });
            }).catch((err) => {
                // console.log(err);
            });
        });
    }

    updateBooking(booking) {
        return new Promise((resolve) => {
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('UPDATE BOOKING SET status = ? WHERE id = ?', [booking.status, booking.id]).then(([tx, results]) => {
                resolve(results);
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              // console.log(err);
            });
          }).catch((err) => {
            // console.log(err);
          });
        });  
      }
}