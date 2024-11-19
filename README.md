WeatherNow - Weather Forecast Application
Table of Contents

    Introduction
    Features
    Technologies Used
    Getting Started
        Prerequisites
        Installation
        API Key Setup
    Usage
    Deployment
        Deploying to GitHub Pages
    File Structure
    Known Issues
    License
    Acknowledgments

Introduction

WeatherNow is a responsive web application that provides real-time weather forecasts for cities worldwide. The application features dynamic background videos that change according to the current weather conditions and temperature. Users can search for cities, view their search history, apply filters, and manage their profiles.
Features

    Responsive Design: Optimized for desktop, tablet, and mobile devices using Bootstrap.
    Dynamic Background Videos: Background changes based on weather conditions (e.g., rain, snow, sunny).
    User Authentication:
        Sign Up and Log In functionalities.
        Profile page displaying user details.
    Search and Filtration:
        Search for weather information by city name.
        Search history stored in local storage.
        Filter search history by temperature range and weather condition.
    Form Validation:
        Validation for email format, phone number, password strength, and required fields.
    Light and Dark Modes: Toggle between light and dark themes.
    Animated Button Effects: Enhanced user interaction with animated button effects.
    External API Integration: Fetches real-time weather data using the OpenWeatherMap API.

Technologies Used

    HTML5
    CSS3
    JavaScript (ES6)
    Bootstrap 4
    OpenWeatherMap API
    Font Awesome
    Google Fonts

Getting Started
Prerequisites

    A modern web browser (Chrome, Firefox, Edge, Safari)
    Internet connection
    Git installed (optional, for cloning the repository)

Installation

    Clone the Repository (Optional)

git clone https://github.com/your-username/weather-forecast-app.git

Alternatively, you can download the ZIP file from GitHub and extract it.

Navigate to the Project Directory

    cd weather-forecast-app

    Set Up the Assets

    Ensure that the assets folder contains the following video files:
        cloudy.mp4
        cold.mp4
        hot.mp4
        rain.mp4
        warm.mp4

    Note: Due to file size constraints, the video files may not be included in the repository. You may need to source or create your own videos matching these weather conditions.

API Key Setup

    Obtain an API Key from OpenWeatherMap
        Sign up at OpenWeatherMap if you haven't already.
        Navigate to the API section and obtain a free API key.

    Configure the API Key

        Open script.js in a text editor.

        Locate the following line:

const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your OpenWeatherMap API key

Replace 'YOUR_OPENWEATHERMAP_API_KEY' with your actual API key:

        const apiKey = 'your_actual_api_key_here';

Usage

    Open the Application
        Open index.html in your preferred web browser.

    Search for Weather Information
        Enter a city name in the search bar.
        Click the "Search" button.
        View the current weather information and observe the background video change.

    View and Use Search History
        Your recent searches will appear under the search form.
        Click on a city in your search history to view its weather information again.
        Apply filters to your search history using the temperature range and weather condition filters.

    User Authentication
        Click on "Log In" to log into your account.
        If you don't have an account, click on "Sign Up" to create one.
        Upon logging in, you will be redirected to your profile page.

    Toggle Themes
        Click on "Dark Mode"/"Light Mode" in the navigation bar to switch themes.

Deployment
Deploying to GitHub Pages

Follow these steps to deploy the application to GitHub Pages:

    Create a GitHub Repository
        Initialize a new repository on GitHub named weather-forecast-app.

    Push Your Code to GitHub

        Initialize git in your project directory:

git init

Add and commit your files:

git add .
git commit -m "Initial commit"

Add the remote repository:

git remote add origin https://github.com/your-username/weather-forecast-app.git

Push the code:

        git push -u origin master

    Enable GitHub Pages
        Go to your repository on GitHub.
        Click on the "Settings" tab.
        Scroll down to the "GitHub Pages" section.
        Under "Source," select "master branch" and save.
        Your site will be published at https://your-username.github.io/weather-forecast-app/.

    Access Your Live Application
        Visit the published URL to view your application online.

File Structure

weather-forecast-app/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── cloudy.mp4
    ├── cold.mp4
    ├── hot.mp4
    ├── rain.mp4
    └── warm.mp4

    index.html: The main HTML file containing the structure of the web application.
    style.css: The CSS file for styling, including responsive design and themes.
    script.js: The JavaScript file handling functionality, API calls, and interactions.
    README.md: Documentation and instructions for the project.
    assets/: Contains the video files used for dynamic backgrounds.

Known Issues

    API Key Exposure: The API key is included in the script.js file, which is publicly accessible. For production use, consider moving API calls to a server-side script to protect your API key.
    Video File Sizes: Large video files may lead to slow loading times. Optimize videos by compressing them without significant quality loss.
    Browser Compatibility: Autoplaying videos with sound may not work on some mobile browsers. Videos are set to muted to allow autoplay.
    Local Storage Limits: The application uses local storage to store user data and search history. Be aware of storage limits and data persistence across sessions.

Acknowledgments

    OpenWeatherMap for providing the weather API.
    Bootstrap for responsive design components.
    Font Awesome for iconography.
    Google Fonts for typography.
    Yessirkegen for developing this application.
