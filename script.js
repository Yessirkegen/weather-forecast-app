// Variables
//ded0cce24fc86beb657d9194afdc5fe3
// Variables
// Variables
let isDarkMode = false;

// Elements
const toggleThemeBtn = document.getElementById('toggleTheme');
const body = document.body;
const homePage = document.getElementById('homePage');
const profilePage = document.getElementById('profilePage');
const loginPage = document.getElementById('loginPage');
const signUpPage = document.getElementById('signUpPage');
const loginLink = document.getElementById('loginLink');
const profileLink = document.getElementById('profileLink');
const homeLink = document.getElementById('homeLink');
const showSignUp = document.getElementById('showSignUp');
const showLogIn = document.getElementById('showLogIn');
const searchHistoryDiv = document.getElementById('searchHistory');

// Filter Elements
const tempRangeSelect = document.getElementById('tempRange');
const weatherConditionSelect = document.getElementById('weatherCondition');
const applyFiltersBtn = document.getElementById('applyFilters');

// Event Listeners
toggleThemeBtn.addEventListener('click', toggleTheme);
document.getElementById('searchForm').addEventListener('submit', getWeather);
document.getElementById('signUpForm').addEventListener('submit', signUp);
document.getElementById('loginForm').addEventListener('submit', logIn);
loginLink.addEventListener('click', showLoginPage);
profileLink.addEventListener('click', showProfilePage);
homeLink.addEventListener('click', showHomePage);
showSignUp.addEventListener('click', showSignUpPage);
showLogIn.addEventListener('click', showLoginPage);
applyFiltersBtn.addEventListener('click', applyFilters);

// Logout Button Event Listener
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', logOut);
}

// Toggle Theme Function
function toggleTheme() {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
        body.classList.add('dark-theme');
        toggleThemeBtn.textContent = 'Light Mode';
    } else {
        body.classList.remove('dark-theme');
        toggleThemeBtn.textContent = 'Dark Mode';
    }
}

// Show Pages
function showHomePage() {
    hideAllPages();
    homePage.classList.remove('hidden');
}

function showProfilePage() {
    if (localStorage.getItem('loggedIn') === 'true') {
        hideAllPages();
        profilePage.classList.remove('hidden');
        displayUserProfile();
    } else {
        alert('Please log in first.');
        showLoginPage();
    }
}

function showLoginPage() {
    hideAllPages();
    loginPage.classList.remove('hidden');
}

function showSignUpPage() {
    hideAllPages();
    signUpPage.classList.remove('hidden');
}

function hideAllPages() {
    homePage.classList.add('hidden');
    profilePage.classList.add('hidden');
    loginPage.classList.add('hidden');
    signUpPage.classList.add('hidden');
}

// User Authentication
function signUp(e) {
    e.preventDefault();
    const name = document.getElementById('signUpName').value.trim();
    const email = document.getElementById('signUpEmail').value.trim();
    const phone = document.getElementById('signUpPhone').value.trim();
    const password = document.getElementById('signUpPassword').value.trim();

    // Form Validation
    if (!validateEmail(email)) {
        alert('Please enter a valid email.');
        return;
    }
    if (!validatePhone(phone)) {
        alert('Please enter a valid phone number.');
        return;
    }
    if (!validatePassword(password)) {
        alert('Password must be at least 8 characters, including a number and a special character.');
        return;
    }

    const user = { name, email, phone, password };
    localStorage.setItem('user', JSON.stringify(user));
    alert('Sign up successful!');
    showLoginPage();
}

function logIn(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.email === email && user.password === password) {
        localStorage.setItem('loggedIn', 'true');
        alert('Login successful!');
        showProfilePage();
    } else {
        alert('Invalid email or password.');
    }
}

function logOut() {
    localStorage.removeItem('loggedIn');
    alert('Logged out successfully.');
    showHomePage();
}

function displayUserProfile() {
    const user = JSON.parse(localStorage.getItem('user'));
    document.getElementById('userNameDisplay').textContent = user.name;
    document.getElementById('userEmailDisplay').textContent = user.email;
}

// Form Validation Functions
function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^\d{10}$/;
    return re.test(phone);
}

function validatePassword(password) {
    const re = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    return re.test(password);
}

// Weather API Integration
function getWeather(e) {
    e.preventDefault();
    const city = document.getElementById('cityInput').value.trim();
    if (city === '') {
        alert('Please enter a city name.');
        return;
    }

    // Fetch Weather Data
    fetchWeatherData(city);
}

