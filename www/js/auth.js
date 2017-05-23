function checkUser() {
    if (localStorage.login === "true") {
        app.closeModal(); //close login modal before enter homepage
        homePage();
    } else {
        app.loginScreen();
    }
}

$$('#login').on('click', function() {
    login();
});

$$('input[name="username"]').on('keyup', function(e) {
    if (e.keyCode === 13) {
        $$('input[name="password"]').focus();
    }
});

$$('input[name="password"]').on('keyup', function(e) {
    if (e.keyCode === 13) {
        login();
    }
});

function login() {
    var username = $$('input[name="username"]').val();
    var password = $$('input[name="password"]').val();


    // if (isEmpty(username)) {
    //     alertMsg(-1, "invalid_username");
    // } else if (isEmpty(password) || password.length < 6) {
    //     alertMsg(-1, "invalid_password");
    // } else {
    //     var loginObj = {
    //         username: username,
    //         password: password
    //     };
    //
    //     request('POST', 'login', loginObj, function(res) {
    //         if (res.status === 'success') {
    //             if (res.data.status === 2) {
    //                 alertMsg(-1, "user_status_2");
    //             } else if (res.data.status === 5) {
    //                 alertMsg(-1, "user_status_5");
    //             } else if (loginObj.username.toLowerCase() !== res.data.username.toLowerCase()) {
    //                 console.log('login username !== response username');
    //                 alertMsg(0, "login_username_mismatched");
    //             } else {
    //
    //                 localStorage.login = "true";
    //                 localStorage.username = loginObj.username;
    //                 localStorage.name = res.data.name;
    //                 localStorage.status = res.data.status;
    //                 if (loginObj.username.toLowerCase() === 'demoapp') {
    //                     localStorage.role = 'demo';
    //                 } else {
    //                     localStorage.role = res.data.role;
    //                 }
    //                 localStorage.authKey = res.data.authKey;
    //                 localStorage.loginTime = new Date();
    //                 localStorage.profilePic = "1";
    //                 isLoggedIn();
    //                 //app.hidePreloader();
    //             }
    //         } else {
    //             hidePreloader();
    //             app.alert(LANG[localStorage.main_lang]['ui'][res.code], function() {
    //                 $$('input[id="loginPassword"]').val('').focus();
    //             });
    //
    //         }
    //     });
    // }

    if (isEmpty(username)) {
        app.alert("Invalid username");
    } else if (isEmpty(password) || password.length < 6) {
        app.alert("Invalid password");
    } else if (!isEmpty(username) && !isEmpty(password)) {
        app.alert('Hi, ' + username, function() {
            localStorage.name = username;
            localStorage.login = true;

            checkUser();
        });
    }
}

$$('.fa-eye#viewLoginPw').on('touchstart', function() {
    $$('input[id="loginPassword"]').attr('type', 'text');
});

$$('.fa-eye#viewLoginPw').on('touchend', function() {
    $$('input[id="loginPassword"]').attr('type', 'password');
});

$$('.fa-eye#viewLoginPw').on('touchstart', function() {
    $$('input[id="regPassword"]').attr('type', 'text');
});

$$('.fa-eye#viewLoginPw').on('touchend', function() {
    $$('input[id="regPassword"]').attr('type', 'password');
});

$$('.item-link#linkToForgetPw').on('click', function() {
    app.prompt('Please enter your E-mail.', 'Yeah!!!',
        function(email) {
            if (!isEmail(email)) {
                app.alert("Invalid email");
            } else {
                request('POST', 'forgot', {
                    email: email
                }, function(res) {
                    if (res.status === 'success') {
                        app.alert('New password will be sent to your email.');
                    } else {
                        handleError(res);
                    }
                });
            }
        });
});

// $$('.item-link#linkToForgetPw').on('click', function() {
//     app.prompt(LANG[localStorage.lang]['ui']['forget_pw_1'], function(email) {
//         if (!isEmail(email)) {
//             alertMsg(-1, "forgot_password_invalid_email");
//         } else {
//             request('POST', 'forgot', {
//                 email: email
//             }, function(res) {
//                 if (res.status === 'success') {
//                     alertMsg(0, 'forgot_password_success');
//                 } else {
//                     handleError(res);
//                 }
//             });
//         }
//     });
// });



$$('.button#register').on('click', function() {

    initDatePicker('#regDob');

    // $$('select#regCountry').html(countryHtml);
    // $$('select#regCountry').on('change', function() {
    //     $$('#regDialCode').val('+' + COUNTRY_CODE_ISO[$$(this).val()].country_code);
    // });
    // $$('select#regCountry').val('my');
    // $$('#regDialCode').val('+60');
    app.popup('.popup-register');
});

$$('#btnRegSubmit').on('click', function() {
    // email username
    var fullname = $$('input#regFullname').val();
    var name = $$('input#regUsername').val();
    var password = $$('input#regPassword').val();
    var gender = $$('select#regGender').val();
    var dob = $$('input#regDob').val();
    var hp = $$('input#regHp').val();

    if (isEmpty(fullname)) {
        alertMsg(-1, "Invalid fullname");
    } else if (isEmpty(name)) {
        alertMsg(-1, "Invalid username")
    } else if (isEmpty(password) || password.length < 6) {
        alertMsg(-1, "Invalid password");
    } else if (isEmpty(gender)) {
        alertMsg(-1, "Invalid gender");
    } else if (isEmpty(dob)) {
        alertMsg(-1, "Invalid date of birth");
    } else if (isEmpty(hp) || hp.length < 8) {
        alertMsg(-1, "Invalid mobile number");
    };

    // } else {
    //     var regObj = {
    //         "fullname": fullname,
    //         "username": username,
    //         "password": password,
    //         "gender": gender,
    //         "dob": dob,
    //         "hp": hp
    //     };
    // request('POST', 'register', regObj, function(res) {
    //     if (res.status === 'success') {
    //         alertMsg(0, 'register_success');
    //     } else {
    //         handleError(res);
    //     }
    // });
});

$$('.popup-register #btnRegCancel').on('click', function() {
    restart();
});
//
// $$('.popup-register #btnRegSubmit').on('click', function() {
//     app.closeModal('.popup-register');
//     app.closeModal('.login-screen');
//     app.loginScreen();
// });

function logout() {
    //localStorage.clear();
    delete localStorage.login;
    delete localStorage.name;
    restart();
}
