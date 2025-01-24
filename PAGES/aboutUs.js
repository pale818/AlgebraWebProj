
// Listen for messages from the parent(index)
window.addEventListener("message", function (event) {
    
    //checks if the event is sent from my server, for security
    if (event.origin !== window.location.origin) return;

    //sectionID gets id from index of some section in AboutUs page
    const sectionId = event.data.sectionId;

    if (sectionId) {

        //sectionElement saves all info from the section with that id 
        const sectionElement = document.querySelector(sectionId);
        if (sectionElement) {

            // Scroll to the section
            sectionElement.scrollIntoView({ behavior: "smooth" });
        }
    }
});