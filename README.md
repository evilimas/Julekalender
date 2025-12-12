# 🎄 Julekalender (Christmas Calendar)

An interactive Christmas advent calendar web application built with Vue 3, TypeScript, and Firebase. Users can open daily doors to reveal festive content, creating a magical countdown to Christmas!

**Built by:** Chris, Egidijus, og Martin 👥

## ✨ Features

### 🗓️ Interactive Calendar

- **24 Day Advent Calendar**: Beautiful grid layout with daily doors
- **Time-Based Unlocking**: Days automatically become openable based on current date
- **Visual Feedback**: Hover effects, confetti explosions, and smooth animations
- **Content Security**: Future days' content is completely hidden from DOM inspection

### 🎨 Customizable Styling

- **Dynamic Themes**: Change background images, colors, and fonts
- **Real-time Updates**: Style changes apply instantly across all users
- **Admin Panel**: Easy-to-use styling interface for customization

### 🎯 User Experience

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Snow Animation**: Festive CSS-based snowfall effect
- **Interactive Elements**: Animated pig mascot with hover effects
- **Smooth Scrolling**: Custom scrollbars that only appear when needed

### 🔐 Authentication & Security

- **Firebase Authentication**: Secure user login with email/password and Google OAuth
- **Protected Content**: Days only reveal content when properly unlocked
- **Real-time Sync**: All users see the same calendar state

### 🎪 Fun Elements

- **Confetti Explosions**: Celebrate when opening available days
- **Animated Mascot**: Interactive pig character with GIF animations
- **Easter Eggs**: Hidden surprises for users who try to cheat
- **Sound & Visual Effects**: Engaging feedback for user interactions

## 🛠️ Tech Stack

- **Frontend**: Vue 3 with Composition API & TypeScript
- **Styling**: Scoped CSS with modern gradients and animations
- **Backend**: Firebase Firestore for real-time database
- **Authentication**: Firebase Auth (Email/Password + Google OAuth)
- **State Management**: Pinia for reactive state
- **Routing**: Vue Router for navigation
- **Build Tool**: Vite for fast development and building
- **Effects**: vue-confetti-explosion for celebrations

## 📁 Project Structure

```
src/
├── components/
│   ├── KalenderComponent.vue    # Main calendar grid and day logic
│   └── NavComponent.vue         # Navigation bar with auth controls
├── views/
│   ├── HomeSide.vue            # Main calendar page with snow effects
│   ├── LagKalenderSide.vue     # Calendar content editing interface
│   ├── LoginSide.vue           # User authentication page
│   └── StylingSide.vue         # Theme customization panel
├── stores/
│   └── FirebaseStore.ts        # Pinia store for Firebase operations
├── services/
│   ├── firebase.ts             # Firebase configuration
│   └── types.ts                # TypeScript type definitions
└── router/
    └── index.ts                # Vue Router configuration
```

## 🚀 Key Components

### Calendar Component

- **Smart Day Logic**: Automatically determines which days are openable
- **Content Management**: Supports text, images, and video content
- **Visual States**: Different styling for opened/closed/locked days
- **Accessibility**: Proper ARIA labels and keyboard navigation

### Firebase Integration

- **Real-time Database**: Instant sync across all connected users
- **Batch Operations**: Efficient updates for calendar modifications
- **User Management**: Secure authentication and user profiles
- **Data Validation**: TypeScript interfaces ensure data integrity

### Styling System

- **Shared Themes**: All users see the same visual style
- **Easy Customization**: Simple interface for changing appearance
- **Responsive Design**: Looks great on all screen sizes
- **Performance Optimized**: Efficient CSS with minimal reflows

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
