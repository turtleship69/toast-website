var post = { "privacy":0,"images": [] }

if (false) {
    window.onbeforeunload = confirmExit;
    function confirmExit() {
        return "You have attempted to leave this page. Are you sure?";
    }
}

document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault();
    submit();
})

function submit() {
    //disable the submit button
    document.getElementById("submit").disabled = true;

    // Create the post object
    const postData = new FormData();

    // Get contents of #title and #postBody and add them to the FormData
    postData.append('title', document.getElementById("title").value);
    postData.append('body', document.getElementById("postBody").value);
    postData.append('privacy', post.privacy);

    // Append images to FormData
    for (let i = 0; i < post.images.length; i++) {
        postData.append(`image${i+1}`, post.images[i]);
    }

    // Make a post request to /submit/post with the FormData
    fetch('/new_post/new', {
        method: 'POST',
        body: postData,
    })
        .then(response => response.json())
        .then(data => {
            console.log('Post submitted successfully:', data);
            

            post_url = `/post?p=${data.id}`;
            document.location.href = post_url;
        })
        .catch(error => {
            console.error('Error submitting post:', error);
        });
}
