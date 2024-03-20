function showNotifs() {
    // console.log("clicked")
    var notifDiv = document.getElementById('notif-div');
    notifDiv.classList.toggle("hidden");

    var website_name = document.getElementById('website-name-image');
    website_name.classList.toggle("hidden");

    var website_logo = document.getElementById('website-logo');
    website_logo.classList.toggle("hidden");

    getNotifs()
}


function getNotifs() {
    fetch('/notifications/')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var notifDiv = document.getElementById('notifs');
            notifDiv.innerHTML = "";
            for (var i = 0; i < data.length; i++) {
                var notif = createNotifDiv(data[i]);
                console.log(notif);
                notifDiv.appendChild(notif);
            }
        }
        )
}

function createNotifDiv(data) {
    var text
    var button
    switch (data.type) {
        case "NewFollower":
            text = data.username + " started following you!";
            button = document.createElement("button");
            button.innerText = "Follow back";
            button.addEventListener("click", function () {
                follow(data.username)
            })
            break
        case "FriendRequest":
            text = data.username + " sent you a friend request!";
            button = document.createElement("button");
            button.innerText = "Accept";
            button.addEventListener("click", function () {
                accept(data.username)
            })
            break
        case "NowFriends":
            text = data.username + " is now your friend!";
    }
    var notif = document.createElement("div");
    notif.className = "notif";
    notif.innerText = text;
    if (button) {
        notif.appendChild(button);
    }
    return notif
}



//onload, make a request to /hanko/check
//if data.status is not "success", change the link in #profile-a to /login and the text of #profile-p to Login
document.addEventListener("DOMContentLoaded", (event) => {
    fetch('/hanko/check')
        .then(response => response.json())
        .then(data => {
            if (data.status != "success") {
                var profile_a = document.getElementById('profile-a');
                profile_a.href = "/login";
                var profile_p = document.getElementById('profile-p');
                profile_p.innerText = "Login";
            }
        }
        )
  });