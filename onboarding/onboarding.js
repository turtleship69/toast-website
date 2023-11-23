const taken = ["e", "f", "g"]


window.addEventListener("DOMContentLoaded", (event) => {
    good = document.getElementById("good")
    bad = document.getElementById("bad")
    cont_button = document.getElementById("continue")
    //when the contents of #username is edited, check if it's already taken
    input_box = document.getElementById("username")
    input_box.addEventListener("input", function () {
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

    function flash(message) {
        alert(message)
    }
    
    cont_button.addEventListener('click', function(){
        flash("Welcome " + input_box.value)
    });
});

