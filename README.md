# Budget-Tracker-PWA

## Description 
#
This is a Progressive Web Application utilizing IndexedDB, CacheAPI, and a Service Worker file.
#
#

# Functionality 
#
The configuration of the service worker and the webmanifest select files to be cached for offline functionality. The IndexedDB stores the cached data until the event handler alerts the application is back online. Once online the cached data is sent to the database and the cache is deleted. 
#
#
# Dependencies
#
Node.js, Express, Mongoose, Morgan
#
#
# Testing 
#
To test the application go to the deployed url; rocky-mesa-04552.herokuapp.com
enter some data in the form tracker, then open the developer tools and go to the Application page. Select the service worker and the check box for off-line. Once in off-line mode refresh the browser and  enter data. You will see the application is functional. 
#
#
# Screenshot
#
![Category-routes](./assets/screenshot.png)
#
#
# Links
![GitHub](https://github.com/NICKIEFRAUSTO/Budget-Tracker-PWA.git)
#
![Heroku](https://rocky-mesa-04552.herokuapp.com/)

