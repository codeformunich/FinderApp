FinderApp
=========

A generic web-app for finding the nearest locations of a single type of utility
(e.g. toilets, recycling stations) on OpenStreetmap. The current customization uses playgrounds as an example.

Development Setup
-----------

FinderApp is originally based on the
[Web Starter Kit](https://developers.google.com/web/starter-kit/)
provided by Google. It uses the tools and the build processes of the kit. It's a
pure JavaScript webapp without any Backend and can therefore be deployed on any server.

You need the following tools installed on your system:
* NodeJS and NPM. You can check if you have NodeJS by running `node -v`
in your terminal. Otherwise go to [nodejs.org](http://nodejs.org) to install the
newest version. NPM is part of the NodeJS installation
* Ruby and Sass. You can also check for ruby with `ruby -v`. In addition to ruby
you need Sass which you can install via `gem install sass` in your terminal.

If you have installed those dependencies go to the project folder and
run `npm install` to install all dependencies of the app.
Sometimes you have to install some of the packages manually.

The Gulp taskrunner is used for creating compiling sass, concatenating js and
creating a deployable version.
After all dependencies are installed you can run `gulp serve` to run the app locally.
The Gulp taskrunner automatically starts up a local server. When compiling Gulp
automatically checks for compliance with the included JSHint and JSCS rules.

FinderApp uses [Browserify](http://browserify.org/) for dependency management and
bundling the JavaScript. This enables us to use the same syntax for dependency
management as known from NodeJS.

The following tutorial can also help you understand the purpose and uses of
Gulp and Browserify:

* [Gulp Browserify Starter FAQ]((http://viget.com/extend/gulp-browserify-starter-faq))

Deployment
----------
Currently we use GitHub Pages for deploying an online version of the app.
Our current progress is accessible [here](http://codeformunich.github.io/FinderApp/).
To get a deployable version of the app run `gulp` while on the master branch.
The contents of the `/dist` folder are then ready for deployment. To update the Version
running on GitHub Pages just replace the contents of the gh-pages branch with the contents of the `/dist` folder.


Code Architecture
-----------
Our code uses the MV* framework [Ampersand.js](http://ampersandjs.com/) for structuring.
Our general structure is derived from the short book [Human Javascript](http://read.humanjavascript.com) and the
[Ampersand documentation](http://ampersandjs.com/docs).
`app.js` is the main entry point of our application and initializes required objects.
`app-controller.js` manages the state changes in the app.
The `user-state.js` is instantiated as a singleton that saves all properties of the user.
`map-node-model.js` and `map-node-collection.js` define the classes that handle the
results from Nominatim/Overpass.  


Customisation
---------------
In order to change the target utility of the FinderApp you just have to change two small things.

* search query
* graphical customisation (e.g. icons, colours)

We use the [Nominatim API](http://wiki.openstreetmap.org/wiki/Nominatim) of OpenStreetMap.
Nominatim is able to understand special keywords for search in OSM.
A list of available keywords can be found [here](http://wiki.openstreetmap.org/wiki/Nominatim/Special_Phrases).
You can change the query via the `app.query` variable in app.js.

The logo url can be found in the index.html file and colours can be changed in the `*.scss` files.


Software Used
-------------
* [Web Starter Kit](https://developers.google.com/web/starter-kit/)
as a baseline and styleguide/framework for our application
* [Sass](http://sass-lang.com/) as preprocessor for our stylesheets
* [Browserify](http://browserify.org/) as a bundler for our JS
* [Ampersand.js](http://ampersandjs.com/) as MV* framework
* [Handlebars.js](http://handlebarsjs.com/) as JavaScript templating language
* [leaflet.js](http://leafletjs.com/) for displaying OpenStreetMap data
* jQuery and underscore.js
