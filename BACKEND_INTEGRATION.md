# Backend Integration Guide for FAANGify

This guide explains how to integrate the Flask backend with your React frontend.

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd backend

# Run setup script (macOS/Linux)
chmod +x setup.sh
./setup.sh

# Or manually:
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
```

### 2. Start MongoDB

**macOS (Homebrew):**
```bash
brew services start mongodb-community
```

**Ubuntu/Debian:**
```bash
sudo systemctl start mongodb
```

**Windows:**
```bash
net start MongoDB
```

**Using Docker:**
```bash
cd backend
docker-compose up -d
```

### 3. Start Backend Server

```bash
cd backend
source venv/bin/activate  # Activate virtual environment
python app.py
```

Server will run at: `http://localhost:5000`

### 4. Configure Frontend

Create `.env` file in your frontend root:

```env
VITE_API_URL=http://localhost:5000/api
```

## 📝 Migrating from localStorage to Backend

### Before (localStorage):
```typescript
// Old way
const userData = {
  name: 'John',
  email: 'john@example.com',
  // ...
};
localStorage.setItem('faang-user-auth', JSON.stringify(userData));
```

### After (Backend API):
```typescript
// New way
import { authAPI } from './utils/api';

const handleRegister = async (userData) => {
  try {
    const response = await authAPI.register(userData);
    setUser(response.user);
    setIsAuthenticated(true);
  } catch (error) {
    console.error('Registration failed:', error.message);
  }
};
```

## 🔄 API Integration Examples

### 1. Authentication

```typescript
import { authAPI } from './utils/api';

// Register
const register = async () => {
  try {
    const response = await authAPI.register({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'SecurePass123!',
      contactMethod: 'email'
    });
    console.log('User registered:', response.user);
    console.log('Token saved automatically');
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// Login
const login = async () => {
  try {
    const response = await authAPI.login({
      email: 'john@example.com',
      password: 'SecurePass123!'
    });
    console.log('Logged in:', response.user);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// Social Login
const socialLogin = async (provider: 'google' | 'github' | 'linkedin') => {
  try {
    const response = await authAPI.socialLogin({
      email: 'john@example.com',
      name: 'John Doe',
      provider: provider,
      avatar: 'https://...'
    });
    console.log('Social login successful:', response.user);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// Get Current User
const getCurrentUser = async () => {
  try {
    const response = await authAPI.getCurrentUser();
    console.log('Current user:', response.user);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// Logout
const logout = () => {
  authAPI.logout();
  setIsAuthenticated(false);
  setUser(null);
};
```

### 2. Progress Tracking

```typescript
import { progressAPI } from './utils/api';

// Record completion
const handleQuestionComplete = async (questionId, code, timeTaken) => {
  try {
    const response = await progressAPI.completeQuestion({
      question_id: questionId,
      code: code,
      time_taken: timeTaken,
      language: 'python'
    });
    console.log('Progress saved, XP earned:', response.xp_earned);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// Get progress
const fetchProgress = async () => {
  try {
    const response = await progressAPI.getProgress();
    setProgress(response.progress);
    setStats(response.stats);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// Get stats
const fetchStats = async () => {
  try {
    const response = await progressAPI.getStats();
    setUserStats(response.user_stats);
  } catch (error) {
    console.error('Error:', error.message);
  }
};
```

### 3. Bookmarks

```typescript
import { bookmarksAPI } from './utils/api';

// Add bookmark
const addBookmark = async (questionId) => {
  try {
    const response = await bookmarksAPI.addBookmark({
      question_id: questionId,
      notes: 'Important question',
      tags: ['arrays', 'medium']
    });
    console.log('Bookmark added:', response.bookmark);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// Get all bookmarks
const fetchBookmarks = async () => {
  try {
    const response = await bookmarksAPI.getBookmarks();
    setBookmarks(response.bookmarks);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// Remove bookmark
const removeBookmark = async (bookmarkId) => {
  try {
    await bookmarksAPI.removeBookmark(bookmarkId);
    console.log('Bookmark removed');
  } catch (error) {
    console.error('Error:', error.message);
  }
};
```

### 4. Study Notes

```typescript
import { studyNotesAPI } from './utils/api';

// Create note
const createNote = async () => {
  try {
    const response = await studyNotesAPI.createNote({
      title: 'Two Pointer Technique',
      content: 'Use two pointers to solve array problems...',
      category: 'DSA',
      tags: ['arrays', 'pointers']
    });
    console.log('Note created:', response.note);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// Get all notes
const fetchNotes = async () => {
  try {
    const response = await studyNotesAPI.getNotes();
    setNotes(response.notes);
  } catch (error) {
    console.error('Error:', error.message);
  }
};
```

