// Fetch data based on the "p" parameter
const postId = new URLSearchParams(window.location.search).get('p')
var error = false

if (postId) {
    const apiUrl = `/get_posts/get_post/${postId}`;

    fetch(apiUrl)
        .then(response => {
            console.log(response.status)
            return response.json().then(data => {
                if (response.status === 401) {
                    error = true
                    if (data.errorCode === "loginRequired") {
                        // Redirect to the login page
                        login_redirect_url =
                            `/login/?redirect_url=/post/?p=${postId}`
                        window.location.href = login_redirect_url;
                    } else {
                        throw new Error(`Unauthorized: ${data.message}`);
                    }
                } else if (response.status != 200) {
                    error = true
                    console.error("Error fetching data:", data.message)
                    errorMessage = document.createElement("p")
                    errorMessage.innerText = data.message
                    document.getElementById("posts").appendChild(errorMessage)
                } else if (!response.ok) {
                    error = true
                    throw new Error(`Error: ${response.status}`);
                }
                return data;
            });
        })
        .then(data => {
            if (!error) {
                console.log(data);
                var postHTML = createPostHTML(data, true);
                var postContainer = document.getElementById("posts");
                postContainer.appendChild(postHTML);
            }
        })
} else {
    errorMessage = document.createElement("p")
    errorMessage.innerText = "No post ID provided"
    document.getElementById("posts").appendChild(errorMessage)
    console.error("Post ID not found in the URL");
}

