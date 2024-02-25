// Fetch data based on the "p" parameter
const postId = new URLSearchParams(window.location.search).get('p')

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
            } else if (response.status === 400 || response.status === 404) {
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
    errorMessage = document.createElement("p")
    errorMessage.innerText = "No post ID provided"
    document.getElementById("posts").appendChild(errorMessage)
    console.error("Post ID not found in the URL");
}

