// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBKiInweXQMuz8Qi4cN9xYNdllZJli59bs",
    authDomain: "pn-chat-cafd2.firebaseapp.com",
    projectId: "pn-chat-cafd2",
    storageBucket: "pn-chat-cafd2.appspot.com",
    messagingSenderId: "192978732020",
    appId: "1:192978732020:web:9402b6eeecb07d07bb2fa1"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

let myName = prompt("Enter your name");

// notification 
function showNotification() {
    let message = document.getElementById('message').value;
    const notification = new Notification(myName, {
        body: message,
        icon: "../pn-logo.png"
    });

    notification.onclick = (e) => {
        window.location.href = "https://timetables2.pnc.passerellesnumeriques.org/calendar/students/"
    }
}



function sendMessage() {
    let message = document.getElementById('message').value;
    firebase.database().ref('messages').push().set({
        "sender": myName,
        "message": message
    });

    let checkPermission = Notification.permission;
    if (checkPermission === "granted") {
        //alert("We have permission")
        showNotification()
    }else if (checkPermission !== "denied") {
        Notification.requestPermission().then(permission => {
            // console.log(permission)
            if (permission === "granted") {
                showNotification()
            }
        });
    }
    document.getElementById('message').value = ""
    return false; // prevent form from submitting
}

// listening for coming messages 

firebase.database().ref('messages').on("child_added", function(snapshot) {
 let result = "";
 result += `<li>${snapshot.val().sender} : ${snapshot.val().message}</li>`;
 document.getElementById('messagesList').innerHTML += result

});

