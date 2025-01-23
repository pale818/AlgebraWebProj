/*****************************************************************************************************/ 
/* MODAL DIALOG */
/*****************************************************************************************************/ 
// Function to dynamically load content into the modal based on what the user clicked
function loadModalContent(menu) {
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBodyContent');

  if (menu === 'contact') {
      modalTitle.textContent = 'Contact Us';
      modalBody.innerHTML = '<iframe src="PAGES/contact.html" style="border:none;"></iframe>';
  } else if (menu === 'login') {
      modalTitle.textContent = '';
      modalBody.innerHTML = '<iframe src="PAGES/login.html" width="100%" height="300px" style="border:none;"></iframe>';
  } else {
    modalTitle.textContent = 'Under Construction';
    modalBody.innerHTML = '<iframe src="PAGES/underConstruction.html" width="100%" height="500px" style="border:none;"></iframe>';
}

  // Open the modal
  const modal = new bootstrap.Modal(document.getElementById('unifiedModal'));
  modal.show();
}
/*****************************************************************************************************/ 



/*****************************************************************************************************/ 
/* NAVIGATION AND DYNAMIC PAGE LOADING */
/*****************************************************************************************************/ 

// functions responsible for handling navigation, dinamically loading pages in the MainContent
function navigateTo(pageName, imageIndex = null) {
  sessionStorage.setItem("imageIndex", imageIndex);
  // Call loadPageContent in the parent context
  if (window.parent && typeof window.parent.loadMainContent === "function") {
    window.parent.loadMainContent(pageName);
  } else {
    console.error("Parent context or loadPageContent function not available.");
  }
}

// this fuction is know ONLY in index.html, and it's purpose is to load
// contend (web page) on the place of MainContent
function loadMainContent(menu) {
  console.log(menu);
  const video = document.getElementById("DefaultVideo");
  //pages is type dictionary
  const pages = {
    login: "PAGES/login.html",
    register: "PAGES/register.html",
    aboutUs: "PAGES/aboutUs.html",
    news: "PAGES/news.html",
    gallery: "PAGES/gallery.html",
    news1: "PAGES/news1.html",
    curriculum : "PAGES/curriculum.html",
  };
  const filePath = pages[menu]; //menu = key, pages finds value for that  key which loads into filepath
  if (!filePath){
    console.error("Page not found");
    return ;
  }  

  // default manu is main
  setNeweMenus('main');

  //hiding video
  if(video) {
    video.style.display = "none";
  }
  
  // set menu for new page
  setNeweMenus(menu);

  /*an element that allows you to embed another HTML document within the current document. 
  It acts as a window to display content from another source, such as another webpage, a video, or interactive widgets.*/
  const iframe = document.createElement("iframe"); //creating iframe
  iframe.src = filePath;  //iframe now contains a web page whose path is in filePath variable
  const mainContent = document.getElementById("MainContent");  //document = index.html, find tag with that id and links the tag to variable mainContent
  mainContent.style.display = "block";
  console.log(mainContent);
  mainContent.innerHTML = "";
  mainContent.appendChild(iframe);

}
/*****************************************************************************************************/ 



/*****************************************************************************************************/ 
/* COLLAPSE MENU PROGRAMMATICALLY FOR MOBILE SCREEN ONCE WHEN SOME MENU IS SELECTED */
/*****************************************************************************************************/ 
// listener for navigation bar when small mobile screen is active to collapse nav bar when some link is selected
// source: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
// https://getbootstrap.com/docs/5.3/components/collapse/#javascript-behavior
// https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
document.addEventListener('DOMContentLoaded', function () {
  const user = sessionStorage.getItem("username");
  userLogedIn(user);

  const channel = new BroadcastChannel("activeUser");
  channel.addEventListener("message",function (event){
    console.log("Received event:", event.data);

    if(event.data.action === "login"){
      userLogedIn(event.data.user);
    }
  })


  /* part for dropdown menu for the user menu */
  const userNameDisplay = document.getElementById("userNameDisplay");
  const logoffButton = document.getElementById("logoffButton");
  const userMenu = document.getElementById("userMenu");
  // Get username from sessionStorage
  const userName = sessionStorage.getItem("username");
  console.log("userName:", userName);

  if (userName) {
    if (userNameDisplay) {
      userNameDisplay.textContent = `Welcome, ${userName}!`;
    }
  } else {
    // Hide user menu if not logged in
    if (userMenu) {
      userMenu.style.display = "none";
    }
  }
  if (logoffButton) {
    logoffButton.addEventListener("click", function () {
      sessionStorage.clear(); // Remove all session storage data
      if (userNameDisplay) {
        userNameDisplay.textContent = userName;
      }
      setTimeout(() => {
        // Reload main page
        window.parent.location.reload();
      }, 1000);
    });
  }

  /**
   * This selects the .navbar-collapse element, which is the collapsible 
   * container of the navigation menu in Bootstrap. It toggles open and
   * closed on mobile devices when the hamburger icon is clicked.
   */
  const navbar = document.querySelector('.navbar-collapse');

  /**
   * This selects all elements with the .nav-link class. These are 
   * the individual menu items (e.g., “Login/Register,” “Contact”).
   * Together, these provide access to the navbar and its links.
   */
  const navLinks = document.querySelectorAll('.nav-link');

  // Add Click Listeners to Each Link
  navLinks.forEach(link => {
      link.addEventListener('click', function () {
          // Check if the navbar is open
          if (navbar.classList.contains('show')) {
              // Collapse the navbar
              // Programmatically closes (collapses) the navbar
              const bsCollapse = new bootstrap.Collapse(navbar, {
                  toggle: false,
              });
              bsCollapse.hide();
          }
      });
  });
});

