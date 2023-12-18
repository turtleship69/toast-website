// Function to extract parameter from URL
function getUrlParameter(name) {
    name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Fetch data based on the "p" parameter
const postId = getUrlParameter("p");

if (postId) {
    const apiUrl = `/get_posts/get_post/${postId}`;

    fetch(apiUrl)
        .then(response => {
            if (response.status === 401) {
                return response.json().then(data => {
                    if (data.message === "Invalid session") {
                        // Redirect to the login page
                        login_redirect_url = `/login/?redirect_url=/post/?p=${new URLSearchParams(window.location.search).get('p')}`
                        window.location.href = login_redirect_url;
                    } else {
                        throw new Error(`Unauthorized: ${data.message}`);
                    }
                });
            } else if (response.status === 400) {
                return response.json().then(data => {
                    if (data.message === "Invalid post ID") {
                        errorMessage = document.createElement("p")
                        errorMessage.innerText = "Post not found"
                        document.getElementById("posts").appendChild(errorMessage)
                    } else {
                        throw new Error(`Unauthorized: ${data.message}`);
                    }
                });
            } else if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            let post = data;
            // Now you can use the 'post' object
            console.log(post);

            var postHTML = createPostHTML(post);
            var postContainer = document.getElementById("posts");
            postContainer.appendChild(postHTML); // Append the generated post HTML to the body or any other desired element
        })
        .catch(error => console.error("Error fetching data:", error));
} else {
    console.error("Post ID not found in the URL");
}


function createPostHTML(post) {
    // Create main container div
    var postDiv = document.createElement("div");
    postDiv.className = "posts post single";

    // User details container
    var userContainer = document.createElement("div");
    userContainer.className = "posts post user container";

    var userBorder = document.createElement("div");
    userBorder.className = "posts post user border private";

    var userPfp = document.createElement("img");
    userPfp.className = "posts post user pfp";
    userPfp.src = "/placeholder/pfp.jpg"; // You may want to update this with the actual user's profile picture

    userBorder.appendChild(userPfp);
    userContainer.appendChild(userBorder);

    var userDetails = document.createElement("div");
    userDetails.className = "posts post user details";

    var username = document.createElement("p");
    username.className = "posts post user details username";
    username.innerText = "Blank"; // Update with actual username
    userDetails.appendChild(username);

    var context = document.createElement("p");
    context.className = "posts post user details context";
    context.innerText = "Sydney, Australia · " + calculateTimeAgo(post.UploadTime);
    userDetails.appendChild(context);

    userContainer.appendChild(userDetails);

    postDiv.appendChild(userContainer);

    // Title container
    var titleContainer = document.createElement("div");
    titleContainer.className = "posts post title container";

    var titleText = document.createElement("p");
    titleText.className = "posts post title text";
    titleText.innerText = post.Title;
    titleContainer.appendChild(titleText);

    postDiv.appendChild(titleContainer);

    // Media container
    var mediaContainer = document.createElement("div");
    mediaContainer.className = "posts post media container";

    var postImage = document.createElement("img");
    postImage.className = "posts post media image";
    postImage.src = post.Image1;
    mediaContainer.appendChild(postImage);

    var caption = document.createElement("p");
    caption.className = "posts post media caption";
    caption.innerText = post.Body;
    mediaContainer.appendChild(caption);

    postDiv.appendChild(mediaContainer);

    // Actions container
    var actionsContainer = document.createElement("div");
    actionsContainer.className = "posts post actions container";

    var likeContainer = document.createElement("div");
    likeContainer.className = "posts post actions like";

    var likeImage = document.createElement("img");
    likeImage.className = "posts post actions like image bw-icon";
    likeImage.src = "/public/like unselected.png";
    likeContainer.appendChild(likeImage);

    var likeText = document.createElement("p");
    likeText.className = "posts post actions like text";
    likeText.innerText = "1.2k"; // You may want to update this with actual like count
    likeContainer.appendChild(likeText);

    actionsContainer.appendChild(likeContainer);

    var commentContainer = document.createElement("div");
    commentContainer.className = "posts post actions comment";

    var commentImage = document.createElement("img");
    commentImage.className = "posts post actions comment image bw-icon";
    commentImage.src = "/public/comment unselected.png";
    commentContainer.appendChild(commentImage);

    var commentText = document.createElement("p");
    commentText.className = "posts post actions comment text";
    commentText.innerText = "1.2k"; // You may want to update this with actual comment count
    commentContainer.appendChild(commentText);

    actionsContainer.appendChild(commentContainer);

    postDiv.appendChild(actionsContainer);

    return postDiv;
}

// Helper function to calculate time ago
function calculateTimeAgo(uploadTime) {
    // Implement your logic to calculate time ago based on the given UploadTime
    // This is just a placeholder, you may want to use a library like moment.js for a more robust solution
    return "12 hours ago";
}


