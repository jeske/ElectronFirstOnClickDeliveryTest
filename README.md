# Electron First Click Event Test

## Purpose

This minimal Electron application was created to test a suspected bug where Electron appeared to "eat" the first `onclick` event after application launch, while `onmousedown` events were working correctly from the start.

## Suspected Bug Description

The suspected issue was:
- **Problem**: On first launch of an Electron application, clicking on a button with an `onclick` handler would not trigger the event on the first click. The first click appeared to be consumed/lost.
- **Observed Behavior**: The `onmousedown` event handler would work correctly on the first interaction.
- **Expected Behavior**: Both `onclick` and `onmousedown` should fire on the first user interaction.

## Test Application

This test application consists of:
- A minimal Electron container (v37.3.1 - latest as of August 2025)
- Pure HTML/CSS/JavaScript with NO frameworks
- Two test buttons:
  - Left button with `onclick` handler
  - Right button with `onmousedown` handler
- Window state monitoring (focus, active, visibility)
- Event logging to track all interactions with timestamps

## Test Results

**CONCLUSION: NO BUG IN ELECTRON**

The test definitively shows that:
1. ✅ The `onclick` event fires correctly on the first click
2. ✅ The `onmousedown` event also fires correctly on the first click
3. ✅ Both event handlers work identically from application launch
4. ✅ Window focus and active states are properly maintained

## Actual Issue

Based on these test results, we can conclude:
- The issue is **NOT** with Electron itself
- The problem we were experiencing is likely related to **Angular** or another framework layer
- Framework event handling, zone.js, or change detection in Angular may be interfering with the first click event

## How to Run This Test

### Prerequisites
- Node.js installed
- npm installed

### Steps
1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the application:
   ```bash
   npm start
   ```

### Testing Procedure
1. Launch the application fresh
2. Click the LEFT button (onclick handler) - Note it DOES fire on first click
3. Click the RIGHT button (onmousedown handler) - Also fires on first click
4. Observe the event log showing both events firing correctly
5. Monitor the window state indicators

## Project Structure

```
ElectronEatsFirstONCLICK/
├── main-electron.js       # Main Electron process
├── preload-electron.js    # Preload script (minimal, for security)
├── index.html            # UI with test buttons
├── renderer.js           # Event handlers and logging
├── styles.css            # Styling for the test UI
├── package.json          # Project configuration
├── .gitignore           # Git ignore file
└── README.md            # This file
```

## Key Findings

1. **Electron is working correctly** - The first click event is NOT being consumed by Electron
2. **Pure JavaScript events work fine** - Both onclick and onmousedown fire on first interaction
3. **The issue is framework-specific** - Problems with first click are likely due to Angular's event handling system

## Next Steps

To debug the Angular-specific issue:
1. Check Angular's zone.js event patching
2. Verify Angular's change detection on first interaction
3. Test with different Angular event binding methods (`(click)` vs `@HostListener`)
4. Check if Angular Material or other UI libraries are interfering
5. Investigate any custom event handlers or directives that might be affecting the first click

## Technical Details

- **Electron Version**: 37.3.1
- **Node Version**: As bundled with Electron
- **Test Date**: August 2025
- **Platform**: Windows 11
- **Result**: No bug found in Electron

---

This test conclusively demonstrates that Electron handles first click events correctly, and any issues experienced are occurring at the framework (Angular) level rather than the Electron container level.