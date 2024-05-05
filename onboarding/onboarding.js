const username = document.getElementById('username');
const bio = document.getElementById('bio');
const usernamePicker = document.getElementById('username-picker-outer');
const bioPicker = document.getElementById('bio-picker-outer');
const form = document.getElementById('form');
const good = document.getElementById("good")
const bad = document.getElementById("bad")
const cont_button = document.getElementById("continue")
cont_button.disabled = true;

const safe = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '_', '-', '.'
];

function filterString(str, list) {
    return str.split('').filter(char => list.includes(char)).join('');
}

function switchInputPrompt(event) {
    event.preventDefault();

    //check username isn't empty
    if (username.length === 0) {
        alert("Username cannot be empty");
        return;
    }

    // Slide out the username picker
    usernamePicker.classList.add('fade-out');

    // Set a timeout to hide the username picker and show the bio picker
    setTimeout(() => {
        usernamePicker.style.display = 'none';
        bioPicker.style.display = 'block';

        // Slide in the bio picker
        bioPicker.classList.add('fade-in');
    }, 500);

    //change event listener to submit()
    form.removeEventListener("submit", switchInputPrompt);
    form.addEventListener("submit", submit)
}

function submit(event) {
    event.preventDefault();

    const formData = new URLSearchParams();
    formData.append('username', username.value);
    formData.append('bio', bio.value);

    fetch('/hanko/onboarding', {
        method: 'POST',
        body: formData.toString(),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(response => {
        if (!response.ok) {
            throw new Error(response);
        }
        return response.json();
    })
        .then(data => {
            if (!data || data.status !== 'success') {
                alert(data.message);
            }
            else {
                window.location.href = data.redirect_url;
            }
        })
        .catch(error => {
            console.log(error.data)
            alert(error.message);
        });
    return false;
}

const taken = ["eee", "fff", "ggg"]


username.addEventListener("input", function () {
    username.value = filterString(username.value, safe)
    if (username.value == "") {
        good.style.display = "none"
        bad.style.display = "none"
        cont_button.disabled = true;
    }
    else if (taken.includes(username.value)) {
        good.style.display = "none"
        bad.style.display = "block"
        cont_button.disabled = true;
    } else {
        good.style.display = "block"
        bad.style.display = "none"
        cont_button.disabled = false;
    }
});

form.addEventListener("submit", switchInputPrompt)

function autoResize() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
}
bio.addEventListener('input', autoResize, false);