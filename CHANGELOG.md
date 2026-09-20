# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-09-20

### Added
- Initial release of SplitView
- Draggable comparison slider for side-by-side image comparison
- Drag-and-drop image upload support
- Click to upload functionality
- Image information display (dimensions and file size)
- Zoom controls (Zoom In, Zoom Out, Reset)
- Image swap functionality
- Export comparison as PNG
- Individual and batch image clear options
- Keyboard shortcuts for all major functions:
  - `Ctrl/Cmd++` - Zoom In
  - `Ctrl/Cmd+-` - Zoom Out
  - `Ctrl/Cmd+0` - Reset Zoom
  - `Ctrl/Cmd+S` - Swap Images
  - `Ctrl/Cmd+R` - Clear All Images
  - `Ctrl/Cmd+E` - Export Comparison
- Cross-platform support (macOS and Windows)
- Clean, modern UI with responsive design
- Built with React 18, Electron 25, and Tailwind CSS

### Technical
- Organized project structure with separated config and source directories
- Webpack-based build system
- PostCSS and Tailwind CSS for styling
- Electron Forge for packaging and distribution
