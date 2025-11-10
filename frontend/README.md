# TherapyDiary Frontend

A React Native mobile application for mental health tracking using Behavioural Activation therapy principles.

## 🚀 Tech Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development framework and tooling
- **React Navigation**: Screen navigation
- **Axios**: HTTP client for API requests
- **Expo SecureStore**: Secure token storage
- **React Context**: State management

## 📱 Features

### Authentication
- User registration with validation
- Secure login with JWT tokens
- Profile management
- Password change functionality

### Diary Management
- Track daily activities
- Record mood before and after activities (1-10 scale)
- Add notes and reflections
- View entries by date
- Filter by time of day

### Activity Library
- Browse 70+ pre-populated activities
- Create custom activities
- Filter by category (Routine, Necessary, Pleasurable)
- Filter by difficulty (Easiest, Moderate, Difficult)
- Rank activities based on personal experience

### Profile & Settings
- View user information
- Manage notification settings
- Set reminder times
- Logout functionality

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── screens/          # Screen components
│   │   ├── LoginScreen.js
│   │   ├── RegisterScreen.js
│   │   ├── HomeScreen.js
│   │   ├── DiaryScreen.js
│   │   ├── ActivitiesScreen.js
│   │   └── ProfileScreen.js
│   ├── navigation/       # Navigation configuration
│   │   └── AppNavigator.js
│   ├── context/          # React Context providers
│   │   └── AuthContext.js
│   ├── services/         # API services
│   │   └── api.js
│   ├── constants/        # App constants and config
│   │   └── config.js
│   ├── components/       # Reusable components
│   └── utils/            # Utility functions
├── App.js               # Main app component
└── package.json
```

## 🛠️ Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Expo Go app on your mobile device (for testing)

### Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Update API configuration:
   - Open `src/constants/config.js`
   - Update `LOCAL_NETWORK` with your computer's IP address if testing on a physical device
   - Keep `LOCALHOST` for emulator/simulator testing

## 🚀 Running the App

### Start Development Server
```bash
npm start
```

This will start the Expo development server and show a QR code.

### Run on iOS Simulator (Mac only)
```bash
npm run ios
```

### Run on Android Emulator
```bash
npm run android
```

### Run on Web Browser
```bash
npm run web
```

### Run on Physical Device
1. Install **Expo Go** app from App Store (iOS) or Play Store (Android)
2. Run `npm start`
3. Scan the QR code with your camera (iOS) or Expo Go app (Android)

## 🔧 Configuration

### API Connection

The app needs to connect to the backend API. Update the configuration in `src/constants/config.js`:

```javascript
// For iOS Simulator or Android Emulator
const LOCALHOST = 'http://localhost:3000';

// For Physical Device (replace with your computer's IP)
const LOCAL_NETWORK = 'http://192.168.1.100:3000';
```

**To find your computer's IP address:**

**Windows:**
```powershell
ipconfig
# Look for IPv4 Address under your active network adapter
```

**Mac/Linux:**
```bash
ifconfig
# Look for inet address
```

### Environment Setup

Make sure your backend server is running:
```bash
cd ../backend
npm run dev
```

## 📱 App Navigation Flow

### Unauthenticated Users
```
Login Screen → Register Screen
```

### Authenticated Users
```
Home Screen (Dashboard)
├── Diary Screen (Track activities)
├── Activities Screen (Browse library)
└── Profile Screen (Settings & logout)
```

## 🎨 Theme & Styling

The app uses a consistent design system defined in `src/constants/config.js`:

- **Primary Color**: Indigo (#6366f1)
- **Secondary Color**: Purple (#8b5cf6)
- **Success**: Green (#10b981)
- **Error**: Red (#ef4444)
- **Background**: Light gray (#f9fafb)

Mood colors range from red (1 - very bad) to sky blue (10 - excellent).

## 🔐 Security

- JWT tokens stored securely using Expo SecureStore
- Passwords validated with complexity requirements
- Automatic token expiration handling
- Secure API communication with interceptors

## 📊 API Integration

The app integrates with the TherapyDiary backend API:

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Diary Endpoints
- `GET /api/diary` - List diary entries
- `POST /api/diary` - Create entry
- `GET /api/diary/date/:date` - Get entries by date

### Activity Endpoints
- `GET /api/activities` - List activities
- `POST /api/activities` - Create custom activity
- `GET /api/activities/category/:category` - Filter by category

See `src/services/api.js` for complete API documentation.

## 🧪 Testing

### Test User Registration
1. Launch the app
2. Tap "Sign up" on login screen
3. Fill in registration form:
   - Name: Test User
   - Email: test@example.com
   - Age: 25
   - Password: Test123456 (must meet requirements)
4. Tap "Sign Up"

### Test Authentication Flow
1. Login with registered credentials
2. Navigate through tabs
3. View profile information
4. Test logout functionality

## 🐛 Troubleshooting

### Cannot connect to backend
- Ensure backend server is running on `http://localhost:3000`
- Check that `DATABASE_URL` is configured in backend `.env`
- For physical devices, use your computer's IP address instead of localhost
- Ensure firewall allows connections on port 3000

### Expo Go connection issues
- Make sure phone and computer are on the same WiFi network
- Try restarting the Expo development server
- Clear Expo Go app cache

### Module not found errors
```bash
npm install
# or
npx expo install
```

## 📝 Next Steps

### Planned Features
- [ ] Complete Diary screen with full CRUD operations
- [ ] Complete Activities screen with filtering and search
- [ ] Add mood visualization charts
- [ ] Implement scheduled activities calendar
- [ ] Add activity reminders/notifications
- [ ] Mood trends and analytics
- [ ] Export diary data
- [ ] Dark mode support

### Development Tasks
1. Build diary entry form and list view
2. Implement activity browsing and filtering
3. Create mood visualization components
4. Add calendar view for scheduled activities
5. Implement push notifications
6. Add data export functionality

## 🤝 Contributing

This is a learning project for mental health app development. Feel free to explore and extend the functionality!

## 📚 Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Behavioural Activation Therapy](https://en.wikipedia.org/wiki/Behavioral_activation)

## 🎯 Project Goals

This app aims to:
- Help users track their daily activities and mood
- Encourage engagement in meaningful activities
- Provide insights into activity-mood relationships
- Support mental health through structured self-monitoring
- Make Behavioural Activation therapy principles accessible

---

**Made with ❤️ for mental health awareness**
