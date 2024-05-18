function createPostHTML(post, single = false) {
    // Create main container div
    var postDiv = document.createElement("div");
    postDiv.className = "posts post single";
    postDiv.id = "Post-" + post.PostID;

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
    userPfp.alt = "Profile Picture";
    userBorder.appendChild(userPfp);

    pfp_link = document.createElement("a");
    pfp_link.href = "/user?u=" + post.Username;
    pfp_link.className = "posts post user pfp link";
    
    pfp_link.appendChild(userBorder);
    userContainer.appendChild(pfp_link);

    var userDetails = document.createElement("div");
    userDetails.className = "posts post user details";

    var username = document.createElement("p");
    username.className = "posts post user details username";
    username.innerText = post.Username;
    // userDetails.appendChild(username);

    var username_link = document.createElement("a");
    username_link.href = "/user?u=" + post.Username;
    username_link.className = "posts post user details username link";
    username_link.appendChild(username);

    userDetails.appendChild(username_link);

    var context = document.createElement("p");
    context.className = "posts post user details context";
    context.innerText = "Sydney, Australia · " + calculateTimeAgo(post.UploadTime);
    userDetails.appendChild(context);

    userContainer.appendChild(userDetails);


    if (post.byCurrentUser) {
        // Triple-dot menu container
        // var menuContainer = document.createElement("div");
        // menuContainer.className = "posts post menu container";

        var menu = document.createElement("div");
        menu.className = "posts post menu options";

        var deleteOption = document.createElement("button");
        deleteOption.className = "posts post menu option";
        deleteOption.classList.toggle("hidden");
        deleteOption.innerText = "Delete Post";
        deleteOption.addEventListener("click", function () {
            // Send delete request to /new_post/delete/{post_id}
            deletePost(post.PostID);
        });
        menu.appendChild(deleteOption);

        // Triple-dot menu image
        var menuImage = document.createElement("img");
        menuImage.className = "posts post menu image bw-icon";
        menuImage.src = "/public/menu.png";
        menuImage.alt = "post options";
        menu.appendChild(menuImage);


        userContainer.appendChild(menu);

        //make menuOptions toggle deleteOption's visibility
        menuImage.addEventListener("click", function () {
            deleteOption.classList.toggle("hidden");
        });

        // postDiv.appendChild(menuContainer);
    }

    postDiv.appendChild(userContainer);
    // Title container
    var titleContainer = document.createElement("div");
    titleContainer.className = "posts post title container";

    var titleText = document.createElement("p");
    titleText.className = "posts post title text";
    titleText.innerText = post.Title;
    titleContainer.appendChild(titleText);
    if (single) {
        document.title = post.Title;
    }

    postDiv.appendChild(titleContainer);


    // Media container
    var mediaContainer = document.createElement("div");
    mediaContainer.className = "posts post media container";


    if (post.Image1) {
        var scroll_view = document.createElement("div");
        scroll_view.className = "posts post scroll-view";

        var scroll_content = document.createElement("div");
        scroll_content.className = "posts post scroll-content";
        scroll_view.appendChild(scroll_content);

        var postImage = document.createElement("img");
        postImage.className = "posts post media image";
        postImage.src = post.Image1;
        postImage.alt = "image by " + post.Username;
        scroll_content.appendChild(postImage);

        if (post.Image2) {
            var postImage = document.createElement("img");
            postImage.className = "posts post media image";
            postImage.src = post.Image2;
            postImage.alt = "image by " + post.Username;
            scroll_content.appendChild(postImage);

            if (post.Image3) {
                var postImage = document.createElement("img");
                postImage.className = "posts post media image";
                postImage.src = post.Image3;
                postImage.alt = "image by " + post.Username;
                scroll_content.appendChild(postImage);

                if (post.Image4) {
                    var postImage = document.createElement("img");
                    postImage.className = "posts post media image";
                    postImage.src = post.Image4;
                    postImage.alt = "image by " + post.Username;
                    scroll_content.appendChild(postImage);

                    if (post.Image5) {
                        var postImage = document.createElement("img");
                        postImage.className = "posts post media image";
                        postImage.src = post.Image5;
                        postImage.alt = "image by " + post.Username;
                        scroll_content.appendChild(postImage);
                    }
                }

            }
        }
        mediaContainer.appendChild(scroll_view);

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
    likeImage.alt = "like";
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
    commentImage.alt = "comment";
    commentContainer.appendChild(commentImage);

    var commentText = document.createElement("p");
    commentText.className = "posts post actions comment text";
    commentText.innerText = "1.2k"; // You may want to update this with actual comment count
    commentContainer.appendChild(commentText);

    actionsContainer.appendChild(commentContainer);

    postDiv.appendChild(actionsContainer);

    if (single) {
        // Update meta tags for Discord embedding
        updateMetaTags(post);
        // Add breadcrumb to page
        addBreadcrumb(post);
        return postDiv;
    } else {
        postLink = document.createElement("a");
        postLink.className = "posts post viewPost link";
        postLink.href = "/post?p=" + post.PostID;
        postLink.appendChild(postDiv);
        return postLink;
    }
}

function updateMetaTags(post) {
    // Define meta tag properties and their corresponding content from the post object
    var metaTagProperties = {
        'og:title': post.Title,
        'twitter:title': post.Title,
        // Add more properties if needed
    };

    if (post.Body) {
        metaTagProperties['og:description'] = post.Body;
        metaTagProperties['twitter:description'] = post.Body;
    }

    if (post.Image1) {
        metaTagProperties['og:image'] = post.Image1;
        metaTagProperties['twitter:image'] = post.Image1;
    }

    // Update or create meta tags dynamically
    for (var property in metaTagProperties) {
        if (metaTagProperties.hasOwnProperty(property)) {
            var metaTag = document.querySelector(`meta[property="${property}"], meta[name="${property}"]`);
            if (!metaTag) {
                metaTag = document.createElement('meta');
                metaTag.setAttribute('property', property);
                metaTag.setAttribute('content', metaTagProperties[property]);
                document.head.appendChild(metaTag);
            } else {
                metaTag.setAttribute('content', metaTagProperties[property]);
            }
        }
    }
}

function addBreadcrumb(post) {
    // seo purposes
    // Get the current domain
    const domain = window.location.origin;

    // Define the breadcrumb path
    const breadcrumbList = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": domain
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Post",
                "item": domain + "/posts"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": post.Title,
                "item": domain + "/post?p=" + post.PostID
            }
        ]
    };

    // Create a script element for JSON-LD structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(breadcrumbList);

    // Append the script to the head of the document
    document.head.appendChild(script);
}


function deletePost(postID) {
    // Send get request to /new_post/delete/{post_id}
    // check data.status and either remove post div or display error message
    fetch("/new_post/delete/" + postID)
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                // Remove post div from page
                var postDiv = document.getElementById("Post-" + postID);
                postDiv.remove();
            } else {
                alert("Error deleting post:", data.message);
            }
        });
}