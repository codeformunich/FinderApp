/*!
 *
 *  Web Starter Kit
 *  Copyright 2014 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
currentPosition = null;

(function () {
  'use strict';

  var querySelector = document.querySelector.bind(document);

  var navdrawerContainer = querySelector('.navdrawer-container');
  var body = document.body;
  var appbarElement = querySelector('.app-bar');
  var menuBtn = querySelector('.menu');
  var main = querySelector('main');


  function closeMenu() {
    body.classList.remove('open');
    appbarElement.classList.remove('open');
    navdrawerContainer.classList.remove('open');
  }

  function toggleMenu() {
    body.classList.toggle('open');
    appbarElement.classList.toggle('open');
    navdrawerContainer.classList.toggle('open');
  }

  main.addEventListener('click', closeMenu);
  menuBtn.addEventListener('click', toggleMenu);
  navdrawerContainer.addEventListener('click', function (event) {
    if (event.target.nodeName === 'A' || event.target.nodeName === 'LI') {
      closeMenu();
    }
  });


  //Custom code
  function processOverpassResults(result) {
    var results = new ResultCollection(result, {parse: true});
    console.log(results);

    results.each(createView)
  }


  function createView(result, index) {
    leaf.addMarker(result.toCoords(), 'Spielplatz #' + (index+1));

    var resultView = new ResultView({model: result});

    $('main').append(resultView.el)
  }


  leaf.initializeMap();

  //get current position before rendering anything
  navigator.geolocation.getCurrentPosition(function(position) {

    currentPosition = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    }

    overpass.performRequest('["leisure"="playground"]', processOverpassResults);
  });

})();
