function sendRequest(level) {
    //level is either 1 or 2
    //send a request to "/friendships/follow/{user}/"

    fetch('/friendships/follow/' + username + '/' + level)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            if (data.status == 'success') {
                console.log(`You are now following ${username}`);
                followers++
                document.getElementById('follower-count').innerHTML = formatNumber(followers)
                removeFollowButton()
                if (level == 2) {
                    removeFriendRequestButton()
                }
            }
            else if (data.status == 'error' & data.errorCode == 'already_following') {
                console.log(`You are already following ${username}`);
                removeFollowButton()
                if (level == 2) {
                    removeFriendRequestButton()
                }
            } else {
                console.log(data);
            }
        }
        )
        .catch(error => console.error(error));
}

function follow() {sendRequest(1)}
function friendRequest() {sendRequest(2)}


function unfollow() {
    //send a request to "/friendships/unfollow/{user}/"

    fetch('/friendships/unfollow/' + username)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            if (data.status == 'success') {
                console.log(`You are no longer following ${username}`);
                followers--
                document.getElementById('follower-count').innerHTML = formatNumber(followers)
                addFollowButton()
                addFriendRequestButton()
            }
            else if (data.status == 'error' & data.errorCode == 'not_following') {
                console.log(`You are not following ${username}`);
                addFollowButton()
                addFriendRequestButton()
            } else {
                console.log(data);
            }
        }
        )
        .catch(error => console.error(error));
}


const follow_button = document.getElementById('follow-button')

function addFollowButton() {
    //make the button say "follow", remove any current event listeners and add one that runs follow()
    follow_button.innerHTML = "Follow"
    follow_button.style.backgroundColor = "#31B1EA"
    
    follow_button.removeEventListener('click', unfollow);
    follow_button.addEventListener('click', follow);
}

function removeFollowButton() {
    //make the button say "unfollow", remove any current event listeners and add one that runs unfollow()
    follow_button.innerHTML = 'Following'
    follow_button.style.backgroundColor = '#2ecc71'
    
    follow_button.removeEventListener('click', follow);
    follow_button.addEventListener('click', unfollow);
}


const friend_request_button = document.getElementById('friend-request')

function addFriendRequestButton() {
    //make the button say "friend request", remove any current event listeners and add one that runs friendRequest()
    friend_request_button.innerHTML = 'Friend Request'
    friend_request_button.style.backgroundColor = '#9A58C6'

    friend_request_button.removeEventListener('click', unfollow);
    friend_request_button.addEventListener('click', friendRequest);
}

function removeFriendRequestButton() {
    //make the button say "friend request", remove any current event listeners and add one that runs friendRequest()
    friend_request_button.innerHTML = 'Remove friend request'
    friend_request_button.style.backgroundColor = '#f1c40f'

    friend_request_button.removeEventListener('click', friendRequest);
    friend_request_button.addEventListener('click', unfollow);
}