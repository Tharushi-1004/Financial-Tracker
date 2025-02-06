document.addEventListener("DOMContentLoaded", function () {
    // Add an event listener to the edit icon if it exists
    var editIcon = document.querySelector('.edit');
    if (editIcon) {
        editIcon.addEventListener('click', function () {
            // Toggle the contenteditable attribute on the profile fields
            toggleContentEditable();
        });
    } else {
        console.error('Edit icon not found');
    }

    // Function to toggle contenteditable attribute
    function toggleContentEditable() {
        var editableFields = document.querySelectorAll('[contenteditable]');
        if (editableFields) {
            editableFields.forEach(function (field) {
                if (field.contentEditable === 'true') {
                    field.contentEditable = 'false';
                } else {
                    field.contentEditable = 'true';
                }
            });
        } else {
            console.error('No editable fields found');
        }
    }
});
