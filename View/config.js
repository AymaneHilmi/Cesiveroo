// IP Configuration
//
// The IP address of the server is hardcoded in the client application. This is a security risk because if the IP address of the server changes, the client application will no longer be able to connect to the server. To fix this issue, the IP address should be stored in a configuration file on the server, and the client application should read the IP address from the configuration file. This way, if the IP address of the server changes, the configuration file can be updated without having to modify the client application.
//

// Path: View/config.js
// Compare this snippet from View/controller/Account.js:

// Define the IP address of the server
const IP = '192.168.1.180'

export { IP }