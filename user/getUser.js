const current_user = new URLSearchParams(window.location.search).get('u')
const follow_button = document.getElementById('follow-button')
const friend_request_button = document.getElementById('friend-request')

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
                addBreadcrumbUser(data)


                document.getElementById('loading').style.display = 'none'
                document.getElementById('main').style.display = 'block'

                document.getElementById('username').innerHTML = current_user
                document.title = '@' + current_user + ' | Toast'
                followers = data.followers
                document.getElementById('follower-count').innerHTML = formatNumber(followers)
                following = data.following
                document.getElementById('following-count').innerHTML = formatNumber(following)
                if (!data.bio) {
                    document.getElementById('bio').innerHTML = "@" + data.username
                    data.bio = "See @" + data.username + "'s profile on toast"
                } else {
                    document.getElementById('bio').innerHTML = data.bio
                }
                //set meta description to user bio
                addMetaTags(data)
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

                if (data.is_current_user) {
                    addPfpChangeLink()
                    document.getElementById("friends").style.display = 'none'
                } else {
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
                        follow_button.innerHTML = "Friends"
                        follow_button.style.backgroundColor = '#9A58C6'
                        console.log("friends")
                    } else {
                        console.log(data.friendship)
                    }
                }
            } else {
                //if the user doesn't exist, display an error message
                document.getElementById('message').innerHTML = 'User not found'
            }
        }).catch(error => console.error(error))
}



function followEvent() { follow(current_user) }
function friendRequestEvent() { friendRequest(current_user) }
function unfollowEvent() { unfollow(current_user) }

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

function alreadyFriended() {
    //hide the friend request button
    friend_request_button.style.display = 'none'
}

setTimeout(function () { isUserProfile = true }, 100);


function addBreadcrumbUser(data) {
    const breadcrumbList = document.createElement('script');
    breadcrumbList.setAttribute('type', 'application/ld+json');

    // Build the BreadcrumbList object
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": window.location.origin,
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": data.username,
                "item": window.location.origin + '/user',
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": data.username,
                "item": window.location.href,
            }
        ],
    };

    breadcrumbList.textContent = JSON.stringify(breadcrumbSchema);
    document.querySelector('head').appendChild(breadcrumbList);
}

function addMetaTags(data) {
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'description');
    meta.setAttribute('content', data.bio);
    document.querySelector('head').appendChild(meta);
}

function addPfpChangeLink() {
    //add an event listener to the profile picture that runs uploadPfp():
    pfp = document.getElementById('profile-picture')
    pfp.addEventListener('click', uploadProfilePic);
    pfp.style.cursor = 'pointer'
    pfp.alt = 'Click to change profile picture'
}

async function uploadProfilePic() {
    const options = {
        multiple: false,
        types: [
            {
                description: 'Images',
                accept: {
                    'image/*': ['.png', '.jpeg', '.jpg', '.bmp', '.gif'],
                },
            },
        ],
    };

    try {
        const [fileHandle] = await window.showOpenFilePicker(options);
        const file = await fileHandle.getFile();

        const formData = new FormData();
        formData.append('pfp', file);

        const response = await fetch('/hanko/profile_picture', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            console.log('Profile picture uploaded successfully!');
            // Handle successful upload (e.g., update UI)
            //reload
            location.reload()
        } else {
            console.error('Error uploading profile picture:', response.statusText);
            // Handle upload error (e.g., display error message)
        }
    } catch (error) {
        console.error('Error picking or uploading image:', error);
    }
}
