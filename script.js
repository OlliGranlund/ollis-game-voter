// State management
const state = {
    successCount: 0,
    failCount: 0,
    isCooldownActive: false,
    cooldownTimer: null
};

// DOM elements
const successBtn = document.getElementById('successBtn');
const failBtn = document.getElementById('failBtn');
const buttonsContainer = document.getElementById('buttonsContainer');
const statsBtn = document.getElementById('statsBtn');
const statsModal = document.getElementById('statsModal');
const closeStatsBtn = document.getElementById('closeStatsBtn');
const resetBtn = document.getElementById('resetBtn');
const notification = document.getElementById('notification');
const successCountEl = document.getElementById('successCount');
const failCountEl = document.getElementById('failCount');
const totalCountEl = document.getElementById('totalCount');

// Initialize app
function init() {
    loadStats();
    updateStatsDisplay();
    randomizeButtonOrder();
    
    // Event listeners
    successBtn.addEventListener('click', () => handleVote('success'));
    failBtn.addEventListener('click', () => handleVote('fail'));
    statsBtn.addEventListener('click', showStats);
    closeStatsBtn.addEventListener('click', hideStats);
    resetBtn.addEventListener('click', resetVotes);
    
    // Close modal when clicking outside
    statsModal.addEventListener('click', (e) => {
        if (e.target === statsModal) {
            hideStats();
        }
    });
}

// Load stats from localStorage
function loadStats() {
    const savedSuccess = localStorage.getItem('successCount');
    const savedFail = localStorage.getItem('failCount');
    
    if (savedSuccess !== null) {
        state.successCount = parseInt(savedSuccess, 10);
    }
    if (savedFail !== null) {
        state.failCount = parseInt(savedFail, 10);
    }
}

// Save stats to localStorage
function saveStats() {
    localStorage.setItem('successCount', state.successCount.toString());
    localStorage.setItem('failCount', state.failCount.toString());
}

// Handle vote
function handleVote(voteType) {
    if (state.isCooldownActive) {
        return;
    }
    
    // Record vote
    if (voteType === 'success') {
        state.successCount++;
    } else {
        state.failCount++;
    }
    
    saveStats();
    updateStatsDisplay();
    
    // Show notification
    showNotification();
    
    // Start cooldown (this will handle loading state and randomization)
    startCooldown();
}

// Show notification popup
function showNotification() {
    notification.classList.add('show');
}

// Hide notification popup
function hideNotification() {
    notification.classList.remove('show');
}

// Start cooldown period
function startCooldown() {
    state.isCooldownActive = true;
    
    // Add loading state to buttons
    successBtn.classList.add('loading');
    failBtn.classList.add('loading');
    
    // Disable buttons
    successBtn.disabled = true;
    failBtn.disabled = true;
    
    // Clear any existing timer
    if (state.cooldownTimer) {
        clearTimeout(state.cooldownTimer);
    }
    
    // Set timer for 5 seconds
    state.cooldownTimer = setTimeout(() => {
        state.isCooldownActive = false;
        
        // Remove loading state
        successBtn.classList.remove('loading');
        failBtn.classList.remove('loading');
        
        // Re-enable buttons
        successBtn.disabled = false;
        failBtn.disabled = false;
        
        // Hide notification
        hideNotification();
        
        // Randomize button order after cooldown ends
        randomizeButtonOrder();
    }, 5000);
}

// Randomize button order
function randomizeButtonOrder() {
    // Randomly decide whether to swap buttons
    if (Math.random() < 0.5) {
        // Swap the buttons
        const firstChild = buttonsContainer.firstElementChild;
        const secondChild = buttonsContainer.lastElementChild;
        
        buttonsContainer.removeChild(firstChild);
        buttonsContainer.appendChild(firstChild);
    }
    // If random >= 0.5, keep current order (no swap needed)
}

// Show stats modal
function showStats() {
    updateStatsDisplay();
    statsModal.classList.add('show');
}

// Hide stats modal
function hideStats() {
    statsModal.classList.remove('show');
}

// Update stats display
function updateStatsDisplay() {
    successCountEl.textContent = state.successCount;
    failCountEl.textContent = state.failCount;
    totalCountEl.textContent = state.successCount + state.failCount;
}

// Reset votes
function resetVotes() {
    if (confirm('Are you sure you want to reset all votes?')) {
        state.successCount = 0;
        state.failCount = 0;
        saveStats();
        updateStatsDisplay();
        hideStats();
    }
}

// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