function fetchWeatherData(city) {
    const apiKey = 'ded0cce24fc86beb657d9194afdc5fe3'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
    )}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found.');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
            changeBackgroundVideo(data);
            saveSearchHistory(city, data);
        })
        .catch(error => {
            alert(error.message);
        });
}

// Display Weather Data
function displayWeather(data) {
    if (!data) {
        alert('No weather data available.');
        return;
    }
    const weatherDiv = document.getElementById('weatherResult');
    weatherDiv.innerHTML = `
        <h2>Weather in ${data.name}, ${data.sys.country}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
}

// Change Background Video Based on Weather
function changeBackgroundVideo(data) {
    if (!data) return;
    const video = document.getElementById('bgVideo');
    const weatherId = data.weather[0].id;
    const temp = data.main.temp;
    let videoSrc = '';

    // Determine video based on weather conditions and temperature
    if (weatherId >= 200 && weatherId < 600) {
        // Thunderstorm or Rain
        videoSrc = 'assets/rain.mp4';
    } else if (weatherId >= 600 && weatherId < 700) {
        // Snow or cold conditions
        videoSrc = 'assets/cold.mp4';
    } else if (weatherId >= 700 && weatherId < 800) {
        // Atmosphere conditions like fog, mist
        videoSrc = 'assets/cloudy.mp4';
    } else if (weatherId === 800) {
        // Clear sky
        if (temp >= 30) {
            videoSrc = 'assets/hot.mp4';
        } else if (temp >= 20 && temp < 30) {
            videoSrc = 'assets/warm.mp4';
        } else if (temp >= 10 && temp < 20) {
            videoSrc = 'assets/cloudy.mp4';
        } else {
            videoSrc = 'assets/cold.mp4';
        }
    } else if (weatherId > 800 && weatherId < 900) {
        // Cloudy
        videoSrc = 'assets/cloudy.mp4';
    } else {
        // Default to cloudy
        videoSrc = 'assets/cloudy.mp4';
    }

    // Change the video source
    video.src = videoSrc;
    video.load();
    video.play();
}

// Save Search History
function saveSearchHistory(city, data) {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // Remove existing entry for the same city to prevent duplicates
    searchHistory = searchHistory.filter(
        item => item.city && item.city.toLowerCase() !== city.toLowerCase()
    );

    // Add new entry to the beginning
    searchHistory.unshift({ city, data });

    // Keep only the last 5 searches
    if (searchHistory.length > 5) {
        searchHistory.pop();
    }

    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    displaySearchHistory(); // Display full history without filters after a new search
}

// Display Search History
function displaySearchHistory(filteredHistory = null) {
    const searchHistory = filteredHistory || JSON.parse(localStorage.getItem('searchHistory')) || [];
    searchHistoryDiv.innerHTML = '';

    searchHistory.forEach(item => {
        if (item && item.city) {
            const cityDiv = document.createElement('div');
            cityDiv.classList.add('history-item');
            cityDiv.textContent = item.city;
            cityDiv.addEventListener('click', () => {
                if (item.data) {
                    displayWeather(item.data);
                    changeBackgroundVideo(item.data);
                } else {
                    // If data is missing, fetch it from the API
                    fetchWeatherData(item.city);
                }
            });
            searchHistoryDiv.appendChild(cityDiv);
        }
    });
}

// Apply Filters to Search History
function applyFilters() {
    const tempRange = tempRangeSelect.value;
    const weatherCondition = weatherConditionSelect.value;

    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // Filter by temperature range
    if (tempRange) {
        searchHistory = searchHistory.filter(item => {
            if (item.data && item.data.main && item.data.main.temp !== undefined) {
                const temp = item.data.main.temp;
                switch (tempRange) {
                    case 'cold':
                        return temp < 10;
                    case 'cool':
                        return temp >= 10 && temp < 20;
                    case 'warm':
                        return temp >= 20 && temp < 30;
                    case 'hot':
                        return temp >= 30;
                    default:
                        return true;
                }
            } else {
                // Exclude items without temperature data
                return false;
            }
        });
    }

    // Filter by weather condition
    if (weatherCondition) {
        searchHistory = searchHistory.filter(item => {
            if (
                item.data &&
                item.data.weather &&
                item.data.weather[0] &&
                item.data.weather[0].main
            ) {
                const condition = item.data.weather[0].main;
                return condition.toLowerCase() === weatherCondition.toLowerCase();
            } else {
                // Exclude items without weather condition data
                return false;
            }
        });
    }

    displaySearchHistory(searchHistory);
}

// Load Last Searched City and Search History
window.addEventListener('load', () => {
    displaySearchHistory();

    if (localStorage.getItem('loggedIn') === 'true') {
        showProfilePage();
    } else {
        showHomePage();
    }
});
