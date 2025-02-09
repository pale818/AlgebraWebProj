
//listens for page loading, 
document.addEventListener('DOMContentLoaded', function () {


    getCurriculum();

    
    const courseInput = document.getElementById('courseInput');
    const courseDropdown = document.getElementById('courseDropdown');
    const selectedCoursesTable = document.getElementById('selectedCoursesTable').querySelector('tbody');

    // Filter courses as user types
    courseInput.addEventListener('input', () => {
        const courses = JSON.parse(sessionStorage.getItem('curriculum'));
        const query = courseInput.value.toLowerCase();
        const prioritizedCourses = []; // To hold courses starting with the query
        const otherCourses = []; 

        courses.forEach(course => {
            if (course.course.toLowerCase().startsWith(query)) {
                prioritizedCourses.push(course); // Matches at the beginning
            } else if (course.course.toLowerCase().includes(query)) {
                otherCourses.push(course);      // Matches elsewhere
            }
        });
    

        const filteredCourses = [...prioritizedCourses, ...otherCourses];

        // Clear dropdown and display filtered results
        courseDropdown.innerHTML = '';
        if (query) {
            courseDropdown.style.display = 'block';
            filteredCourses.forEach(course => {
                const li = document.createElement('li');
                li.textContent = course.course;
                li.dataset.id = course.id;
                li.addEventListener('click', () => selectCourse(course));
                courseDropdown.appendChild(li);
            });
        } else {
            courseDropdown.style.display = 'none';
        }
    });

});



function getCurriculum(event) {
    
    //reads user name and token from sessionStorage from browser
    const userName = sessionStorage.getItem('username'); 
    const token = sessionStorage.getItem('jwtToken');

    //if user is not logged in
    if(userName === null){
        return;
    }

    //user is logged in
    //fetch the provided list of curriculums and save them in json format in session storage
    fetch("https://www.fulek.com/data/api/supit/curriculum-list/en", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.isSuccess && data.statusCode === 200) {

                //if api request works the whole list is saved in sessionStorage
                sessionStorage.setItem('curriculum', JSON.stringify(data.data));

            } else {
                // Set failure message if request doesnt work,route exists
                const curriculumAlert = document.getElementById("curriculumAlert");
                curriculumAlert.className = "alert alert-danger";
                curriculumAlert.innerHTML = data.errorMessages[0];
                curriculumAlert.style.display = "block";
            }
        })
        .catch(error => {
            //if the route does not exist
            console.error("Error:", error);
            const curriculumAlert = document.getElementById("curriculumAlert");
            curriculumAlert.className = "alert alert-danger";
            curriculumAlert.innerHTML = "An error occurred. Please try again.";
            curriculumAlert.style.display = "block";
            console.error("Error:", error);
        });
}




// Add selected course to the table
function selectCourse(course) {
    // Check if the course is already in the table
    if ([...selectedCoursesTable.querySelectorAll('tr')].some(row => row.dataset.id == course.id)) {
        alert('Course already added.');
        return;
    }

    // Create a new row
    const row = document.createElement('tr');
    row.dataset.id = course.id;
    row.innerHTML = `
        <td>${course.id}</td>
        <td>${course.course}</td>
        <td>${course.ects}</td>
        <td>${course.hours}</td>
        <td>${course.semester}</td>
        <td><button onclick="removeCourse(this)">Remove</button></td>
    `;
    selectedCoursesTable.appendChild(row);

    // Clear dropdown and input when curriculum is added to table
    courseDropdown.style.display = 'none';
    courseInput.value = '';
}

// Remove course from the table
function removeCourse(button) {
    const row = button.parentElement.parentElement;
    selectedCoursesTable.removeChild(row);
}
