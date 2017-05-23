var slide = $$('#test').html();
var sliding = Template7.compile(slide);

$$(document).on('page:init', function(e) {
    // Page Data contains all required information about loaded and initialized page
    // var pageName = e.detail.page.name;
    var page = e.detail.page;
    var pageName = page.name;

    switch (pageName) {
        case 'main':
            homePage();
            break;
        case 'search':
            searchAction();
            break;
        case 'category':
            categoryAction();
            break;
        case 'product_catelog':
            productCatelogAction();
            break;
        case 'selling':
            sellingAction();
            break;
        case 'chats':
            chatsAction();
            break;
        case 'history':
            historyAction();
            break;
        case 'more':
            moreAction();
            break;
        case 'wishlist':
            wishlistAction();
            // wishlistAction(page.query);
            break;
        case 'changePassword':
            changePasswordAction();
            break;
        case 'contactUs':
            contactUsAction();
            break;
        case 'editProfile':
            editProfileAction();
            // registerProfileButton();
            break;
        case 'myProfile':
            myProfileAction();
            break;
        case (pageName.match(/smart-select-checkbox/) || {}).input:
            smartSelectChatsAction(pageName);
            break;
        default:
            break;
    }
});

function homePage() {

    $$.getJSON('js/data.json', function(res) {

        $$('#slider div').html(sliding(res));

        var bannerSwiper = app.swiper('.banner-swiper', {

            autoplay: 1000,
            speed: 1000,
            lazyLoading: true,
            preloadImages: true,
            loop: true,
            autoplayDisableOnInteraction: false,
            pagination: '.banner-pagination',
        });

    });

    var listHtml = '';
    for (var list in DETAIL) {
        if (DETAIL.hasOwnProperty(list)) {
            listHtml += '<li>' +
                '<a href="#" class="item-link item-content" id="' + list + '">' +
                // '<div class="item-media">' + 'src', 'img/' + list + '.jpg' + '</div>' +
                '<div class="item-media"><img src="img/' + list + '.jpg" width="50" height="50"/></div>' +
                '<div class="item-inner">' +
                '<div class="item-title">' + DETAIL[list].title + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
        }
    }
    //
    // <li class="item-content">
    //           <div class="item-media"><i class="icon icon-f7"></i></div>
    //           <div class="item-inner">
    //             <div class="item-title">Item with badge</div>
    //             <div class="item-after"><span class="badge">5</span></div>
    //           </div>
    //         </li>

    $$('.recent-added ul').html(listHtml);

    $$('.recent-added .item-link').on('click', function() {
        var id = $$(this).prop('id');
        localStorage.item = id;
        $$('.popup-recent-added .navbar .center').html('Item Details');
        // $$('.popup-recent-added p.name').html(DETAIL[id].title);
        $$('.popup-recent-added .content-block img').attr('src', 'img/' + id + '.jpg');
        $$('.popup-recent-added .content-block table .name').html(DETAIL[id].title);
        $$('.popup-recent-added .content-block table .description').html(DETAIL[id].description);
        $$('.popup-recent-added .content-block table .price').html('RM' + DETAIL[id].price);
        $$('.popup-recent-added .content-block table .place').html(DETAIL[id].place);
        $$('.popup-recent-added .content-block table .ownerUsername').html(DETAIL[id].name);
        app.popup('.popup-recent-added');
    });

    $$('#addWishlist').on('click', function() {
        var n = localStorage.item;
        var dtitle = DETAIL[n].title;
        localStorage.wname = dtitle;

        var p = localStorage.item;
        var dprice = DETAIL[p].price;
        localStorage.wprice = dprice;

        var pl = localStorage.item;
        var dplace = DETAIL[pl].place;
        localStorage.wplace = dplace;

    });

    // console.log(localStorage.wname);
}

// var DETAIL = [];
// localStorage["mycars"] = JSON.stringify(carnames);
// var storedNames = JSON.parse(localStorage["mycars"]);

function wishlistAction() {

    // $$('#abc').html(localStorage.wname);
    // $$('#qqq').html(localStorage.wprice);
    // $$('#gg').html(localStorage.wplace);

    console.log(localStorage.wname);

}

