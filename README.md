# Mobile Todo App

A fully-featured React Native todo list application with local storage persistence.

## Features

✅ **Task Management**
- Add, edit, delete tasks
- Mark tasks as complete/incomplete
- View all, active, and completed tasks
- Priority levels (Low, Medium, High)
- Due dates with overdue warnings
- Task categories with custom colors

✅ **Local Storage**
- All data saved to device via AsyncStorage
- Persistent across app sessions
- Automatic sync

✅ **Categories**
- Pre-built categories (Work, Personal, Shopping, Health)
- Create custom categories
- Assign tasks to categories
- Color-coded for easy identification

✅ **UI/UX**
- Dark/Light theme toggle
- Responsive mobile design
- Bottom tab navigation
- Smooth animations
- Statistics dashboard

✅ **Settings**
- Theme preferences
- Clear completed tasks
- View task statistics
- Clear all data option

## Tech Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development and distribution platform
- **TypeScript** - Type safety
- **AsyncStorage** - Local data persistence
- **React Navigation** - Tab-based navigation
- **React Native Vector Icons** - UI icons

## Installation

### Prerequisites
- Node.js (v14+)
- Expo CLI: `npm install -g expo-cli`
- Mobile device or emulator

### Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm start
   ```

## Running on Device

### Via Expo Go (Easiest)
1. Download **Expo Go** app on your phone
2. Scan the QR code from the terminal
3. App loads instantly

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

## Building for Production

### Android APK
```bash
npm run build:android
```

### iOS App
```bash
npm run build:ios
```

## Project Structure

```
src/
├── components/
│   └── TodoItem.tsx          # Individual todo item component
├── screens/
│   ├── TodoScreen.tsx         # Main tasks screen
│   ├── CategoriesScreen.tsx   # Categories management
│   └── SettingsScreen.tsx     # Settings & preferences
├── hooks/
│   └── useTodos.ts            # Custom hook for todo logic
├── context/
│   └── ThemeContext.tsx       # Dark/Light theme context
└── types/
    └── index.ts               # TypeScript interfaces
```

## LocalStorage Keys

- `@todos_storage` - All tasks
- `@categories_storage` - Custom categories
- `@theme_mode` - Theme preference (dark/light)

## Features in Detail

### Task Priority
- **Low** - Green (Non-urgent tasks)
- **Medium** - Yellow (Standard priority)
- **High** - Red (Urgent tasks)

### Categories
Default categories:
- Work (Indigo)
- Personal (Pink)
- Shopping (Amber)
- Health (Green)

Create custom categories with any name and color.

### Statistics
Track your productivity:
- Total tasks
- Active tasks
- Completed tasks
- Overdue tasks

## Usage Tips

1. **Quick Task** - Tap FAB to add a new task
2. **Edit Task** - Tap pencil icon on any task
3. **Complete Task** - Tap circle to mark done
4. **Delete Task** - Tap trash icon
5. **Filter View** - Use tabs to filter tasks
6. **Dark Mode** - Toggle in Settings
7. **Clear Data** - Use "Clear All Data" in Settings

## Known Limitations

- Data stored locally (not synced to cloud)
- Single device per installation
- No backup/restore feature (yet)

## Future Enhancements

- [ ] Cloud sync (Firebase)
- [ ] Push notifications for due dates
- [ ] Task notes/descriptions
- [ ] Recurring tasks
- [ ] Subtasks
- [ ] Tags system
- [ ] Export data (PDF/CSV)
- [ ] Multi-language support

## License

MIT
