import { register } from "https://esm.run/@teamhanko/hanko-elements";
import { en } from "https://esm.run/@teamhanko/hanko-elements/i18n/en";

// en.texts.setupPasskey = "Sign in securely with your device - no passwords to" +
//     " remember. Passkeys are stored on your device for faster, safer access."

en.texts.setupPasskey = "Your credentials will be stored securely on your device for faster login next time."

var login_url = "/hanko/login"
const redirect_url = new URLSearchParams(window.location.search).get('redirect_url')
if (redirect_url) {
    login_url += "?redirect_url=" + redirect_url;
}

// Define an async function to use the await keyword
async function fetchData() {
    try {
        const { hanko } = await register(hanko_config.url, { translations: { en } });

        hanko.onAuthFlowCompleted(async () => {
            // successfully logged in, make a request to "/api/login"
            const response = await fetch(login_url);
            const data = await response.json();

            // check if the status in the returned JSON is "success"
            if (data.status === "success") {
                document.location.href = data.redirect_url
            }
        });
    } catch (error) {
        // Handle errors during the fetch process or other asynchronous operations
        console.error('Error:', error);
    }
}

// Call the async function
fetchData();
