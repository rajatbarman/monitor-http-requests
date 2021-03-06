# monitor-http-requests
Logs all outgoing HTTP requests from your node/express server (real time)

Install through NPM

##### npm install monitor-http-requests

### Setup

* Step 1 - Start the HTTP server for this module (Runs on 9090 port by default)
```javascript
//In your app.js or server.js
 if(devEnvironment) { /* Recommended check for development environment */
    require('monitor-http-requests').init( [OptionalPortNumber] ); /* Starts a server which listens on localhost:9090 */
 }
```

* Step 2 - Log request and response object using the log function of this module.
```javascript
// In your file where you handle all outgoing HTTP requests 
var monitorHttpRequests = (devEnvironment) ? require('monitor-http-requests').log : function() {}; /* Recommended check for development environment */
monitorHttpRequests(options, response, [Optional Post Data])
```

`options` is expected to be a object which may or may not have these properties {url: "", host: "", path: "", headers: {}, method: ""}

`response` is expected to be a object or a JSON string.

`[Optional Post Data]` is expected to be a object or a JSON string, which should have the POST/PATCH/PUT data.

### Example
```javascript
 // In your file where you handle all outgoing HTTP requests 
 var monitorHttpRequests = (devEnvironment) ? require('monitor-http-requests').log : function() {}; /* Recommended check for development environment */
 /* Code simplified for illustration purpose */
 var options = {host: "http://www.google.com", method: "GET", path: "", headers: {}}
 NetworkRequest(options, {
  success: function(response) {
    monitorHttpRequests(options, response)
  },
  error: function(error) {
   monitorHttpRequests(options, error)
  }
 });
```

### Usage
Open localhost:9090 (or if you specified a different port number in `init` method use that)


