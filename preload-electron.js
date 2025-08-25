// Electron Preload Script
// This script runs before the renderer process (web page) is loaded
// It acts as a bridge between the main process (Node.js) and renderer process (web page)
// For this simple demonstration, we don't need to expose any APIs
// The preload script helps maintain security by keeping the renderer isolated

// In a real application, you might use this to:
// - Expose specific Node.js APIs to the renderer
// - Set up IPC (Inter-Process Communication) channels
// - Add security headers or content

// For our bug demonstration, this file is intentionally minimal
// as we're using pure HTML/JS without any Node.js features in the renderer