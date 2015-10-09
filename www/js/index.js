/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
  endTime: null,
  lastTap: null,
  tapCount: 0,

  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    var _this = this;
    document.addEventListener('deviceready', this.onDeviceReady, false);

    var  $tapButton = $('#tap-button');
    $tapButton.click($.proxy(_this.tap, _this));
    document.addEventListener('deviceready', _this.onDeviceReady, false);

    //navigator.geolocation.getCurrentPosition(_this.geolocationSuccess);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    app.receivedEvent('deviceready');
  },
  geolocationSuccess: function(position) {
    alert('Latitude: ' + position.coords.latitude + '<br />' + 'Longitude: ' + position.coords.longitude + '<br />' + '<hr />' );

  },
  // Update DOM on a Received Event
  receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
  },
  tap: function(event) {
    var _this = this;

    var date = new Date();
    var tapTime = date.getTime();
    var $tap = $('#tap-button span');
    var $countdown = $('#tap-countdown');

    // Check if it's the first tap
    if (_this.tapCount === 0) {
      _this.lastTap = tapTime;
      _this.endTime = date.getTime() + 10000;
      $tap.html('Tap me MORE');
    }

    var endTime = _this.endTime;

    // Check if tapping is too slow
    if ( date - _this.lastTap > 300 ) {
      // You lose
      $tap.fadeOut();

      // TODO:
      //  - show couch dialogs
      console.log('/map');

    } else if (tapTime >= endTime) {
      // You win
      $tap.fadeOut();

      // Adds points
      //Score.setNewPoints(_this.tapCount);

      // TODO:
      //  - show couch dialogs
      console.log('/map');
    }

    var count = _this.tapCount + 1;

    _this.tapCount =  count;
    _this.lastTap = date;
    console.log(count);

    var countdownTime = Math.round( (endTime - tapTime) / 1000 );

    console.log(countdownTime);

    if (!isNaN(countdownTime) ) {
      $countdown.html( countdownTime );
    }
  },
};

app.initialize();
