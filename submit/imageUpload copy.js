function uploadHandler(files) {
    // Check if there are already 5 images
    if (document.querySelectorAll('.upload-preview img').length >= 5) {
        alert('You can only upload up to 5 images.');
        return;
    }

    // Update styles for previews div
    document.getElementById('previews').style.display = 'flex';

    // Loop through the dropped files
    for (const file of files) {
        if (file.type.startsWith('image/')) {
            // Create a new image element
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);


            // Create a new preview div
            const previewDiv = document.querySelector('.upload-preview:not(.has-image)');
            if (previewDiv) {
                // Add image to the preview div
                previewDiv.appendChild(img);
                previewDiv.classList.add('has-image');
            }
        }
    }
}