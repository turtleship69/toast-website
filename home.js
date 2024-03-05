//make a fetch request to /get_posts/home, run createPostHTML of each item in posts, and append the divs to #posts
var posts = document.getElementById('posts');
fetch('/get_posts/home')
.then(res => res.json())
.then(data => {
    data.posts.forEach(post => {
        posts.appendChild(createPostHTML(post));
    })
})
.catch(err => console.log(err));