### 5. Flashcards

```typescript
import { flashcardsAPI } from './utils/api';

// Create deck
const createDeck = async () => {
  try {
    const response = await flashcardsAPI.createDeck({
      name: 'Data Structures',
      description: 'Common data structures and their operations',
      category: 'DSA'
    });
    console.log('Deck created:', response.deck);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// Create card
const createCard = async (deckId) => {
  try {
    const response = await flashcardsAPI.createCard({
      deck_id: deckId,
      front: 'What is the time complexity of binary search?',
      back: 'O(log n)'
    });
    console.log('Card created:', response.card);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// Review card (spaced repetition)
const reviewCard = async (cardId, quality) => {
  try {
    const response = await flashcardsAPI.reviewCard(cardId, quality);
    console.log('Next review:', response.next_review);
  } catch (error) {
    console.error('Error:', error.message);
  }
};
```

## 🔧 Updating Your Components

### Example: Update AuthPage Component

```typescript
// Before
const handleAuthSuccess = (userData: any) => {
  setIsAuthenticated(true);
  setUser(userData);
  localStorage.setItem('faang-user-auth', JSON.stringify({
    isAuthenticated: true,
    user: userData
  }));
};

// After
import { authAPI } from '../utils/api';

const handleLogin = async (credentials) => {
  setIsLoading(true);
  try {
    const response = await authAPI.login(credentials);
    setIsAuthenticated(true);
    setUser(response.user);
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
};
```

### Example: Update Progress Tracking

```typescript
// Before
const saveProgress = (newProgress: any) => {
  setUserProgress(newProgress);
  localStorage.setItem('faang-interview-progress', JSON.stringify(newProgress));
};

// After
import { progressAPI } from '../utils/api';

const handleQuestionComplete = async (questionId, code, timeTaken) => {
  try {
    await progressAPI.completeQuestion({
      question_id: questionId,
      code: code,
      time_taken: timeTaken
    });
    
    // Fetch updated progress
    const response = await progressAPI.getProgress();
    setUserProgress(response.progress);
  } catch (error) {
    console.error('Failed to save progress:', error.message);
  }
};
```

## 🐛 Debugging

### Test Backend Connection

```typescript
import { healthCheck } from './utils/api';

const testConnection = async () => {
  try {
    const response = await healthCheck();
    console.log('Backend status:', response);
  } catch (error) {
    console.error('Backend is not reachable:', error.message);
  }
};
```

### Common Issues

**1. CORS Error:**
- Make sure backend CORS is configured for your frontend URL
- Check `.env` file: `CORS_ORIGINS=http://localhost:3000,http://localhost:5173`

**2. 401 Unauthorized:**
- Token might be expired or invalid
- Call `authAPI.logout()` and login again

**3. Connection Refused:**
- Make sure backend server is running on port 5000
- Check MongoDB is running

**4. MongoDB Connection Error:**
```bash
# Check if MongoDB is running
mongosh  # or mongo

# Start MongoDB
brew services start mongodb-community  # macOS
sudo systemctl start mongodb           # Linux
net start MongoDB                      # Windows
```

## 🔒 Security Best Practices

1. **Never commit `.env` file**
2. **Use strong JWT secret keys in production**
3. **Enable HTTPS in production**
4. **Validate all user inputs**
5. **Use environment variables for sensitive data**

## 📦 Production Deployment

### Using Docker

```bash
cd backend
docker-compose up -d
```

### Environment Variables for Production

```env
FLASK_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
JWT_SECRET_KEY=your-super-secret-production-key
SECRET_KEY=your-flask-secret-production-key
CORS_ORIGINS=https://your-frontend-domain.com
```

## 📊 Database Management

### View Data in MongoDB

```bash
mongosh
use faangify
db.users.find().pretty()
db.progress.find().pretty()
db.bookmarks.find().pretty()
```

### Backup Database

```bash
mongodump --db faangify --out ./backup
```

### Restore Database

```bash
mongorestore --db faangify ./backup/faangify
```

## 🎯 Next Steps

1. ✅ Set up backend and MongoDB
2. ✅ Test API endpoints with Postman/cURL
3. 🔄 Replace localStorage calls with API calls
4. 🔄 Add error handling and loading states
5. 🔄 Test all features end-to-end
6. 🚀 Deploy to production

## 📚 Additional Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT Best Practices](https://jwt.io/introduction)
- [Flask-JWT-Extended](https://flask-jwt-extended.readthedocs.io/)

## 💬 Support

For issues or questions:
1. Check logs: `python app.py` (backend logs)
2. Test endpoints with Postman
3. Review MongoDB data
4. Check browser console for frontend errors

---

**Happy Coding! 🚀**
