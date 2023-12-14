// Add click event listener to each preview div
document.querySelectorAll('.upload-preview').forEach((preview, index) => {
    preview.addEventListener('click', (event) => {
        // event.stopPropagation(); // Prevents the click event from propagating to the parent div
        openExpandedView(index + 1, event);
    });
});

// Function to open an expanded view of the image
function openExpandedView(index, event) {
    const previewDiv = document.getElementById(`preview-${index}`);
    const imgElement = previewDiv.querySelector('img');

    if (imgElement) {
        event.stopPropagation(); // Prevents the click event from propagating to the parent div
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.className = 'overlay';

        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        // Create close button (x)
        const closeButton = document.createElement('span');
        closeButton.className = 'close-button';
        closeButton.innerHTML = '&#10006;'; // '✖'

        // Append the image to the modal content
        modalContent.appendChild(imgElement.cloneNode(true));

        // Append the close button to the modal content
        modalContent.appendChild(closeButton);

        // Append the modal content to the overlay
        overlay.appendChild(modalContent);

        // Append the overlay to the body
        document.body.appendChild(overlay);

        // Add event listeners to close the modal
        overlay.addEventListener('click', closeModal);
        closeButton.addEventListener('click', closeModal);

        // Prevent the click event from reaching the drop-zone
        // overlay.addEventListener('click', stopPropagation);
    }
}

// Function to prevent event propagation
// function stopPropagation(event) {
//     event.stopPropagation();
// }


// Function to close the modal
function closeModal(event) {
    const overlay = document.querySelector('.overlay');

    if (overlay && (event.target === overlay || event.target.classList.contains('close-button'))) {
        overlay.remove();
    }
}