# GeoNLI - Satellite Image Intelligence Platform

**Built for Inter IIT Tech Meet 14.0- Team_24**

A modern web application that enables natural language interaction with satellite imagery using AI-powered analysis. Ask questions about satellite images like you're chatting with an expert.

![Status](https://img.shields.io/badge/status-active-success) ![Version](https://img.shields.io/badge/version-1.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-green)

---

## 🎯 Features

- **Interactive Chat Interface** - Chat with satellite images in real-time
- **Evaluation Mode** - Advanced JSON-based query evaluation for testing
- **Dark/Light Theme** - Seamless theme switching across the app
- **Session Management** - Create, save, and manage multiple chat sessions
- **Image Upload** - Drag-and-drop or click-to-upload satellite imagery
- **Cloud Storage** - Cloudinary integration for reliable image hosting
- **Responsive Design** - Fully responsive across desktop and tablet devices
- **Modern UI** - Beautiful gradients, smooth animations, and intuitive layouts

---

## 📁 Project Structure

```
ISRO_frontend/
│
├── 📄 Core Configuration Files
│   ├── vite.config.js                 # Vite bundler configuration
│   ├── tailwind.config.js             # Tailwind CSS customization
│   ├── postcss.config.js              # PostCSS processing config
│   ├── eslint.config.js               # ESLint rules
│   ├── jsconfig.json                  # JavaScript path aliases
│   ├── package.json                   # Dependencies & scripts
│   ├── vercel.json                    # Vercel deployment config
│   ├── components.json                # Shadcn components registry
│   ├── index.html                     # Entry HTML file
│   └── .gitignore                     # Git ignore rules
│
├── 📁 public/                         # Static assets
│   └── [Public images, favicon, etc]
│
├── 📁 src/                            # Source code
│   │
│   ├── 📄 main.jsx                    # Vite entry point
│   ├── 📄 App.jsx                     # Root component
│   ├── 📄 index.css                   # Global styles
│   │
│   ├── 📁 assets/                     # Images & media
│   │   └── ISRO-Color.svg             # ISRO logo
│   │
│   ├── 📁 Pages/                      # Page components
│   │   ├── Home.jsx                   # Landing page with hero section
│   │   ├── Dashboard.jsx              # Main dashboard
│   │   ├── Chat.jsx                   # Interactive chat interface
│   │   └── ChatEvalMode.jsx           # Evaluation mode with JSON I/O
│   │
│   ├── 📁 Components/                 # Reusable components
│   │   ├── Navbar.jsx                 # Top navigation bar
│   │   ├── Chatleft.jsx               # Session sidebar
│   │   ├── Chatmiddle.jsx             # Image upload panel
│   │   ├── Chatright.jsx              # Chat messages panel
│   │   ├── Footer.jsx                 # Footer component
│   │   ├── Style_slider.jsx           # Features showcase slider
│   │   ├── LayoutTextFlipDemo.jsx     # Animated text flip effect
│   │   ├── Error.jsx                  # Error boundary component
│   │   ├── apicaller.js               # API integration & AI calls
│   │   │
│   │   └── 📁 ui/                     # UI library components
│   │       ├── button.jsx             # Button component
│   │       ├── alert-dialog.jsx       # Alert dialog
│   │       ├── animated-list.jsx      # Animated list
│   │       ├── layout-text-flip.jsx   # Text flip animation
│   │       ├── typing-animation.jsx   # Typing effect
│   │       ├── TextType.jsx           # Custom text animation
│   │       ├── StarField.jsx          # Star background effect
│   │       ├── globe.jsx              # 3D globe component
│   │       └── globe-light.jsx        # Light theme globe
│   │
│   ├── 📁 Context/                    # React Context providers
│   │   ├── 📁 theme/
│   │   │   ├── Themecontext.jsx       # Theme context definition
│   │   │   └── Themeprovider.jsx      # Theme provider wrapper
│   │   │
│   │   └── 📁 session/
│   │       ├── sessioncontext.jsx     # Session context definition
│   │       └── sessionprovide.jsx     # Session provider wrapper
│   │
│   └── 📁 lib/                        # Utility functions
│       └── utils.js                   # Helper functions
│
└── 📄 README.md                       # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v16 or higher
- **npm** or **yarn** package manager
- **Cloudinary Account** (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DecodeX15/Interiit-ISRO.git
   cd Interiit-ISRO/ISRO_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
   VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   VITE_API_BASE_URL=your_api_endpoint
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

---

## 📦 Dependencies

### Core Framework
- **React** - UI library
- **React Router** - Client-side routing

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing

### UI & Animation
- **Lucide React** - Icon library
- **Framer Motion** - Animation library (optional)

### Utilities
- **uuid** - Unique ID generation
- **Cloudinary** - Image management & upload

### Development
- **Vite** - Build tool
- **ESLint** - Code linting

See `package.json` for complete dependency list.

---

## 🎨 Component Overview

### Page Components

#### **Home.jsx**
Landing page with:
- Hero section with animated text
- CTA buttons
- Features showcase (StyleSlider)
- Responsive layout with dark/light theme support

#### **Dashboard.jsx**
Main application dashboard for:
- Quick access to features
- Analytics or stats display

#### **Chat.jsx**
Interactive chat mode with:
- Session management (left sidebar)
- Image upload panel (middle)
- Chat interface (right panel)
- Mode toggle (interactive/evaluation)

#### **ChatEvalMode.jsx**
Advanced evaluation mode featuring:
- JSON input editor with syntax highlighting
- JSON output display with formatting
- Execution controls
- Export & copy functionality
- Status indicators (success/error)

### Key Components

#### **Navbar.jsx**
- Navigation menu
- Theme toggle (dark/light)
- Session indicator
- Responsive hamburger menu

#### **Chatleft.jsx**
- Session list with search
- Create new session modal
- Active session highlighting
- Session metadata (message count, date)

#### **Chatmiddle.jsx**
- Drag-and-drop image upload
- Preview before confirmation
- Cloudinary integration
- Loading state indicator

#### **Chatright.jsx**
- Message display with timestamps
- User/AI message differentiation
- Typing indicator
- Input field with auto-focus
- Scroll-to-bottom on new messages

#### **Footer.jsx**
- ISRO branding
- Quick links (GitHub, Report)
- Copyright information

---

## 🔌 API Integration

### apicaller.js
Central API integration module handling:
- AI model calls for satellite image analysis
- Response formatting
- Error handling
- Cloudinary image uploads

**Key Functions:**
```javascript
handlemodelresponse(message, sessionId, imageUrl)
// Sends user query to AI model with image context
// Returns: AI response text

uploadToCloudinary(file)
// Uploads image to Cloudinary
// Returns: Public image URL
```

---

## 🎯 Context Providers

### Theme Context (`Context/theme/`)
Manages:
- Dark/light theme state
- Theme persistence in localStorage
- Theme toggle function

**Usage:**
```jsx
const { darkMode, toggleTheme } = useTheme();
```

### Session Context (`Context/session/`)
Manages:
- Active session state
- Sessions array
- Session CRUD operations
- Message history per session

**Usage:**
```jsx
const { sessions, setSessions, activeSessionId, setActiveSessionId } 
  = useContext(sessioncontext);
```

---

## 🎨 Styling & Theme

### Color Palette
- **Primary**: Blue (`#3B82F6`)
- **Secondary**: Orange (`#F97316`)
- **Dark BG**: Gray-900 (`#111827`)
- **Light BG**: Gray-50 (`#F9FAFB`)

### Key Styling Features
- Gradient buttons (blue → orange)
- Rounded corners (rounded-lg, rounded-xl, rounded-2xl)
- Shadow effects for depth
- Smooth transitions (300ms)
- Backdrop blur for modals
- Scrollbar customization

---

## 📱 Responsive Breakpoints

The app is responsive across:
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (lg, xl)

Key responsive classes used:
- `flex-col sm:flex-row` - Column on mobile, row on desktop
- `grid-cols-1 lg:grid-cols-2` - Single column on mobile, 2 columns on desktop
- `text-sm md:text-lg` - Scaled typography

---

## 🌙 Dark/Light Mode

All components support both themes:
```jsx
className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
```

Theme persists in `localStorage` as `theme-mode`.

---

## 💾 Data Persistence

- **Sessions**: Stored in `localStorage` as `GeoNLI_Sessions`
- **Theme**: Stored in `localStorage` as `theme-mode`
- **Images**: Hosted on Cloudinary (URL stored in session)

---

## 🚢 Deployment

### Vercel Deployment
The project includes `vercel.json` for easy Vercel deployment:

```bash
npm run build
vercel deploy
```

### Build Command
```bash
npm run build
```

### Preview Build Locally
```bash
npm run preview
```

---

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `dxxxxxxxxx` |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Cloudinary upload preset | `geonli_preset` |
| `VITE_API_BASE_URL` | Backend API endpoint | `https://api.example.com` |

---

## 📚 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## 🛠 Technologies Stack

| Category | Technology |
|----------|-----------|
| Frontend Framework | React |
| Styling | Tailwind CSS |
| Build Tool | Vite |
| Icons | Lucide React |
| Image Management | Cloudinary |
| State Management | React Context |
| Routing | React Router |
| ID Generation | UUID |

---

## 📝 File Naming Conventions

- **Components**: PascalCase (e.g., `Navbar.jsx`)
- **Utilities**: camelCase (e.g., `apicaller.js`)
- **Styles**: Tailwind classes in JSX
- **Context**: descriptive names (e.g., `Themecontext.jsx`)

---

## 👥 Team

**Built by**: Team_24
**For**: Inter IIT Tech Meet 14.0 x ISRO - GeoNLI Mid-Prep

---

## 🔗 Links

- **GitHub**: [Interiit-ISRO Repository](https://github.com/DecodeX15/Interiit-ISRO)
- **Live Demo**: [GeoNLI Platform](https://interiit-isro.vercel.app)
- **Issue Tracker**: [GitHub Issues](https://github.com/DecodeX15/Interiit-ISRO/issues)

---


**Last Updated**: December 2025  
**Version**: 1.0.0