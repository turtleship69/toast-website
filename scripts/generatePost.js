function createPostHTML(post) {
    // Create main container div
    var postDiv = document.createElement("div");
    postDiv.className = "posts post single";

    // User details container
    var userContainer = document.createElement("div");
    userContainer.className = "posts post user container";

    var userBorder = document.createElement("div");
    switch (post.Visibility) {
        case 2:
            userBorder.className = "posts post user border public";
            break;
        case 1:
            userBorder.className = "posts post user border onlyFriends";
            break;
        case 0:
            userBorder.className = "posts post user border private";
            break;
        default:
            console.warn("no visibility provided")
    }

    var userPfp = document.createElement("img");
    userPfp.className = "posts post user pfp";
    if (post.Gravatar) {
        userPfp.src = post.Gravatar;
    } else {
        userPfp.src = "/placeholder/pfp.jpg"; // You may want to update this with the actual user's profile picture
    }
    userBorder.appendChild(userPfp);
    userContainer.appendChild(userBorder);

    var userDetails = document.createElement("div");
    userDetails.className = "posts post user details";

    var username = document.createElement("p");
    username.className = "posts post user details username";
    username.innerText = post.Username;
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


    if (post.Image1) {
        var postImage = document.createElement("img");
        postImage.className = "posts post media image";
        postImage.src = post.Image1;
        mediaContainer.appendChild(postImage);

        if (post.Body) {
            var caption = document.createElement("p");
            caption.className = "posts post media caption";
            caption.innerText = post.Body;
            mediaContainer.appendChild(caption);
        }
    } else if (post.Body) {
        var postTextDiv = document.createElement("div");
        postTextDiv.className = "posts post content container";
        var postText = document.createElement("p");
        postText.className = "posts post content text";
        postText.innerText = post.Body;
        postTextDiv.appendChild(postText);
        postDiv.appendChild(postTextDiv);
    }
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