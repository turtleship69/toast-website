// Fetch data based on the "p" parameter
const postId = new URLSearchParams(window.location.search).get('p')

if (postId) {
    const apiUrl = `/get_posts/get_post/${postId}`;

    fetch(apiUrl)
        .then(response => {
            console.log(response.status)
            return response.json().then(data => {
                if (response.status === 401) {
                    if (data.errorCode === "loginRequired") {
                        // Redirect to the login page
                        login_redirect_url = `/login/?redirect_url=/post/?p=${new URLSearchParams(window.location.search).get('p')}`
                        window.location.href = login_redirect_url;
                    } else {
                        throw new Error(`Unauthorized: ${data.message}`);
                    }
                } else if (response.status != 200) {
                    console.error("Error fetching data:", data.message)
                    errorMessage = document.createElement("p")
                    errorMessage.innerText = data.message
                    document.getElementById("posts").appendChild(errorMessage)
                } else if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                return data;
            });
        })
        .then(data => {
            console.log(data);
            if (data.status === "success") {
                var postHTML = createPostHTML(data);
                var postContainer = document.getElementById("posts");
                postContainer.appendChild(postHTML); 
                // Append the generated post HTML to the body or any other desired element
            }
        })
} else {
    errorMessage = document.createElement("p")
    errorMessage.innerText = "No post ID provided"
    document.getElementById("posts").appendChild(errorMessage)
    console.error("Post ID not found in the URL");
}