/*****************************************************************************************************/ 


/*FOR HIDING CURRICULUM WHEN NOT LOGED IN*/
function userLogedIn(user){
  console.log("user =", user);
  const userloggedFirstTime = sessionStorage.getItem("userLoggedFirstTime");

  const curriculumMenu = document.getElementById("curriculumMenu");
  const loginMenu = document.getElementById("loginMenu");
  const userMenu = document.getElementById("userMenu");

  console.log(curriculumMenu);
  console.log(loginMenu);
  console.log(userMenu);

  if (!curriculumMenu && !loginMenu && !userMenu) {
    return;
  }

  if(user){
    curriculumMenu.classList.remove("d-none");
    curriculumMenu.classList.add("d-flex");

    loginMenu.classList.remove("d-flex");
    loginMenu.classList.add("d-none");

    userMenu.classList.remove("d-none");
    userMenu.classList.add("d-flex");

    if ( !userloggedFirstTime) {
      setTimeout(() => {
        // Reload main page
        sessionStorage.setItem("userLoggedFirstTime", true);
        window.parent.location.reload();
      }, 1000);
    }

  }else{
    curriculumMenu.classList.add("d-none");
    curriculumMenu.classList.remove("d-flex");
  
    loginMenu.classList.remove("d-none");
    loginMenu.classList.add("d-flex");

    userMenu.classList.remove("d-flex");
    userMenu.classList.add("d-none");
  }

}



/*****************************************************************************************************/ 
/* NAVIGATE TO SECTION ON THE PAGE */
/*****************************************************************************************************/ 
// function used to navigate to some section on the page
// example is aboutus page which has sections
// When user clicks on some manu like "history" it starts form the index.html 
// which calls this function and sends sectionId to the aboutus.html
// aboutus.html has it's script which listens for the message and then scrolls to the sections
function navigateToSection(sectionId) {

  // Find the iframe
  const iframe = document.querySelector("#MainContent iframe");
  if (iframe && iframe.contentWindow) {
      // Send a message to the iframe
      console.log("Sending message to iframe:", sectionId);
      // it sends message with two data
      // first is sectionId (some section of the page)
      // second is origin for security reasons just to know that it is same page
      iframe.contentWindow.postMessage({ sectionId }, window.location.origin);
  } else {
      console.error("Iframe not found or not loaded yet.");
  }
}

// togle main manu and othe rmanues
function setNeweMenus(menu) {
  const mainMenu = document.getElementById("mainMenu");
  const aboutUsMenu = document.getElementById("aboutUsMenu");
  const galleryMenu = document.getElementById("galleryMenu");

  mainMenu.classList.remove("d-none");
  mainMenu.classList.add("d-flex");

  aboutUsMenu.classList.remove("d-flex");
  aboutUsMenu.classList.add("d-none");

  galleryMenu.classList.remove("d-flex");
  galleryMenu.classList.add("d-none");

  

  if (menu === 'aboutUs') {
      aboutUsMenu.classList.remove("d-none");
      aboutUsMenu.classList.add("d-flex");
  } else if (menu === 'gallery'){
    galleryMenu.classList.remove("d-none");
    galleryMenu.classList.add("d-flex");
  } else  {
    return; 
  } 

  mainMenu.classList.remove("d-flex");
  mainMenu.classList.add("d-none");
}
/*****************************************************************************************************/ 
