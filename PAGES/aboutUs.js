
 /**
  * Docs:
  * https://developer.mozilla.org/en-US/docs/Web/API/Window/message_event?utm_source=chatgpt.com
  * https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
  * 
  */
// Listen for messages from the parent
window.addEventListener("message", function (event) {
    console.log("aboutus addEventListener:",event);
    // Ensure the message is from a trusted source
    // 
    if (event.origin !== window.location.origin) return;

    const sectionId = event.data.sectionId;
    if (sectionId) {
        const sectionElement = document.querySelector(sectionId);
        if (sectionElement) {
            // Scroll to the section
            sectionElement.scrollIntoView({ behavior: "smooth" });
        }
    }
});