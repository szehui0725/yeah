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

var gap = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("backbutton", this.onBackKeyDown, false);
    },
    onDeviceReady: function() {
        gap.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);

        // appInit();
    },
    onBackKeyDown: function() {
        mainView.router.back();
    }
};

// function appInit() {
//     applyLanguage();
//
//     if (localStorage.firstInstall === 'true') {
//         app.modal({
//             afterText: LANG[localStorage.main_lang]['ui']['choose_language'],
//             verticalButtons: true,
//             buttons: [{
//                 text: LANG[localStorage.main_lang]['ui']['lang_zh'],
//                 onClick: function() {
//                     localStorage.firstInstall = 'false';
//                     app.alert(LANG[localStorage.main_lang]['ui']['language_set'], function() {
//                         isLoggedIn();
//                     });
//                 }
//             }, {
//                 text: LANG[localStorage.main_lang]['ui']['lang_en'],
//                 onClick: function() {
//                     localStorage.main_lang = 'en';
//                     localStorage.firstInstall = 'false';
//                     alertMsg(0, 'language_set');
//                 }
//             }]
//         });
//     } else {
//         isLoggedIn();
//     }
// }

var app = new Framework7({
    modalTitle: "Yeah!!!",
    modalButtonOk: "ok",
    modalButtonCancel: "cancel",
    modalPreloaderTitle: "",
    material: true,
    materialPageLoadDelay: 100,
    sortable: false,
    swipeout: true
});
// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = app.addView('.view-main', {});


//var mySearchbar = app.searchbar('.searchbar', {
//  searchList: '.list-block-search',
//  searchIn: '.item-title'
//});
// function search(val) {
//     var results = [];
//     $('button').on('click',function(){
//       var search = $('input[type="text"]').val();
//
//       var i = 0;
//       var max = item.length;
//       for (i = 0; i < max; i++){
//         if (item[i].title.indexOf(search) > -1{
//           results.push(item[i]);
//         }
//         if (test(item[i].title)){
//           results.push(item[i]);
//         }
//       }
//       concole.log(results.length > 0 ?
//         "results" : "No result");
//     });
// }
