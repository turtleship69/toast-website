const safe = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '_', '-', '.'
];

function flash(message) {
    alert(message)
}

function filterString(str, list) {
    return str.split('').filter(char => list.includes(char)).join('');
}

function submit(event) {
    event.preventDefault();

    const formData = new URLSearchParams();
    formData.append('username', document.getElementById('username').value);

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
                alert("signed up");
                window.location.href = data.redirect_url;
            }
        })
        .catch(error => {
            console.log(error.data)
            alert(error.message);
        });
    return false;
}

const taken = ["e", "f", "g"]


window.addEventListener("DOMContentLoaded", (event) => {
    good = document.getElementById("good")
    bad = document.getElementById("bad")
    cont_button = document.getElementById("continue")
    //when the contents of #username is edited, check if it's already taken
    input_box = document.getElementById("username")

    input_box.addEventListener("input", function () {
        input_box.value = filterString(input_box.value, safe)
        if (input_box.value == "") {
            good.style.display = "none"
            bad.style.display = "none"
            cont_button.disabled = true;
        }
        else if (taken.includes(input_box.value)) {
            good.style.display = "none"
            bad.style.display = "block"
            cont_button.disabled = true;
        } else {
            good.style.display = "block"
            bad.style.display = "none"
            cont_button.disabled = false;
        }
    });

    document.getElementById("form").addEventListener("submit", submit)
});
