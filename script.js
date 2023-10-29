// You can use JavaScript to add interactivity and functionality to your website.

// JavaScript for location tracking

const getLocationButton = document.getElementById('getLocation');
const coordinates = document.getElementById('coordinates');

// Check if the browser supports geolocation
if ("geolocation" in navigator) {
    getLocationButton.addEventListener('click', () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            coordinates.innerHTML = `Your current coordinates: Latitude - ${latitude}, Longitude - ${longitude}`;
        }, (error) => {
            coordinates.innerHTML = "Location not available. Please check your browser settings.";
        });
    });
} else {
    getLocationButton.style.display = 'none';
    coordinates.innerHTML = "Geolocation is not supported by your browser.";
}

// JavaScript for sharing or copying location

document.getElementById('share-location').addEventListener('click', shareLocation);
document.getElementById('copy-location').addEventListener('click', copyLocation);

function shareLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const coordinates = `Latitude: ${latitude}, Longitude: ${longitude}`;
            displayLocation(coordinates);
        }, function(error) {
            displayLocation("Error: Location not available.");
        });
    } else {
        displayLocation("Geolocation is not supported by your browser.");
    }
}

function copyLocation() {
    const coordinates = document.getElementById('location-coordinates').textContent;
    const textArea = document.createElement('textarea');
    textArea.value = coordinates;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('Location copied to clipboard: ' + coordinates);
}

function displayLocation(location) {
    const locationParagraph = document.getElementById('location-coordinates');
    locationParagraph.textContent = location;
}

// Example: Smooth scrolling for navigation links

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// JavaScript for contacting loved ones and saving phone numbers

document.getElementById('message-loved-one').addEventListener('click', sendMessage);
document.getElementById('call-loved-one').addEventListener('click', callLovedOne);
document.getElementById('save-number').addEventListener('click', savePhoneNumber);

// Load saved phone numbers from local storage when the page loads
window.addEventListener('load', loadSavedPhoneNumbers);

function sendMessage() {
    const phone = document.getElementById('phone').value;
    // Implement your logic to send a message to the provided phone number (e.g., via SMS API).
    alert(`Message sent to ${phone}`);
}

function callLovedOne() {
    const phone = document.getElementById('phone').value;
    // Implement your logic to make a call to the provided phone number (e.g., via a phone calling API).
    alert(`Calling ${phone}`);
}

function savePhoneNumber() {
    const phone = document.getElementById('phone').value;
    const name = document.getElementById('name').value;
    
    if (phone && name) {
        // Save the phone number and name to local storage
        const savedNumbers = getSavedNumbers();
        savedNumbers.push({ name, phone });
        saveNumbersToLocalStorage(savedNumbers);

        // Clear the input fields
        document.getElementById('name').value = '';
        document.getElementById('phone').value = '';

        // Reload the saved numbers list
        loadSavedPhoneNumbers();
    } else {
        alert('Please enter both a name and a phone number.');
    }
}

function getSavedNumbers() {
    const savedNumbers = localStorage.getItem('savedNumbers');
    return savedNumbers ? JSON.parse(savedNumbers) : [];
}

function saveNumbersToLocalStorage(numbers) {
    localStorage.setItem('savedNumbers', JSON.stringify(numbers));
}

function loadSavedPhoneNumbers() {
    const phoneList = document.getElementById('phone-list');
    phoneList.innerHTML = '';

    const savedNumbers = getSavedNumbers();
    savedNumbers.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = `${entry.name}: ${entry.phone}`;
        phoneList.appendChild(listItem);
    });
}
