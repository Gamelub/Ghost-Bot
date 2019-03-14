var request = require("request");
var auth = require("./auth.json");
var mysql = require("mysql");

const ROOT_PATH = "https://www.bungie.net/Platform";
const BASE_URL = "https://www.bungie.net"

/* REQUEST HEADER WITH API KEY */
var requestHeader =
{
    url: "",
    headers: {
        'X-API-Key': auth.X_API_Key
    }
};

var connection = mysql.createConnection({
    host: auth.Host,
    user: auth.User,
    password: auth.Password,
    database: auth.Database
});

connection.connect(function(err) {
    if (err) { console.log(err.toString()); }
    else { console.log("Connected!"); }
});

connection.query("SELECT * FROM path", function(error, results, fields) {
    if (error) console.log(error.toString());
    else (console.log(results[0].latest));
});

connection.end();



// var FindManifestPath = function () {
//     return new Promise((resolve, reject) => {
//         requestHeader["url"] = ROOT_PATH + "/Destiny2/Manifest/";

//         request(requestHeader, function (error, response, body) {
//             if (!error && response.statusCode == 200) {
//                 let results = JSON.parse(body);

//                 if (results["Response"] === undefined) {
//                     reject("FindManifest rejected the Promise");
//                 }
//                 else {
//                     //resolve(results);
//                     //resolve(results["Response"]["mobileWorldContentPaths"]["en"]);
//                     resolve(results["Response"]["jsonWorldContentPaths"]["en"]);
//                 }
//             }
//         });
//     });
// };

// var FindManifest = function (path) {
//     return new Promise((resolve, reject) => {
//         requestHeader["url"] = BASE_URL + path;

//         request(requestHeader, function (error, response, body) {
//             if (!error && response.statusCode == 200) {
//                 //resolve(body);
//                 let results = JSON.parse(body);

//                 resolve(results);
//             }
//         });
//     });
// };

// var RebuildManifestDB = function (jsonManifest) {
//     return new Promise((resolve, reject) => {
//         connection.connect(function (err) {
//             if (err) { reject("Connection to database failed"); }
//         });

//         for (let definition in jsonManifest) {
//             let table = definition.toString();
//             connection.query("create table if not exists " + table + " (hash BIGINT, value JSON)");

//             connection.query("delete from " + table);

//             for (let hash in jsonManifest[table]) {
//                 connection.query("insert into " + table + " (hash, value) values ("
//                     + hash + ", \'" + JSON.stringify(jsonManifest[table][hash]) + "\')");
//             }

//             // console.log("\"" + table + "\"");
//         }
//         resolve("Database built");
//     });
// };

// var GetManifest = async function () {
//     let path = await FindManifestPath();
//     let manifest = await FindManifest(path);
//     let built = await RebuildManifestDB(manifest);

//     return built;
// };


// GetManifest().then(results => {
//     console.log(results);
// }).catch(message => {
//     console.log(message.toString());
// }).finally(() => {
//     connection.end();
// });













// async function CreateManifestDB(jsonManifest)
// {

//     let connected = await ConnectToManifestDB();
//     if (!connected)
//     {
//         return "Connection failed.";
//     }

//     for (let table in jsonManifest)
//     {
//         console.log(table);
//     }


//     connection.end();
// }


// function ConnectToManifestDB()
// {
//     connection.connect(function(err) {
//         if (err) 
//         { 
//             console.log(err.toString());
//             return false;
//         }
//         else 
//         { 
//             return true;
//         }
//     });
// }