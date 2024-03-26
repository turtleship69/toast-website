var notifDiv = document.getElementById('notif-div');
var website_name = document.getElementById('website-name-image');
var website_logo = document.getElementById('website-logo');
var notif_logo = document.querySelector("#side-menu-navigation > a.side-menu.navigation.button.link.notifs > div > img")

function showNotifs() {
    // console.log("clicked")
    notifDiv.classList.toggle("hidden");

    website_name.classList.toggle("hidden");

    website_logo.classList.toggle("hidden");
    
    getNotifs()

    if (notif_logo.src.endsWith("/public/notif%20unselected.png")) {
        notif_logo.src = "/public/notif%20selected.png"
    }
    else {
        notif_logo.src = "/public/notif%20unselected.png"
    }

}


function getNotifs() {
    fetch('/notifications/')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var notifDiv = document.getElementById('notifs');
            notifDiv.innerHTML = "";
            if (data.length == 0) {
                notifDiv.innerHTML = "No new notifications";
                return;
            } else {
                for (var i = 0; i < data.length; i++) {
                    var notif = createNotifDiv(data[i]);
                    console.log(notif);
                    notifDiv.appendChild(notif);
                }
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

                var new_post_list = document.querySelector(".side-menu.navigation.button.link.newPost");
                new_post_list.href = "/login?redirect_url=/submit";
            }
        }
        )
});