function hidePreloader() {
    app.hidePreloader();
    app.hideIndicator();
    return true;
}

function alertMsg(code, msg) {
    hidePreloader();
    app.alert(msg, function() {
        switch (code) {
            case -1:
                break;
            case 0:
                restart();
                break;
            case 1:
                refreshPage();
                break;
            case 2:
                mainView.router.back();
                break;
            case 9:
                logout(true);
                break;
            case 99:
                gap.clearAppsBadge();
                break;
            default:
                loadPage(code + '.html');
                break;
        }
    });
}

function request(type, action, dataObj, callback) {
    app.showIndicator();
    // $$.ajax({
    //     type: type,
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Api-Key': apiKey,
    //         'Auth-Key': localStorage.authKey !== undefined ? localStorage.authKey : ''
    //     },
    //     url: apiUrl + action,
    //     dataType: 'json',
    //     data: type === 'GET' ? '' : JSON.stringify(dataObj),
    //     //data: dataObj,
    //     success: callback,
    //     error: function(res, timeout) {
    //         if (timeout === 'timeout') {
    //             alertMsg(-1, 'connection_timeout');
    //         } else {
    //             handleError(res);
    //         }
    //     }
    // });
}

function loadPage(url) {
    mainView.router.loadPage(url);
    $$('.home-toolbar a').removeClass('selected');
    $$('.home-toolbar a[href="' + url + '"]').addClass('active');
}

function restart() {
    window.location = "./index.html";
}

function moreAction() {

    // $$('.user-profile img').attr('src', localStorage.profilePicUrl);
    //
    // $$('.edit-profile-pic').on('click', function() {
    //     var clickedLink = this;
    //     app.popover('.popover-links', clickedLink);
    // });

    $$('#profileName').html(localStorage.name);

    $$('#logout').on('click', function() {
        logout();
    });

    app.showToolbar('#mainToolbar');
}

$$('#addWishlist').on('click', function() {

});

// function wishlistAction(data) {
//     console.log(data);
// }

// $$('#addWishlist').on('click', function(){
//   var id = $$(this).prop('id');
//   $$('.wishlist .navbar .center').html('Wishlist');
//   // $$('.popup-recent-added p.name').html(DETAIL[id].title);
//   // $$('.wishlist .page-content img').attr('src', 'img/' + id + '.jpg');
//   $$('.wishlist .page-content .list-group ul .name').html(DETAIL[id].title);
//   $$('.wishlist .page-content table .description').html(DETAIL[id].description);
//   $$('.wishlist .page-content table .price').html('RM' + DETAIL[id].price);
//   $$('.wishlist .page-content table .place').html(DETAIL[id].place);
//   $$('.wishlist .page-content table .ownerUsername').html(DETAIL[id].name);
//   app.popup('.wishlist');
// });


// $$('#capturePhoto').on('click', function() {
//     app.closeModal('.popover-change-pic');
//     capturePhoto();
// });

$$('#captureEditable').on('click', function() {
    app.closeModal('.popover-change-pic');
    capturePhotoEdit();
});

$$('#fromLibrary').on('click', function() {
    app.closeModal('.popover-change-pic');
    getPhoto(Camera.PictureSourceType.PHOTOLIBRARY);
});

// $$('#fromAlbum').on('click', function() {
//     app.closeModal('.popover-change-pic');
//     getPhoto(Camera.PictureSourceType.SAVEDPHOTOALBUM);
// });

function onPhotoDataSuccess(imageData) {
    var smallImage = document.getElementById('editProfilePic');
    smallImage.src = "data:image/jpeg;base64," + imageData;
}

function onPhotoURISuccess(imageURI) {
    var largeImage = document.getElementById('editProfilePic');
    largeImage.src = imageURI;
}

function onPhotoDataSuccess(imageData) {
    var smallImage = document.getElementById('editProfilePic2');
    smallImage.src = "data:image/jpeg;base64," + imageData;
}

function onPhotoURISuccess(imageURI) {
    var largeImage = document.getElementById('editProfilePic2');
    largeImage.src = imageURI;
}

