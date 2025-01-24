/*****************************************************************************************************/ 
/* MODAL DIALOG */
/*****************************************************************************************************/ 
// Function to dynamically load Contact content into the modal
function loadModalContent(menu) {
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBodyContent');

  if (menu === 'contact') {
      modalTitle.textContent = 'Contact Us';
      modalBody.innerHTML = '<iframe src="PAGES/contact.html" style="border:none;"></iframe>';
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

  //checks if that really is a function
  if (window.parent && typeof window.parent.loadMainContent === "function") {
    window.parent.loadMainContent(pageName);
  } else {
    console.error("Parent context or loadPageContent function not available.");
  }
}

// this fuction is know ONLY in index.html, and it's purpose is to load
// contend (web page) on the place of MainContent
function loadMainContent(menu) {
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
  const filePath = pages[menu]; //key-vallue to search the path to the page
  if (!filePath){
    console.error("Page not found");
    return ;
  }  

  //hiding default video when opening some page
  if(video) {
    video.style.display = "none";
  }
  
  // set menu for new page(for AboutUs page)
  setMenus(menu);

  /*an element that allows you to embed another HTML document within the current document. 
  It acts as a window to display content from another source, such as another webpage, a video, or interactive widgets.*/
  const iframe = document.createElement("iframe"); //creating iframe
  iframe.src = filePath;  //iframe now contains a web page whose path is in filePath variable
  const mainContent = document.getElementById("MainContent");  // find tag with that id and links the tag to variable mainContent
  mainContent.style.display = "block"; //displays the page content
  mainContent.innerHTML = "";  //deletes what was loaded before so a new page can load
  mainContent.appendChild(iframe); //page content is finally added to mainContent div from index

}
/*****************************************************************************************************/ 



/*****************************************************************************************************/ 
/* COLLAPSE MENU PROGRAMMATICALLY FOR MOBILE SCREEN ONCE WHEN SOME MENU IS SELECTED */
/*****************************************************************************************************/ 
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


  //logOff button, deletes sessionStorage and reloads main page
  const logoffButton = document.getElementById("logoffButton");
  if (logoffButton) {
    logoffButton.addEventListener("click", function () {
      sessionStorage.clear(); 
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


  /*This selects all elements with the .nav-link class and listen/waits for every menu*/
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
/*************************************************************************************************** */
function userLogedIn(user){
  console.log("user =", user);
  const userloggedFirstTime = sessionStorage.getItem("userLoggedFirstTime");

  const curriculumMenu = document.getElementById("curriculumMenu");
  const loginMenu = document.getElementById("loginMenu");
  const userMenu = document.getElementById("userMenu"); //logOffmenu

  
  if (!curriculumMenu && !loginMenu && !userMenu) {
    return;
  }

  if(user){
    //curriculum is added
    curriculumMenu.classList.remove("d-none");
    curriculumMenu.classList.add("d-flex");

    //login is removed
    loginMenu.classList.remove("d-flex");
    loginMenu.classList.add("d-none");

    //logOff is added
    userMenu.classList.remove("d-none");
    userMenu.classList.add("d-flex");

    //when user is loged in for first time page reloads to main page
    if ( !userloggedFirstTime) {
      setTimeout(() => {
        // Reload main page
        sessionStorage.setItem("userLoggedFirstTime", true);
        window.parent.location.reload();
      }, 1000);
    }

  }else{
    //curriculum is removed
    curriculumMenu.classList.add("d-none");
    curriculumMenu.classList.remove("d-flex");
  
    //login is added
    loginMenu.classList.remove("d-none");
    loginMenu.classList.add("d-flex");

    //logOff is removed
    userMenu.classList.remove("d-flex");
    userMenu.classList.add("d-none");
  }

}



/*****************************************************************************************************/ 
/* NAVIGATE TO SECTION ON THE PAGE (ABOUT US) */
/*****************************************************************************************************/ 
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
function setMenus(menu) {

  const mainMenu = document.getElementById("mainMenu");
  const aboutUsMenu = document.getElementById("aboutUsMenu");
  const navBar = document.getElementById("navigationBar");   
  const mainContent = document.querySelector("#MainContent");

//DEFAULT

  //main menu is added
  mainMenu.classList.remove("d-none");
  mainMenu.classList.add("d-flex");

  //about menu is hidden
  aboutUsMenu.classList.remove("d-flex");
  aboutUsMenu.classList.add("d-none");

  if(navBar){
    navBar.style.display = "block";
    mainContent.style.paddingTop = '75px';

  }


  //ABOUT US
  if (menu === 'aboutUs') {
    //about menu is added
      aboutUsMenu.classList.remove("d-none");
      aboutUsMenu.classList.add("d-flex");
  } else if (menu === 'gallery'){

    //remove navBar
    if(navBar){
      navBar.style.display = "none";
      mainContent.style.paddingTop = '0px';
    }

  } else  {
    return; 
  } 


  mainMenu.classList.remove("d-flex");
  mainMenu.classList.add("d-none");
}
/*****************************************************************************************************/ 

