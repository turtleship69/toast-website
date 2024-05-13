//add an event listener to #search-bar
//when the contents is edited, create a setTimeout of 100ms
//is it is edited before the previous timer ends, cancel it and make a new one
//the timeout should call a function to make a request to /friendships/search/{input}
//after the request is made, for each item in the returned list of json a div should be make with a pfp on the left, username on top and bio on the bottom
//clicking on the div should open the page /user?u={username}

const search_bar = document.getElementById("search-bar");
const search_results = document.getElementById("search-results");

var results = {}

search_bar.addEventListener("input", function (event) {
    clearTimeout(this.timer);
    this.timer = setTimeout(async function () {
        const input = event.target.value;
        if (input === "") {
            //make the search_results invisible
            search_results.classList.add("hidden");
            return;
        }
        let result = await search(input)
        search_results.classList.remove("hidden");
        search_results.innerHTML = "";
        console.log(result);
        if (result.users.length === 0) {
            const p = document.createElement("p");
            p.innerHTML = "No results found";
            search_results.appendChild(p);
            return;
        }
        for (const item of result.users) {
            const div = document.createElement("div");
            div.classList.add("search-result");

            item.pfp = item.pfp ? item.pfp : "/placeholder/pfp.png";

            const pfp = document.createElement("img");
            pfp.src = item.pfp;
            pfp.classList.add("search-result-pfp");

            const details = document.createElement("div");

            const username = document.createElement("p");
            username.classList.add("search-result", "username");
            username.innerHTML = item.username;
            username.style.fontWeight = "bold";

            const bio = document.createElement("p");
            bio.classList.add("search-result", "bio");
            bio.innerHTML = item.bio;

            details.appendChild(username);
            details.appendChild(bio);

            div.appendChild(pfp);
            div.appendChild(details);

            const a = document.createElement("a");
            a.href = `/user?u=${item.username}`;
            a.classList.add("search-result-link");
            a.appendChild(div);
            search_results.appendChild(a);
        }
    }, 300)
})

async function search(username) {
    // Check if the username is already in the results
    // If so, return it; otherwise, fetch it
    if (results[username]) {
        return results[username];
    } else {
        try {
            const response = await fetch(`/friendships/search/${username}`);
            const data = await response.json();
            console.log(data);
            results[username] = data;
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; // Rethrow the error for handling elsewhere if needed
        }
    }
}