// function registerProfileButton() {
//   $$('.edit-contact').on('click', function() {
//     if ($$(this).html() === 'Save') {
//       $$('input[name="hpno"]').prop('disabled', true);
//       $$(this).html('Edit');
//     } else {
//       $$('input[name="hpno"]').prop('disabled', false);
//       $$(this).html('Save');
//     }
//   });

function capturePhoto() {
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        encodingType: Camera.EncodingType.PNG,
        correctOrientation: true,
        targetWidth: 100,
        targetHeight: 100
    });
}

function capturePhotoEdit() {
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 100,
        allowEdit: true,
        destinationType: Camera.DestinationType.DATA_URL,
        encodingType: Camera.EncodingType.PNG,
        correctOrientation: true,
        targetWidth: 100,
        targetHeight: 100
    });
}

function getPhoto(source) {
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 100,
        allowEdit: true,
        destinationType: Camera.DestinationType.FILE_URI,
        encodingType: Camera.EncodingType.PNG,
        sourceType: source,
        correctOrientation: true,
        targetWidth: 100,
        targetHeight: 100
    });
}

// function searchAction() {
//     $$.getJSON('js/data.json', function(res) {
//         $$('#tsh ul').html(searching(res));
//     });
// }
function chatsAction() {

    // var myMessagebar = app.messagebar('#myMessage', {
    //     maxHeight: 200
    // });
    // var myMessages = app.messages('.messages', {
    //     autoLayout: true
    // });
    // connect_id = null;
    // var connected_admin = {};
    //
    // localStorage.username = "app" + getRandomString(4);
    //
    // var socket = io('http://15.3.0.101:81');
    //
    // socket.on('connect', function(data) {
    //     socket.emit('user name', {
    //         type: 1,
    //         name: localStorage.username
    //     });
    // });
    // socket.on('event', function(data) {
    //     console.log(data);
    // });
    // socket.on('disconnect', function(data) {});
    //
    // $$('textarea[name="myMessage"]').on('keyup', function() {
    //     var textLength = $$(this).val().length;
    //     if (textLength > 0) {
    //         $$('#myMessage i').removeClass('fa-send-o').addClass('fa-send');
    //         $$('#myMessage a').css('pointer-events', 'auto');
    //     } else {
    //         $$('#myMessage i').removeClass('fa-send').addClass('fa-send-o');
    //         $$('#myMessage a').css('pointer-events', 'none');
    //     }
    // });

    // Conversation flag
    var conversationStarted = false;

    // Init Messages
    var myMessages = app.messages('.messages', {
        autoLayout: true
    });

    // Init Messagebar
    var myMessagebar = app.messagebar('.messagebar');

    // Handle message
    $$('.messagebar .link').on('click', function() {
        // Message text
        var messageText = myMessagebar.value().trim();
        // Exit if empy message
        if (messageText.length === 0) return;

        // Empty messagebar
        myMessagebar.clear()

        // Random message type
        var messageType = (['sent', 'received'])[Math.round(Math.random())];

        // Avatar and name for received message
        var avatar, name;
        if (messageType === 'received') {
            avatar = 'http://lorempixel.com/output/people-q-c-100-100-9.jpg';
            name = 'Kate';
        }
        // Add message
        myMessages.addMessage({
            // Message text
            text: messageText,
            // Random message type
            type: messageType,
            // Avatar and name:
            avatar: avatar,
            name: name,
            // Day
            day: !conversationStarted ? 'Today' : false,
            time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
        })

        // Update conversation flag
        conversationStarted = true;
    });

    app.hideToolbar('#mainToolbar');

    $$('#chatBack').on('click', function() {
        // socket.disconnect();
        // mainView.router.back();
        app.showToolbar('#mainToolbar');
    });

    // $$('#myMessage a.link').on('click', function() {
    //     text = myMessagebar.value().replace(/\r?\n/g, '<br />');
    //     socket.emit('send msg', {
    //         to: connected_admin.id,
    //         from: connect_id,
    //         fromName: localStorage.username,
    //         msg: text
    //     });
    //     myMessagebar.clear();
    //
    //     $$('#myMessage i').removeClass('fa-send').addClass('fa-send-o');
    //     $$('#myMessage a').css('pointer-events', 'none');
    // });
    //
    // socket.on('get msg', function(data) {
    //     addMessage(myMessages, data);
    //
    //     socket.emit('reply receive', data);
    // });
    //
    // socket.on('is received', function(msg) {
    //     addMessage(myMessages, msg);
    // });
    //
    // socket.on('disconnect chat', function() {
    //     socket.disconnect();
    //     myMessages.addMessage({
    //         text: 'Thanks, please rate us',
    //         type: 'received'
    //     });
    // });
    //
    // socket.on('connect chat', function(data) {
    //     hidePreloader();
    //     connected_admin.id = data.id;
    //     connected_admin.name = data.from;
    //     myMessages.addMessage({
    //         text: data.msg,
    //         from: data.from,
    //         type: 'received'
    //     });
    // });
    //
    // socket.on('user entrance', function(data) {
    //     if (connect_id === null) {
    //         connect_id = data.id;
    //     }
    //     showPreloader('Please be patient<br/>UID: ' + localStorage.username);
    // });
}

