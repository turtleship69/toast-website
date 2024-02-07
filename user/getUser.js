const username = new URLSearchParams(window.location.search).get('u')
var followers
var following

if (!username) {
    console.log('No username provided')
} else {
    //make a request to /friendships/user/{username} to get user info
    fetch(`/friendships/user/${username}`)
        .then(response => response.json())
        .then(data => {
            //if the user exists, display their info
            if (data.status == "success") {
                document.getElementById('loading').style.display = 'none'
                document.getElementById('main').style.display = 'block'

                document.getElementById('username').innerHTML = username
                followers = data.followers
                document.getElementById('follower-count').innerHTML = formatNumber(followers)
                following = data.following
                document.getElementById('following-count').innerHTML = formatNumber(following)
                document.getElementById('bio').innerHTML = data.bio
                document.getElementById('profile-picture').src = data.gravatar

                if (data.is_following) {
                    removeFollowButton()
                } else {
                    addFollowButton()
                    addFriendRequestButton()
                }
            } else {
                //if the user doesn't exist, display an error message
                document.getElementById('message').innerHTML = 'User not found'
            }
        }).catch(error => console.error(error))
}

