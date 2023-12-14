// ==================== drag and drop ====================
// Function to handle the drop event
function dropHandler(event) {
    event.preventDefault();

    // Reset background color and message
    document.getElementById('drop-zone').style.backgroundColor = '';
    document.getElementById('image-label').innerText = 'Drag images here';

    uploadHandler(event.dataTransfer.files);
}

// Function to handle the drag over event
function dragOverHandler(event) {
    event.preventDefault();

    // Change background color and display message
    document.getElementById('drop-zone').style.backgroundColor = 'lightgray';
    document.getElementById('image-label').innerText = 'You can let go to upload';
}

// Function to handle the drag leave event
function dragLeaveHandler(event) {
    event.preventDefault();

    // Reset background color and message
    document.getElementById('drop-zone').style.backgroundColor = '';
    document.getElementById('image-label').innerText = 'Drag images here';
}

// Add event listeners for drag and drop interactions
document.getElementById('drop-zone').addEventListener('drop', dropHandler);
document.getElementById('drop-zone').addEventListener('dragover', dragOverHandler);
document.getElementById('drop-zone').addEventListener('dragleave', dragLeaveHandler);




// ==================== click ====================
// Function to handle the drop-zone click event
function openFileInput() {
    document.getElementById('image-upload').click();
}

// Function to handle traditional file selection
function handleFileSelect(event) {
    // Simulate a drop event with the selected files
    const dropEvent = event instanceof DragEvent ? event : { dataTransfer: { files: event.target.files } };
    uploadHandler(dropEvent.dataTransfer.files);
}

// Add click event listener to the drop-zone
document.getElementById('drop-zone').addEventListener('click', openFileInput);