function historyAction() {
    app.hideToolbar('#mainToolbar');

    $$('#bck').on('click', function() {
        // socket.disconnect();
        // mainView.router.back();
        app.showToolbar('#mainToolbar');
    });
}

function categoryAction() {
    var listHtml = '';
    for (var list in CATEGORY) {
        if (CATEGORY.hasOwnProperty(list)) {
            listHtml += '<li class="accordion-item">' +
                '<a href="#" class="item-content item-link" id="' + list + '">' +
                '<div class="item-inner">' +
                '<div class="item-title">' + '<b>' + CATEGORY[list].title + '</b>' + '</div>' +
                '</div>' +
                '</a>' +
                '<div class="accordion-item-content">' +
                '<a href="#" class="item-content item-link" >' +
                '<div class="item-inner">' +
                '<div class="item-title">' + CATEGORY[list].item1 + '</div>' +
                '</div>' +
                '</a>' +
                '<a href="#" class="item-content item-link" >' +
                '<div class="item-inner">' +
                '<div class="item-title">' + CATEGORY[list].item2 + '</div>' +
                '</div>' +
                '</a>' +
                '<a href="#" class="item-content item-link" >' +
                '<div class="item-inner">' +
                '<div class="item-title">' + CATEGORY[list].item3 + '</div>' +
                '</div>' +
                '</a>' +
                '</div>' +
                '</li>';
        }
    }
    $$('.accordion-list ul').html(listHtml);

    // $$('.recent-added .item-link').on('click', function() {
    //     var id = $$(this).prop('id');
    //     $$('.popup-recent-added .navbar .center').html('Item Details');
    //     // $$('.popup-recent-added p.name').html(DETAIL[id].title);
    //     $$('.popup-recent-added .content-block img').attr('src', 'img/' + id + '.jpg');
    //     $$('.popup-recent-added .content-block table .name').html(DETAIL[id].title);
    //     $$('.popup-recent-added .content-block table .description').html(DETAIL[id].description);
    //     $$('.popup-recent-added .content-block table .price').html('RM' + DETAIL[id].price);
    //     $$('.popup-recent-added .content-block table .place').html(DETAIL[id].place);
    //     $$('.popup-recent-added .content-block table .ownerUsername').html(DETAIL[id].name);
    //     app.popup('.popup-recent-added');
    // });

    // $$('.category .item-link').on('click', function() {
    //     var id = $$(this).prop('id');
    //     $$('.popup-category .navbar .center').html('Item Details');
    //     $$('.popup-category p.name').html(CATEGORY[id].title);
    //     $$('.popup-category .content-block table .item1').html(CATEGORY[id].item1);
    //     $$('.popup-category .content-block table .item2').html(CATEGORY[id].item2);
    //     $$('.popup-category .content-block table .item3').html(CATEGORY[id].item3);
    //     app.popup('.popup-category');
    // });
}

