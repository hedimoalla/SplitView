# 🎨 SplitView - Image Comparison Tool

A modern desktop application for side-by-side image comparison with an interactive draggable slider. Perfect for viewing before/after photos, version comparisons, and visual analysis.

**Built with:** React 18 • Electron 25 • electron-forge • Tailwind CSS • Lucide Icons

## ✨ Features

- **Draggable Comparison Slider** - Click and drag to reveal different portions of your images
- **Before/After Upload** - Easy image upload with click or drag-and-drop support
- **Individual Clear Buttons** - Remove images one at a time or clear both with one button
- **Swap Positions** - Toggle before/after images with a single click
- **Image Information** - Display image dimensions and file size
- **Export Comparison** - Save your comparison as a PNG file
- **Zoom Controls** - Zoom in/out with buttons or keyboard shortcuts
- **Keyboard Shortcuts** - Quick access to all major functions
- **Cross-Platform** - Works seamlessly on macOS and Windows
- **Clean Modern UI** - Light, intuitive interface with responsive design

## 🚀 Quick Start

### Prerequisites
- **Node.js 18.x** (use nvm to manage versions)
- **npm 9.x+**

### Installation

```bash
# Clone the repository
git clone https://github.com/hedimoalla/SplitView.git
cd SplitView

# Install dependencies (Note: Node 18 required)
npm install

# Start development server
npm start
```

The app will launch in development mode with DevTools open.

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd++` / `Ctrl++` | Zoom In |
| `Cmd+-` / `Ctrl+-` | Zoom Out |
| `Cmd+0` / `Ctrl+0` | Reset Zoom |
| `Cmd+S` / `Ctrl+S` | Swap Before/After Positions |
| `Cmd+R` / `Ctrl+R` | Clear All Images |
| `Cmd+E` / `Ctrl+E` | Export Comparison as PNG |

## 🛠️ Development

### Project Structure

```
SplitView/
├── config/                              # Build & tooling configuration
│   ├── forge.config.js                  # electron-forge config
│   ├── webpack.main.config.js           # Main process webpack
│   ├── webpack.renderer.config.js       # Renderer webpack
│   ├── webpack.rules.js                 # Webpack loaders
│   ├── tailwind.config.js               # Tailwind CSS config
│   └── postcss.config.js                # PostCSS config
├── src/
│   ├── main/
│   │   └── main.js                      # Electron main process
│   ├── app/
│   │   ├── renderer.js                  # React entry point
│   │   ├── App.jsx                      # Main app component
│   │   ├── index.html                   # HTML template
│   │   ├── index.css                    # Global styles
│   │   └── components/
│   │       └── ImageComparisonSlider.jsx # Core comparison feature
│   └── preload.js                       # Electron preload
├── assets/                              # Static assets
├── forge.config.js                      # Root config reference
├── tailwind.config.js                   # Root config reference
├── postcss.config.js                    # Root config reference
└── package.json
```

### npm Scripts

```bash
npm start           # Start the app in development mode
npm run package     # Package the app for distribution
npm run make        # Create distributable packages
npm run lint        # Run linter (currently no-op)
```

### Building for Production

#### macOS
```bash
npm run make
```
Creates:
- `DMG` package with drag-and-drop installation
- `ZIP` archive

#### Windows  
```bash
npm run make
```
Creates:
- Portable `.exe` (no installation required)
- NSIS installer (with Start Menu shortcuts)

## 🔧 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.2.0 | UI Framework |
| Electron | 25.0.0 | Desktop framework |
| electron-forge | 7.11.2 | Build & packaging |
| Webpack | 5.111.1 | Module bundler |
| Babel | 7.22.0 | JSX transpiler |
| Tailwind CSS | 3.3.0 | Styling |
| Lucide React | latest | Icons |

## 📋 System Requirements

### macOS
- macOS 10.13 or later
- Apple Silicon (arm64) or Intel (x64)

### Windows
- Windows 10 or later
- x64 processor

## 🎯 Usage

1. **Launch the App**
   ```bash
   npm start
   ```

2. **Upload Images**
   - Click upload areas or drag images onto "Before" and "After" boxes
   - Supports PNG, JPG, WebP, and other common image formats
   - File size and dimensions display after upload

3. **Compare**
   - Drag the white slider left/right to reveal different portions
   - Images stay superimposed; slider controls visibility
   - Use Swap button to toggle before/after positions

4. **Zoom**
   - Use zoom buttons or keyboard shortcuts (Cmd/Ctrl + ±)
   - Zoom level displays in toolbar (50% - unlimited)
   - Press Cmd/Ctrl+0 to reset zoom to 100%

5. **Export & Manage**
   - Clear individual images with the Clear button next to each upload area
   - Clear both images with Clear All button
   - Export comparison as PNG using Export button or Cmd/Ctrl+E

## 🐛 Troubleshooting

### App won't start
```bash
# Ensure Node 18 is active
nvm use 18.17.0

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Port conflicts
The app uses dynamic ports. If port 3000 is in use, webpack will use another available port.

### Build errors
```bash
# Clear build cache
rm -rf .webpack

# Rebuild
npm start
```

## 📦 Distribution

### Package the App
```bash
npm run make
```

This creates platform-specific installers in the `out/` directory:
- **macOS**: `.dmg` and `.zip`
- **Windows**: `.exe` (portable and installer)

### Code Signing (Production)

For macOS App Store distribution:
```bash
export CSC_IDENTITY_AUTO_DISCOVERY=false
export CSC_LINK=/path/to/certificate.p12
export CSC_KEY_PASSWORD=password
npm run make
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Electron](https://www.electronjs.org/)
- UI components from [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Build system powered by [electron-forge](https://www.electronforge.io/)

## 📞 Support

For issues, questions, or suggestions:
- Open an [issue](https://github.com/hedimoalla/SplitView/issues)
- Check existing [discussions](https://github.com/hedimoalla/SplitView/discussions)

---

**Happy comparing! 🎨**
