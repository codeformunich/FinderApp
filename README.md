FinderApp
=========

A generic web-app for finding the nearest locations of a single type of utility
(e.g. toilets, recycling stations) on OpenStreetmap.

Development Setup
-----------

FinderApp uses the [Web Starter Kit](https://developers.google.com/web/starter-kit/)
provided by Google. It uses the tools and
the build processes of the kit.
You need the following tools installed on your system:
* NodeJS and NPM. You can check if you have NodeJS by running `node -v`
in your terminal. Otherwise go to [nodejs.org](http://nodejs.org) to install the
newest version. NPM is part of the NodeJS installation
* Ruby and Sass. You can also check for ruby with `ruby -v`. In addition to ruby
you need Sass which you can install via `gem install sass` in your terminal.

If you have installed those dependencies go to the project folder and
run `npm install` to install all dependencies of the app.

After all dependencies are installed you can run `gulp serve` to run the app
locally. The Gulp taskrunner automatically starts up a local server. It also
compiles our Sass and our Browserify bundle.

The following tutorial can also help you to set up and understand the purpose of
the Web Starter kit:

* [Set Up Web Starter Kit](https://developers.google.com/web/fundamentals/tools/setup/setup_kit)

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