function sellingAction() {
    $$('#sell').on('click', function() {
        var sName = $$('input#sellName').val();
        var sDescription = $$('input#sellDescription').val();
        var sPrice = $$('input#sellPrice').val();

        if (isEmpty(sName)) {
            alertMsg(-1, "Pls enter the item name.");
        } else if (isEmpty(sDescription)) {
            alertMsg(-1, "Pls enter the item description.");
        } else if (isEmpty(sPrice)) {
            alertMsg(-1, "Pls enter the item price.");
        } else {
            var sellItem = {
                sName: sName,
                sDescription: sDescription,
                sPrice: sPrice
            };

            // request('POST', 'selling', sellItem, function(res) {
            //     if (res.status === 'success') {
            //         alertMsg(1, "Sell");
            //     } else {
            //         handleError(res);
            //     }
            // });

        }
    });

    $$('#exchange').on('click', function() {
        var eName = $$('input#exchangeName').val();
        var eDescription = $$('input#exchangeDescription').val();

        if (isEmpty(eName)) {
            alertMsg(-1, "Pls enter the item name.");
        } else if (isEmpty(eDescription)) {
            alertMsg(-1, "Pls enter the item description.");
        } else {
            var exchangeItem = {
                eName: eName,
                eDescription: eDescription
            };

            // request('POST', 'selling', exchangeItem, function(res) {
            //     if (res.status === 'success') {
            //         alertMsg(1, "Exchange");
            //     } else {
            //         handleError(res);
            //     }
            // });

        }
    });

    $$('#request').on('click', function() {
        var rName = $$('input#requestName').val();
        var rDescription = $$('input#requestDescription').val();
        var rPrice = $$('input#requestPrice').val();
        var rOwner = $$('input#ownerName').val();

        if (isEmpty(rName)) {
            alertMsg(-1, "Pls enter the item name.");
        } else if (isEmpty(rDescription)) {
            alertMsg(-1, "Pls enter the item description.");
        } else if (isEmpty(rPrice)) {
            alertMsg(-1, "Pls enter the item price.");
        } else if (isEmpty(rOwner)) {
            alertMsg(-1, "Pls enter the owner name.");
        } else {
            var requestItem = {
                rName: rName,
                rDescription: rDescription,
                rPrice: rPrice,
                rOwner: rOwner
            };

            // request('POST', 'selling', requestItem, function(res) {
            //     if (res.status === 'success') {
            //         alertMsg(1, "Request");
            //     } else {
            //         handleError(res);
            //     }
            // });

        }
    });

}


function changePasswordAction() {
    $$('#btnPassSubmit').on('click', function() {
        var currentPassword = $$('input#cPassword').val();
        var newPassword = $$('input#nPassword').val();
        var reenterPassword = $$('input#rPassword').val();

        if (isEmpty(currentPassword) || currentPassword.length < 6) {
            alertMsg(-1, "Pls enter the current password.");
        } else if (isEmpty(newPassword) || newPassword.length < 6) {
            alertMsg(-1, "Pls enter the new password.");
        } else if (isEmpty(reenterPassword) || reenterPassword.length < 6) {
            alertMsg(-1, "Pls reenter the new password.");
        } else if (newPassword !== reenterPassword) {
            alertMsg(-1, "Pls reenter the new password again.");
        } else {
            var changePass = {
                currentPassword: currentPassword,
                newPassword: newPassword,
                reenterPassword: reenterPassword
            };

            // request('POST', 'changePassword', changePass, function(res) {
            //     if (res.status === 'success') {
            //         alertMsg(1, "Update Successful");
            //     } else {
            //         handleError(res);
            //     }
            // });

        }
    });

    $$('#btnPassClear').on('click', function() {
        $$('#cPassword').val('');
        $$('#nPassword').val('');
        $$('#rPassword').val('');
    });
}

function myProfileAction() {
    var username = localStorage.name;
    $$('#qqq').html(username);

    //     request('GET', 'getProfileFull', {}, function(res) {
    //     if (res.status === 'success') {
    //         var user = res.data;
    //         $$('input[name="userType"]').val(LANG[localStorage.main_lang]['user_type'][user.type].capitalize());
    //         $$('input[name="userStatus"]').val(LANG[localStorage.main_lang]['user_status'][localStorage.status].capitalize());
    //         $$('input[name="userUsername"]').val(user.username);
    //         $$('input[name="userEmail"]').val(user.email);
    //         $$('input[name="userFirstName"]').val(user.firstName);
    //         $$('input[name="userLastName"]').val(user.lastName);
    //         $$('input[name="userIdentity"]').val(user.nric);
    //         $$('select#userSelectCountry').val(user.countryCode);
    //         $$('input[name="userMobile"]').val(user.phone);
    //         $$('input[name="userFax"]').val(user.fax);
    //         $$('input[name="userDesc"]').val(user.description);
    //         hidePreloader();
    //     } else {
    //         handleError(res);
    //     }
    // });
}

