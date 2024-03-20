const current_user = new URLSearchParams(window.location.search).get('u')
var followers
var following

if (!current_user) {
    console.log('No username provided')
} else {
    //make a request to /friendships/user/{username} to get user info
    fetch(`/friendships/user/${current_user}`)
        .then(response => response.json())
        .then(data => {
            //if the user exists, display their info
            if (data.status == "success") {
                document.getElementById('loading').style.display = 'none'
                document.getElementById('main').style.display = 'block'

                document.getElementById('username').innerHTML = current_user
                followers = data.followers
                document.getElementById('follower-count').innerHTML = formatNumber(followers)
                following = data.following
                document.getElementById('following-count').innerHTML = formatNumber(following)
                document.getElementById('bio').innerHTML = data.bio
                if (data.gravatar) {
                    document.getElementById('profile-picture').src = data.gravatar
                } else {
                    document.getElementById('profile-picture').src = '/placeholder/pfp.png'
                }
                
                //if there are no posts, make #no-posts visible
                if (data.posts.length == 0) {
                    document.getElementById('no-posts').style.display = 'block'
                }
                //for every post in data.post, run createPostHTML(post)
                data.posts.forEach(post => {
                    var postHTML = createPostHTML(post)
                    var postContainer = document.getElementById('posts')
                    postContainer.appendChild(postHTML)
                })

                if (data.friendship == 0) {
                    addFollowButton()
                    addFriendRequestButton()
                    console.log("not friends")
                } else if (data.friendship == 1) {
                    removeFollowButton()
                    addFriendRequestButton
                    console.log("following")
                } else if (data.friendship == 2) {
                    removeFollowButton
                    FriendRequestSentButton()
                    console.log("friends")
                }
            } else {
                //if the user doesn't exist, display an error message
                document.getElementById('message').innerHTML = 'User not found'
            }
        }).catch(error => console.error(error))
}


const follow_button = document.getElementById('follow-button')
const friend_request_button = document.getElementById('friend-request')

function followEvent(){follow(current_user)}
function friendRequestEvent(){friendRequest(current_user)}
function unfollowEvent(){unfollow(current_user)}

function addFollowButton() {
    //make the button say "follow", remove any current event listeners and add one that runs follow()
    follow_button.innerHTML = "Follow"
    follow_button.style.backgroundColor = "#31B1EA"
    
    follow_button.removeEventListener('click', unfollowEvent);
    follow_button.addEventListener('click', followEvent);
}

function removeFollowButton() {
    //make the button say "unfollow", remove any current event listeners and add one that runs unfollow()
    follow_button.innerHTML = 'Following'
    follow_button.style.backgroundColor = '#2ecc71'
    
    follow_button.removeEventListener('click', followEvent);
    follow_button.addEventListener('click', unfollowEvent);
}



function addFriendRequestButton() {
    //make the button say "friend request", remove any current event listeners and add one that runs friendRequest()
    friend_request_button.innerHTML = 'Friend Request'
    friend_request_button.style.backgroundColor = '#9A58C6'

    friend_request_button.removeEventListener('click', unfollowEvent);
    friend_request_button.addEventListener('click', friendRequestEvent);
}

function FriendRequestSentButton() {
    //make the button say "friend request", remove any current event listeners and add one that runs friendRequest()
    friend_request_button.innerHTML = 'Remove friend request'
    friend_request_button.style.backgroundColor = '#f1c40f'

    friend_request_button.removeEventListener('click', friendRequestEvent);
    friend_request_button.addEventListener('click', unfollowEvent);
}

function alreadyFriended(){
    //hide the friend request button
    friend_request_button.style.display = 'none'
}

setTimeout(function(){isUserProfile = true}, 100);