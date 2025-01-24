// Handle login form submission
function handleLogin(event) {
    event.preventDefault(); // Prevent default form submission behavior
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;


    if(username == "" || password == ""){

        const loginAlert = document.getElementById("loginAlert");
        loginAlert.className = "alert alert-danger";
        loginAlert.innerHTML = "Login unsuccessful!";
        loginAlert.style.display = "block";
        return;
    }

    fetch("https://www.fulek.com/data/api/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.isSuccess && data.statusCode === 200) {

                // Store the token in sessionStorage
                sessionStorage.setItem('jwtToken', data.data.token);

                // You can also store other information like username if needed
                sessionStorage.setItem('username', data.data.username);

              
                // Set success message
                const loginAlert = document.getElementById("loginAlert");
                loginAlert.className = "alert alert-success";
                loginAlert.innerHTML = "Login successful!";
                loginAlert.style.display = "block";

                //if user is logged in a message is sent and curriculum page is activated
                const channel = new BroadcastChannel("activeUser");
                channel.postMessage({action: "login", user : data.data.username});


            } else {
                
                // Set failure message
                const loginAlert = document.getElementById("loginAlert");
                loginAlert.className = "alert alert-danger";
                loginAlert.innerHTML = data.errorMessages[0];
                loginAlert.style.display = "block";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            const loginAlert = document.getElementById("loginAlert");
            loginAlert.className = "alert alert-danger";
            loginAlert.innerHTML = "An error occurred. Please try again.";
            loginAlert.style.display = "block";
            console.error("Error:", error);
        });
}





// Handle register form submission
function handleRegister(event) {
    event.preventDefault(); // Prevent default form submission behavior
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;


    
    if(username == "" || password == ""){

        const loginAlert = document.getElementById("loginAlert");
        loginAlert.className = "alert alert-danger";
        loginAlert.innerHTML = "Login unsuccessful!";
        loginAlert.style.display = "block";
        return;
    }

    fetch ("https://www.fulek.com/data/api/user/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(response => response.json())
        .then(data => {

            const loginAlert = document.getElementById("loginAlert");

            if (data.isSuccess) {  

                //alert("Registration successful!");
                loginAlert.className = "alert alert-success";
                loginAlert.innerHTML = "Registration successful!";
                loginAlert.style.display = "block";

                const channel = new BroadcastChannel("activeUser");
                channel.postMessage({action: "register", user :""});

    

            } else {
                //alert("Registration failed. Please check your details.");
                loginAlert.className = "alert alert-danger";
                loginAlert.innerHTML = data.errorMessages[0];
                loginAlert.style.display = "block";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            const loginAlert = document.getElementById("loginAlert");
            loginAlert.className = "alert alert-danger";
            loginAlert.innerHTML = "An error occurred. Please try again.";
            loginAlert.style.display = "block";
            console.error("Error:", error);
        });
}