function editProfileAction() {
    var today = new Date();

    var picker = app.picker({
        input: '#picker-date',
        toolbar: false,

        onChange: function(picker, values, displayValues) {
            var daysInMonth = new Date(picker.value[2], picker.value[1] * 1 + 1, 0).getDate();
            if (values[0] > daysInMonth) {
                picker.cols[0].setValue(daysInMonth);
            }
        },

        formatValue: function(p, values, displayValues) {
            return values[0] + ' ' + displayValues[1] + ' ' + values[2];
        },

        cols: [
            // Days
            {
                values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
            },
            // Months
            {
                values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
                displayValues: ('01 02 03 04 05 06 07 08 09 10 11 12').split(' '),
                textAlign: 'left'
            },
            // Years
            {
                values: (function() {
                    var arr = [];
                    for (var i = 1950; i <= 2017; i++) {
                        arr.push(i);
                    }
                    return arr;
                })(),
            }
        ],

        value: [today.getDate(), today.getMonth(), today.getFullYear()]
    });
    picker.open();
    picker.close();

    $$('#btnUpdate').on('click', function() {
        var fullname = $$('input#eFullname').val();
        var username = $$('input#eUsername').val();
        var gender = $$('select#eGender').val();
        var email = $$('input#eEmail').val();
        var nric = $$('input#eNric').val();
        var dob = $$('input#picker-date').val();
        var hp = $$('input#eHp').val();
        var address = $$('textarea#eAddress').val();

        if (isEmpty(fullname)) {
            alertMsg(-1, "Fullname is empty");
        } else if (isEmpty(username)) {
            alertMsg(-1, "Username is empty");
        } else if (isEmpty(gender)) {
            alertMsg(-1, "Gender is empty");
        } else if (isEmpty(email) || (!isEmail(email))) {
            alertMsg(-1, "Pls enter email again.");
        } else if (isEmpty(nric) || nric.length === 12) {
            alertMsg(-1, "NRIC is empty");
        } else if (isEmpty(dob)) {
            alertMsg(-1, "Date of birth is empty");
        } else if (isEmpty(hp) || hp.length < 8) {
            alertMsg(-1, "Mobile no is empty");
        } else if (isEmpty(address)) {
            alertMsg(-1, "Address is empty");
        } else {
            var updateObj = {
                fullname: fullname,
                username: username,
                gender: gender,
                email: email,
                nric: nric,
                dob: dob,
                hp: hp,
                address: address
            };

            // request('POST', 'editProfile', updateObj, function(res) {
            //     if (res.status === 'success') {
            //         alertMsg(1, "Update Successful");
            //     } else {
            //         handleError(res);
            //     }
            // });

        }
    });
}

function contactUsAction() {
    $$('#feedbackSubmit').on('click', function() {
        var type = $$('select#cType').val();
        var description = $$('textarea#cDescription').val();


        if (isEmpty(type)) {
            alertMsg(-1, "Pls choose a type");
        } else if (isEmpty(description)) {
            alertMsg(-1, "Description is empty");
        } else {
            var contact = {
                type: type,
                description: description
            };

            request('POST', 'contactUs', contact, function(res) {
                if (res.status === 'success') {
                    alertMsg(1, "Submit Successful");
                } else {
                    handleError(res);
                }
            });

        }
    });

    // onClear: function() {
    //     $$('#cType').css('display', 'none');
    //     $$('#cDescription').css('display', 'none');
    // }

    $$('#feedbackClear').on('click', function() {
        $$('#cType').val('');
        $$('#cDescription').val('');
    });

    // $$('#cType').css('display', 'none');
    // $$('#cDescription').css('display', 'none');
    //
    // contactUsAction();

    // var type = $$('select#cType').val();
    // var description = $$('textarea#cDescription').val();
    //
    // type.clear();
    // description.clear();
    // })
}

