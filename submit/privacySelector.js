/*=============== default to onlyFriends ===============*/
setTimeout(() => {
    document.getElementById('onlyFriends').click();
},50)

/*=============== buttons ===============*/
let lastClickedButton = null;

function handleButtonClick(button, event) {
    event.preventDefault();

    const buttons = Array.from(document.querySelectorAll('.privacy-selector'));
    post.privacy = buttons.indexOf(button);

    if (lastClickedButton === button) {
        // If the same button is clicked again, unselect it
        button.classList.remove('clicked');
        lastClickedButton = null;
    } else {
        // Otherwise, select the clicked button
        if (lastClickedButton) {
            lastClickedButton.classList.remove('clicked');
        }

        button.classList.add('clicked');
        lastClickedButton = button;
    }
}