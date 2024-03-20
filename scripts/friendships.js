var isUserProfile = false

function sendRequest(level, username) {
    //level is either 1 or 2
    //send a request to "/friendships/follow/{user}/"

    fetch('/friendships/follow/' + username + '/' + level)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            if (data.status == 'success') {
                console.log(`You are now following ${username}`);
                if (isUserProfile) {
                    followers++
                    document.getElementById('follower-count').innerHTML = formatNumber(followers)
                    removeFollowButton()
                    if (level == 2) {
                        FriendRequestSentButton()
                    }
                }
            }
            else if (data.status == 'error' & data.errorCode == 'already_following') {
                console.log(`You are already following ${username}`);
                if (isUserProfile) {
                    removeFollowButton()
                    if (level == 2) {
                        FriendRequestSentButton()
                    }
                }
            } else {
                console.log(data);
            }
        }
        )
        .catch(error => console.error(error));
}

function follow(username) { sendRequest(1, username) }
function friendRequest(username) { sendRequest(2, username) }


function unfollow(username) {
    //send a request to "/friendships/unfollow/{user}/"

    fetch('/friendships/unfollow/' + username)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            if (data.status == 'success') {
                console.log(`You are no longer following ${username}`);
                if (isUserProfile) {
                    followers--
                    document.getElementById('follower-count').innerHTML = formatNumber(followers)
                    addFollowButton()
                    addFriendRequestButton()
                }
            }
            else if (data.status == 'error' & data.errorCode == 'not_following') {
                console.log(`You are not following ${username}`);
                if (isUserProfile) {
                    addFollowButton()
                    addFriendRequestButton()
                }
            } else {
                console.log(data);
            }
        })
        .catch(error => console.error(error));
}

function accept(username) {
    //send a request to "/friendships/accept/{user}/"

    fetch('/friendships/accept/' + username)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            if (data.status == 'success') {
                console.log(`You are now friends with ${username}`);
                if (isUserProfile) {
                    removeFriendRequestButton()
                    addFriendButton()
                }
            }
            else if (data.status == 'error' & data.errorCode == 'not_friend_request') {
                console.log(`You are not friends with ${username}`);
                if (isUserProfile) {
                    addFriendButton()
                }
            } else {
                console.log(data);
            }
        })
        .catch(error => console.error(error));
}