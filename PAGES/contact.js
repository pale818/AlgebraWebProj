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

    // Append the hidden input to the form before submission
    /*
    In HTML forms, when two inputs share the same name attribute, the last one in the 
    DOM (Document Object Model) order usually overrides the others during form submission. 

    So in HTML there is
    <input type="checkbox" id="newsletter" name="ReceiveNewsletter" value="true"> Subscribe to newsletter
    with the same name ReceiveNewsletter like hiddenCheckboxInput but since hiddenCheckboxInput is the last 
    one, it will be send in the POST method
    */
    form.appendChild(hiddenCheckboxInput);

    // Allow the form to be submitted
}