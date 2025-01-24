// Handle the checkbox change to set true/false

function handleCheckbox(event) {
    // form looks for the contactForm in the HTML file
    const form = document.getElementById('contactForm');
    // newsletterCheckbox looks for the newsletter in the HTML file
    const newsletterCheckbox = document.getElementById('newsletter');

    // Create a hidden <input> element to hold the value of the checkbox
    const hiddenCheckboxInput = document.createElement('input');
    hiddenCheckboxInput.type = 'hidden';
    hiddenCheckboxInput.name = 'ReceiveNewsletter';

    // Set the value to "true" or "false" depending on whether the checkbox is checked
    if (newsletterCheckbox.checked) {
        hiddenCheckboxInput.value = 'true';
    } else {
        hiddenCheckboxInput.value = 'false';
    }



    //the value in hiddenCheckbocInout is saved, not the deafult one from html
    form.appendChild(hiddenCheckboxInput);

}