function initDatePicker(input, date) {

    var today;
    if (date) {
        today = date;
    } else {
        today = new Date();
    }

    var picker = app.picker({
        input: input,
        toolbar: false,

        onChange: function(picker, values, displayValues) {
            var daysInMonth = new Date(picker.value[0], picker.value[1] * 1 + 1, 0).getDate();
            if (values[2] > daysInMonth) {
                picker.cols[2].setValue(daysInMonth);
            }
        },

        formatValue: function(p, values, displayValues) {
            return values[0] + '-' + displayValues[1] + '-' + values[2];
        },

        cols: [
            // Years
            {
                values: (function() {
                    var arr = [];
                    for (var i = 1900; i <= 2020; i++) {
                        arr.push(i);
                    }
                    return arr;
                })(),
            },
            // Months
            {
                values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
                displayValues: ('01 02 03 04 05 06 07 08 09 10 11 12').split(' '),
                textAlign: 'left'
            },
            // Days
            {
                values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
            }
        ],

        value: [today.getFullYear(), today.getMonth(), today.getDate()]
    });
    picker.open();
    picker.close();
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#blah')
                .attr('src', e.target.result)
                .width(100)
                .height(100);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function searchAction() {

    $$('input[name="rangeFrom"]').on('change', function() {
        var value = parseFloat(parseFloat($$(this).val()).toFixed(2));
        $$('input[name="rangeFromTxt"]').val("RM " + value);
        $$('input[name="rangeTo"]').attr('min', (value));
        $$('input[name="rangeTo"]').attr('max', (value + 100));
        // $$('input[name="rangeTo"]').attr('value' ,(value + 0));
        // $$('input[name="rangeToTxt"]').val("RM " + (value + 10));
    });

    $$('input[name="rangeTo"]').on('change', function() {
        var value = $$(this).val();
        $$('input[name="rangeToTxt"]').val("RM " + value);
        $$('input[name="rangeFrom"]').attr('min', (0));
        $$('input[name="rangeFrom"]').attr('max', (value));
    });

    var results = [];
    // var results = JSON.stringify(item);
    $$('#btnPassSubmit').on('click', function() {

        var search = $$('input[name="itemName"]').val();
        var from = $$('input[name="rangeFrom"]').val();
        var to = $$('input[name="rangeTo"]').val();
        var filter = $$('select[name="place"]').val();

        var i = 0;
        var max = item.length;
        var patt = new RegExp(search);

        for (var i = 0; i < max; i++) {
            if (patt.test(item[i].name) && filter === (item[i].place) && parseFloat(item[i].price) >= parseFloat(from) && parseFloat(item[i].price) <= parseFloat(to)) {
                results.push(item[i]);
            }
        }

        // console.log(results.length>0? JSON.stringify(results):"No result");
        console.log(results.length > 0 ?
            results : "No result");
    });
}

function chatAction() {
    var myMessages = $$('.messages')[0].f7Messages;

    // Now you can use it
    myMessages.layout();
    // Conversation flag
    var conversationStarted = false;

    // Init Messages
    var myMessages = myApp.messages('.messages', {
        autoLayout: true
    });

    // Init Messagebar
    var myMessagebar = myApp.messagebar('.messagebar');

    // Handle message
    $$('.messagebar .link').on('click', function() {
        // Message text
        var messageText = myMessagebar.value().trim();
        // Exit if empy message
        if (messageText.length === 0) return;

        // Empty messagebar
        myMessagebar.clear()

        // Random message type
        var messageType = (['sent', 'received'])[Math.round(Math.random())];

        // Avatar and name for received message
        var avatar, name;
        if (messageType === 'received') {
            avatar = 'http://lorempixel.com/output/people-q-c-100-100-9.jpg';
            name = 'Kate';
        }
        // Add message
        myMessages.addMessage({
            // Message text
            text: messageText,
            // Random message type
            type: messageType,
            // Avatar and name:
            avatar: avatar,
            name: name,
            // Day
            day: !conversationStarted ? 'Today' : false,
            time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
        })

        // Update conversation flag
        conversationStarted = true;
    });
}
