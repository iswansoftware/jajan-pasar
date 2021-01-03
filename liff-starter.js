window.onload = function () {
    const useNodeJS = false;   // if you are not using a node server, set this value to false
    const defaultLiffId = "1655326479-LRn341QY";   // change the default LIFF value if you are not using a node server

    // DO NOT CHANGE THIS
    let myLiffId = "";

    // if node is used, fetch the environment variable and pass it to the LIFF method
    // otherwise, pass defaultLiffId
    if (useNodeJS) {
        fetch('/send-id')
            .then(function (reqResponse) {
                return reqResponse.json();
            })
            .then(function (jsonResponse) {
                myLiffId = jsonResponse.id;
                initializeLiffOrDie(myLiffId);
            })
            .catch(function (error) {
                document.getElementById("liffAppContent").classList.add('hidden');
                document.getElementById("nodeLiffIdErrorMessage").classList.remove('hidden');
            });
    } else {
        myLiffId = defaultLiffId;
        initializeLiffOrDie(myLiffId);
    }
};

/**
* Check if myLiffId is null. If null do not initiate liff.
* @param {string} myLiffId The LIFF ID of the selected element
*/
function initializeLiffOrDie(myLiffId) {
    if (!myLiffId) {
        document.getElementById("liffAppContent").classList.add('hidden');
        document.getElementById("liffIdErrorMessage").classList.remove('hidden');
    } else {
        initializeLiff(myLiffId);
    }
}

/**
* Initialize LIFF
* @param {string} myLiffId The LIFF ID of the selected element
*/
function initializeLiff(myLiffId) {
    liff
        .init({
            liffId: myLiffId
        })
        .then(() => {
            // start to use LIFF's api
            initializeApp();
        })
        .catch((err) => {
            document.getElementById("liffAppContent").classList.add('hidden');
            document.getElementById("liffInitErrorMessage").classList.remove('hidden');
        });
}

/**
 * Initialize the app by calling functions handling individual app components
 */

const userLoginForm = document.getElementById('loginForm')
const userMenu = document.getElementById('userHasLogin')
const userLogoutButton = document.getElementById('liffLogoutButton')

function initializeApp() {
    userMenu.hidden = true
    cekStatus();

    if (!liff.isInClient()) {
        document.getElementById("openWindowButton").hidden = true;
        userLogoutButton.hidden = false
    } else {
        document.getElementById("openWindowButton").hidden = false;
        userLogoutButton.hidden = true
    }
}


function cekStatus() {
    if (liff.isLoggedIn()) {
        userMenu.hidden = false
        userLoginForm.hidden = true
        getUsername();
        sendMessage();
        openExternalBrowser();
        logoutLine();
    } else {
        userMenu.hidden = true
        userLoginForm.hidden = false
        loginLine();
    }
}


function loginLine() {
    document.getElementById('liffLoginButton').addEventListener('click', function () {
        if (!liff.isLoggedIn()) {
            liff.login();
        }
    });
}


function logoutLine() {
    document.getElementById('liffLogoutButton').addEventListener('click', function () {
        if (liff.isLoggedIn()) {
            liff.logout();
            window.location.reload();
        }
    });
}



// Display User Name 
function getUsername() {
    liff.getProfile().
        then(function (profile) {
            document.getElementById('username').textContent = profile.displayName;
            const profilePictureDiv = document.getElementById('profilePictureDiv');
            if (profilePictureDiv.firstElementChild) {
                profilePictureDiv.removeChild(profilePictureDiv.firstElementChild);
            }
            const img = document.createElement('img');
            img.src = profile.pictureUrl;
            img.alt = 'Profile Picture';
            profilePictureDiv.appendChild(img);
        })
        .catch(function (error) {
            window.alert('Error getting profile: ' + error);
        });
}

// Send Message
function sendMessage() {
    document.getElementById('sendMessageButton').addEventListener('click', function () {

        const text =
            `
    Terima kasih telah menunggu

    Pesanannya :
    ${data.sumOrderOfFood} Makanan
    ${data.sumOrderOfDrink} Minuman
    
    Mohon menunggu pesanan diantar ya :)
    `
        if (!liff.isInClient()) {
            sendAlertIfNotInClient();
        } else {
            liff.sendMessages([{
                'type': 'text',
                'text': text
            }]).then(function () {
                window.alert('Pesan Terkirim');
            }).catch(function (error) {
                window.alert('Error sending message: ' + error);
            });
        }
    });
}



function openExternalBrowser() {
    document.getElementById('openWindowButton').addEventListener('click', function () {
        liff.openWindow({
            url: 'https://manganopo.herokuapp.com/',
            external: true
        });
    });
}


function registerButtonHandlers() {
    document.getElementById('openWindowButton').addEventListener('click', function () {
        liff.openWindow({
            url: 'https://manganopo.herokuapp.com/', // Isi dengan Endpoint URL aplikasi web Anda
            external: true
        });
    });

    document.getElementById('closeWindowButton').addEventListener('click', function () {
        if (!liff.isInClient()) {
            sendAlertIfNotInClient();
        } else {
            liff.closeWindow();
        }
    });
    document.getElementById('liffLoginButton').addEventListener('click', function () {
        if (!liff.isLoggedIn()) {
            liff.login();
        }
    });


    document.getElementById('liffLogoutButton').addEventListener('click', function () {
        if (liff.isLoggedIn()) {
            liff.logout();
            window.location.reload();
        }
    });

    document.getElementById('sendMessageButton').addEventListener('click', function () {
        if (!liff.isInClient()) {
            sendAlertIfNotInClient();
        } else {
            liff.sendMessages([{
                'type': 'text',
                'text': "Anda telah menggunakan fitur Send Message!"
            }]).then(function () {
                window.alert('Ini adalah pesan dari fitur Send Message');
            }).catch(function (error) {
                window.alert('Error sending message: ' + error);
            });
        }
    });
}


function sendAlertIfNotInClient() {
    alert('This button is unavailable as LIFF is currently being opened in an external browser.');
}


