document.addEventListener('DOMContentLoaded', function () {


    //id that is saved in sessionStorage(in script js) is read and saved in variable index
    const index = sessionStorage.getItem("imageIndex");
    console.log("Index:", index);


    //variable carouselElement looks for an id "imageCarousel" which is in gallery.html and saves all the information of it
    const carouselElement = document.getElementById('imageCarousel');


    // check if carouselElement exists - meaning the page with the carousel is loaded
    if (carouselElement) {
        
        // object carouselInstance of class Carousel (from bootstrap) 
        // yellow Carousel is a class and a constructor

        //this makes a new object from Carousel class by using carouselElement and makes a constructor that does not allow automatic sliding of pictures 
        const carouselInstance = new bootstrap.Carousel(carouselElement, {
            interval: false, // Prevents auto-sliding
        });

        carouselInstance.to(index); // Move to the stored index 
    }

    // CLOSE BUTTON FOR THE  GALLERY
    const closeButton = document.getElementById("closeButton");
    closeButton.addEventListener("click", function () {
        window.parent.loadMainContent("news1");
        });
});



