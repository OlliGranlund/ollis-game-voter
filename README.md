# Ollis Game Voter

A simple web application for handling votes in board games, optimized for mobile use with a dark Diablo-themed design.

## Features

- **Two voting buttons** (Success/Fail) with randomized order after each vote
- **Vote statistics** tracking with persistent storage
- **5-second cooldown** after each vote with notification
- **Mobile-optimized** large buttons for easy touch interaction
- **Dark theme** with Diablo-inspired styling

## GitHub Pages Setup

1. Push this repository to GitHub
2. Go to your repository settings
3. Navigate to "Pages" in the left sidebar
4. Under "Source", select the branch you want to deploy (usually `main` or `master`)
5. Click "Save"
6. Your site will be available at `https://[your-username].github.io/[repository-name]/`

## Local Development

Simply open `index.html` in a web browser. No build process or server required.

## Files

- `index.html` - Main HTML structure
- `style.css` - Dark theme styling
- `script.js` - Vote handling and logic
- `README.md` - This file

## Usage

1. Click either "Success" or "Fail" button to cast a vote
2. A "Thank you for your vote" notification will appear
3. Buttons are disabled for 5 seconds (cooldown period)
4. Button order randomizes after each vote
5. Click "View Stats" to see vote statistics
6. Use "Reset Votes" in the stats modal to clear all votes

## Browser Support

Works in all modern browsers that support:
- ES6 JavaScript
- CSS3
- localStorage API

