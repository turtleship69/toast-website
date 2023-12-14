// Add click event listener to each cross div
document.querySelectorAll('.cross').forEach((cross, index) => {
    cross.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevents the click event from propagating to the parent div
        removeImage(index + 1);

        if (document.querySelectorAll('.upload-preview img').length == 0) {
            document.getElementById('previews').style.display = 'none';
        }
    });

});

// Function to remove the image
function removeImage(index) {
    // Implement your logic to remove the image here
    post.images.splice(index - 1, 1);

    const previewDiv = document.getElementById(`preview-${index}`);
    previewDiv.classList.remove('has-image');

    const imgElement = previewDiv.querySelector('img');

    if (imgElement) {
        const siblings = Array.from(previewDiv.parentNode.children);
        const indexToRemove = siblings.indexOf(previewDiv);
        // console.log(siblings);

        imgElement.remove(); // Remove the img element

        // Shift images to the left
        let i = 1 
        for (i = indexToRemove + 1; i < siblings.length; i++) {
            // console.log("flab g")
            const siblingImg = siblings[i].querySelector('img');
            // console.log(i, siblingImg)
            siblings[i].classList.remove('has-image');
            if (siblingImg) {
                siblings[i - 1].appendChild(siblingImg.cloneNode(true));
                siblings[i-1].classList.add('has-image');
                siblingImg.remove()
                // siblings[i].innerHTML = ''; // Clear the current div
            } 
        }
    }
}
