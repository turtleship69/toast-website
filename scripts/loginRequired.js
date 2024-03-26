//check if user is logged in, if not redirect to login page with redirect_url as current url
fetch('/hanko/check')
    .then(response => {
        if (response.status === 200) {
            // User is logged in
            return response.json();
        } else if (response.status === 401) {
            // User is not logged in
            return response.json();
        } else {
            throw new Error('Unexpected response from server');
        }
    })
    .then(data => {
        if (data.status != 'success') {
            // Session is not valid or unauthorized
            if (data.redirect_url) {
                // Redirect to the provided URL if available
                window.location.href = data.redirect_url;
            } else {
                // Redirect to /login
                window.location.href = '/login';
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle error accordingly
    });