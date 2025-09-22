# Wanderlust - Social Travel Platform

A fully-featured travel social networking platform built with React, TypeScript, Tailwind CSS, and Supabase. Share your wanderlust with the world!

## Features

### 🌟 Core Features
- **Anonymous Posting**: Anyone can share travel experiences without signing up!
- **Optional Authentication**: Enhanced features with user accounts (Traveler, Guide, Business, etc.)
- **Social Feed**: Share travel experiences, tips, and opportunities
- **Interactive Map**: Discover locations and connect with nearby travelers
- **Community Hub**: Join communities, find opportunities, and attend events
- **Discovery Page**: Explore destinations, guides, and experiences
- **User Profiles**: Complete profile management with stats and posts

### 🚨 Safety Features
- **Emergency Alert System**: Privacy-focused emergency assistance with location obfuscation
- **Panic Mode**: Quick emergency alerts without confirmation
- **Anonymous Help Requests**: Connect with nearby helpers while maintaining privacy

### 🗄️ Database Integration
- **Supabase Backend**: Full database integration for all features
- **Real-time Data**: Live updates for posts, communities, and user interactions
- **Secure API**: Protected routes with user authentication
- **Data Persistence**: All user data, posts, and interactions are stored securely

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase Edge Functions with Hono
- **Database**: Supabase PostgreSQL with Key-Value store
- **Authentication**: Supabase Auth
- **UI Components**: ShadCN/UI
- **Icons**: Lucide React

## Getting Started

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd wanderlust
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Database Schema

The application uses a flexible key-value store with the following data types:

- `user:{userId}` - User profiles and metadata
- `post:{postId}` - Travel posts and experiences
- `community:{communityId}` - Travel communities
- `opportunity:{opportunityId}` - Job opportunities
- `emergency:{alertId}` - Emergency alerts

## API Endpoints

### Authentication
- `POST /auth/signup` - Create new user account
- `POST /auth/signin` - User login

### Posts
- `GET /posts` - Fetch all posts
- `POST /posts` - Create new post

### Communities
- `GET /communities` - Fetch all communities
- `POST /communities` - Create new community

### Emergency
- `POST /emergency-alert` - Send emergency alert

### Profiles
- `GET /profile/:userId` - Get user profile
- `PUT /profile` - Update user profile

## Environment Variables

The following environment variables are automatically configured:
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key

## Live Application

🚀 **Access the live application**: [Wanderlust Live App](https://rbggefhnjtrlkzlzielq.supabase.co)

### How to Use

1. **Start Sharing**: Post travel experiences immediately - no signup required!
2. **Explore**: Browse the social feed and discover travel content
3. **Optional Sign Up**: Create an account for enhanced features and profile management
4. **Connect**: Join communities and connect with fellow travelers
5. **Discover**: Use the map and discovery features to find new destinations
6. **Stay Safe**: Use the emergency alert system when traveling

### Test Accounts

You can create test accounts with different user types:
- **Traveler**: Share experiences and connect with others
- **Travel Guide**: Offer services and share local knowledge
- **Travel Agency**: Post opportunities and promote services
- **Local Business**: Connect with travelers and tourists

## Security & Privacy

- **Location Privacy**: Emergency alerts only share approximate location (300-500m radius)
- **User Authentication**: Secure token-based authentication
- **Data Protection**: All user data is encrypted and securely stored
- **Anonymous Features**: Emergency help requests maintain user anonymity

## Contributing

This is a demonstration project showcasing modern web development practices with React, TypeScript, and Supabase integration.

## License

MIT License - Feel free to use this code for learning and development purposes.