import { register } from "https://esm.run/@teamhanko/hanko-elements";

var login_url = "/hanko/login" //servers_config.backend + 
const redirect_url = new URLSearchParams(window.location.search).get('redirect_url')
if (redirect_url) {
    login_url += "?redirect_url=" + redirect_url;
}

// Define the URL for the JSON file
// const configUrl = '/config/hanko.json';

// Define an async function to use the await keyword
async function fetchData() {
    try {
        /*// Use the fetch API to make a GET request
        const response = await fetch(configUrl);

        // Check if the request was successful (status code 200 OK)
        if (!response.ok) {
            throw new Error(`Failed to fetch ${configUrl}. Status: ${response.status}`);
        }

        // Parse the JSON response
        const configData = await response.json();
        const config = configData;
        console.log(config); */

        // Assuming 'register' is an async function that returns a promise
        const { hanko } = await register(hanko_config.url);

        hanko.onAuthFlowCompleted(async () => {
            // successfully logged in, make a request to "/api/login"
            const response = await fetch(login_url);
            const data = await response.json();
        
            // check if the status in the returned JSON is "success"
            if (data.status === "success") {
                // redirect to "/"
                // successfully logged in, redirect to a page in your application
                if (redirect_url) {
                    console.log(`redirect parameter: ${redirect_url}`)
                    document.location.href = redirect_url
                } else {
                    console.log(`redirect parameter: ${data.redirect_url}`)
                    document.location.href = data.redirect_url
                }
            }
        });
    } catch (error) {
        // Handle errors during the fetch process or other asynchronous operations
        console.error('Error:', error);
    }


}

// Call the async function
fetchData();
