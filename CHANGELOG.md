# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0] - 2026-10-23
### Added
- **API badge** - replaced old `(API)` labels with proper badges for consistency and cleaner visuals

### Changed
- **Project cards** - replaced old neon "progress-bar"-like borders with a subtle keycap-style hover glow for a cleaner and more optimized look
- **Badge placement** in `My GitHub repositories` - moved from top-right to bottom-right corner to prevent overlap with long repository names
- **Font size** in `SAM services` - adjusted overly large text for better visual balance

### Removed
- **(API) label** in `SAM services`
- **Outdated comments**
- **Empty CSS rulesets**

### Fixed
- **Topbar and body width** - fixed layout issue where the website wasn't full-width on mobile devices
- **Neon border** in `My Projects` - fixed flashing and disabled animation on mobile for smoother experience

### Refactored
- **Reorganized code regions** `#region project-card - Disclaimer and badge` for better structure and readability

---

## [1.3.0] - 2025-10-13
### Added
- Burger menu for mobile navigation
- Project cards in My Projects section with title, description, status badge, and tooltip
- Animated neon border around project cards with progress-like motion
- Automatic GitHub repository language detection using the official GitHub API (based on the dominant language)
- New project added to My GitHub repositories section
- i18n support for new UI elements and tooltips
- Modular support for easy addition of tooltips and badges across UI elements
- New color variables for extended customization
- #region code structure for better readability and organization

### Changed
- Replaced project links with interactive project cards in My Projects section
- Improved frontend layout and responsiveness
- Updated link for the new project (replaced previous placeholder)
- Updated CSS for modularity and responsiveness
- General code refactor for better maintainability

---

## [1.2.0] - 2025-8-22
### Added
- Services Availability Monitor (SAM)
- MaxChatbotBackend (API) availability monitor entry
- New repository entry
- Polish translation for My GitHub projects title

### Changed
- Website title
- My GitHub repositories title

### Removed
- Backend and GitHub links to MaxChatbot from My projects - now these links can be found in SAM and GitHub repositories respectively

### Fixed
- Repositories layout

---

## [1.1.0] - 2025-8-22
### Added
- New repositories dropdown menu in topbar
- i18n support
- Hover animation for links

### Changed
- Split JavaScript files into smaller modules
- Change .png logo to .svg version
- Redesign repositories view to match GitHub style

### Removed
- Vertical line between logo and GitHub profile name
- Insignificant, abandoned and unfinished repositories

### Fixed
- URLs
- Rename folder FrontEnd → frontend

---

## [1.0.0] - 2025-8-18
### First version of website!