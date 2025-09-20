# 🛡️ Nirbhaya - Women's Safety App

A comprehensive Next.js web application designed to enhance women's safety with emergency SOS functionality, trusted contacts management, and safety resources.

## ✨ Features

### 🚨 Emergency SOS
- One-tap SOS button to instantly send alerts
- Sends Google Maps link with live location
- Choose specific trusted contacts to notify
- Includes personal info (Name, Blood Group, Phone, DOB) in the alert
- WhatsApp integration for direct sharing

### 📇 Trusted Contacts
- Add, edit, or delete emergency contacts
- Fully functional CRUD interface with smooth UI
- Stores contact data in local storage
- Mark contacts as emergency contacts for SOS alerts

### 🏠 Personal Dashboard
- Displays user info like Email, Blood Group, Phone, DOB
- User can edit profile info directly on the Home screen
- Data is stored in local storage
- Quick access to app statistics

### 📰 Articles for Awareness
- Fetches real-time news related to women's safety, laws, and tragedies
- Uses free public API with filters
- Images and headlines displayed in a card view
- Safety tips and resources

### 👤 Authentication
- Signup and Login screens
- Sign up collects all info shown on the dashboard
- User ID derived from email prefix
- Profile image shown in top navigation

### 🌐 Smooth Navigation
- Custom bottom tab navigation with:
  - 🏠 Home
  - 📇 Contacts
  - 📰 Articles
  - 👤 Profile
- Middle button is a prominent SOS shortcut

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nirbhaya-web-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env.local file
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API
- **Storage**: Local Storage
- **Location Services**: Browser Geolocation API
- **News API**: NewsAPI.org

## 📱 Features in Detail

### Emergency SOS System
- **Location Sharing**: Automatically captures and shares current location
- **WhatsApp Integration**: Sends formatted messages to emergency contacts
- **Personal Information**: Includes user details for quick identification
- **Visual Feedback**: Animated SOS button with loading states

### Contact Management
- **CRUD Operations**: Full create, read, update, delete functionality
- **Emergency Marking**: Distinguish between regular and emergency contacts
- **Local Storage**: Data persists across browser sessions
- **Validation**: Form validation for phone numbers and required fields

### News & Awareness
- **Real-time Updates**: Fetches latest women's safety news
- **Fallback Content**: Mock data when API is unavailable
- **Responsive Design**: Optimized for mobile viewing
- **External Links**: Opens articles in new tabs

### User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Hover effects and transitions
- **Loading States**: Visual feedback during data operations
- **Error Handling**: Graceful error messages and recovery

## 🔧 Configuration

### News API Setup
1. Get a free API key from [NewsAPI.org](https://newsapi.org/)
2. Add it to your `.env.local` file:
```
NEXT_PUBLIC_NEWS_API_KEY=your_api_key_here
```

### Location Services
The app uses browser geolocation API. Make sure to:
- Allow location permissions when prompted
- Use HTTPS in production for location services
- Test on actual devices for best results

## 📦 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── login/             # Authentication pages
│   ├── signup/
│   ├── contacts/          # Contacts management
│   ├── articles/          # News articles
│   ├── profile/           # User profile
│   └── page.tsx           # Home dashboard
├── components/            # Reusable components
│   ├── AppLayout.tsx      # Main app layout
│   ├── BottomNavigation.tsx
│   └── SOSButton.tsx
├── contexts/              # React contexts
│   ├── AuthContext.tsx    # Authentication state
│   └── ContactsContext.tsx # Contacts state
├── types/                 # TypeScript definitions
│   └── index.ts
└── utils/                 # Utility functions
    ├── location.ts        # Location services
    ├── whatsapp.ts        # WhatsApp integration
    └── news.ts           # News API
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Heroku

## 🔒 Privacy & Security

- **Local Storage**: All data is stored locally on the user's device
- **No Backend**: No data is sent to external servers except for news API
- **Location Privacy**: Location is only shared during SOS alerts
- **Secure**: Uses HTTPS for location services and external APIs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- NewsAPI.org for providing free news data
- Lucide React for beautiful icons
- Tailwind CSS for utility-first styling
- Next.js team for the amazing framework

## 📞 Support

For support or questions, please open an issue in the repository.

---

**Stay Safe, Stay Strong! 💪**