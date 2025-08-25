// Renderer Process Script
// This runs in the web page context (not Node.js)
// It handles UI interactions and demonstrates the onclick vs onmousedown bug

// Utility function to format timestamps
function getTimestamp() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        fractionalSecondDigits: 3 
    });
}

// Log messages to the log container
function logMessage(message, type = 'info') {
    const logContainer = document.getElementById('log-container');
    const entry = document.createElement('div');
    entry.className = `log-entry log-${type}`;
    entry.textContent = message;
    
    // Add to the top of the log (newest first)
    if (logContainer.firstChild) {
        logContainer.insertBefore(entry, logContainer.firstChild);
    } else {
        logContainer.appendChild(entry);
    }
    
    // Keep only the last 50 entries to prevent memory issues
    while (logContainer.children.length > 50) {
        logContainer.removeChild(logContainer.lastChild);
    }
}

// Update window state display
function updateWindowState() {
    // Document focus state
    const hasFocus = document.hasFocus();
    const focusElement = document.getElementById('document-focus');
    focusElement.textContent = hasFocus ? 'YES' : 'NO';
    focusElement.className = hasFocus ? 'state-value active' : 'state-value inactive';
    
    // Window visibility state
    const visibility = document.visibilityState;
    const visibilityElement = document.getElementById('document-visibility');
    visibilityElement.textContent = visibility.toUpperCase();
    visibilityElement.className = visibility === 'visible' ? 'state-value active' : 'state-value inactive';
    
    // Window active state (approximation using focus and visibility)
    const isActive = hasFocus && visibility === 'visible';
    const activeElement = document.getElementById('window-active');
    activeElement.textContent = isActive ? 'YES' : 'NO';
    activeElement.className = isActive ? 'state-value active' : 'state-value inactive';
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initial state update
    updateWindowState();
    
    // Set up periodic state updates (as requested - using setTimeout/setInterval for reliable updates)
    setInterval(updateWindowState, 500);
    
    // Get button elements
    const onclickButton = document.getElementById('onclick-button');
    const onmousedownButton = document.getElementById('onmousedown-button');
    const clearLogButton = document.getElementById('clear-log');
    
    // Track click counts for each button
    let onclickCount = 0;
    let onmousedownCount = 0;
    
    // Set up onclick handler for LEFT button (THIS IS WHERE THE BUG OCCURS)
    onclickButton.onclick = (event) => {
        onclickCount++;
        logMessage(`[${getTimestamp()}] - left button clicked`, 'click');
        
        // Visual feedback
        onclickButton.classList.add('clicked');
        setTimeout(() => onclickButton.classList.remove('clicked'), 200);
    };
    
    // Set up onmousedown handler for RIGHT button (THIS WORKS ON FIRST CLICK)
    onmousedownButton.onmousedown = (event) => {
        onmousedownCount++;
        logMessage(`[${getTimestamp()}] - right button onmousedown`, 'mousedown');
        
        // Visual feedback
        onmousedownButton.classList.add('clicked');
        setTimeout(() => onmousedownButton.classList.remove('clicked'), 200);
    };
    
    // Clear log button
    clearLogButton.onclick = () => {
        const logContainer = document.getElementById('log-container');
        logContainer.innerHTML = '';
        onclickCount = 0;
        onmousedownCount = 0;
    };
    
    // Window focus events - needed to update the state display
    window.addEventListener('focus', () => {
        updateWindowState();
        logMessage(`[${getTimestamp()}] - window active`, 'focus');
    });
    
    window.addEventListener('blur', () => {
        updateWindowState();
    });
    
    // Document visibility events - needed to update the state display
    document.addEventListener('visibilitychange', () => {
        updateWindowState();
    });
});