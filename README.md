# Dish Poll Application

A React-based dish polling application where users can vote for their favorite dishes and view real-time results with interactive visualizations.

## Features

- 🍽️ **Dish Voting System**
  - Select top 3 favorite dishes
  - Point system (30/20/10 points for 1st/2nd/3rd)
  - Edit votes anytime
  - Clear all selections option

- 📊 **Results Visualization**
  - Interactive bar graph showing points distribution
  - Detailed list view of all dishes
  - Real-time updates
  - User's selections highlighted

- 🔐 **User Management**
  - User authentication
  - Persistent voting data
  - Individual user rankings

- 🎨 **Modern UI/UX**
  - Responsive design
  - Clean and intuitive interface
  - Loading states
  - Error handling
  - Smooth animations

## Tech Stack

- React.js
- Redux Toolkit
- Tailwind CSS
- Recharts
- Axios
- Local Storage
- React Router DOM

## Live Demo

- View Live Application : https://dish-poll-result.netlify.app/

## Project Structure

```
dish-poll/
├── src/
│   ├── components/ 
│   │   └── Navbar.jsx
│   │   ├── BarGraph.jsx
│   │   └── DishList.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Voting.jsx
│   │   └── Results.jsx
│   │
│   ├── redux/
│   │   ├── slices/
│   │   │   ├── AuthSlice.jsx
│   │   │   └── DishSlice.jsx
│   │   └── store.js
│   │
│   ├── data/
│   │   └── users.json
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │   └── ProtectedRoutes.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── public/
│   ├── index.html
│   └── assets/
│
├── package.json
└── README.md
```

## Component Overview

### Pages
- **Home.jsx**: Landing page with feature overview and navigation
- **Login.jsx**: User authentication page
- **Voting.jsx**: Main voting interface for dish selection
- **Results.jsx**: Results display with charts and rankings

### Components
- **Navbar.jsx**: Navigation bar with authentication-aware menu
- **BarGraph.jsx**: Interactive chart for results visualization
- **DishList.jsx**: List view of dishes with rankings

### Redux
- **AuthSlice.jsx**: Authentication state management
- **DishSlice.jsx**: Dish data and voting state management

## Setup and Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dish-poll
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Deployment on Netlify

1. **Create a Netlify account**
   - Go to [Netlify](https://www.netlify.com/)
   - Sign up or log in

2. **Deploy from Git**
   - Click "New site from Git"
   - Choose your Git provider
   - Select your repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

3. **Environment Variables (if needed)**
   - Go to Site settings > Build & deploy > Environment
   - Add any required environment variables

4. **Custom Domain (Optional)**
   - Go to Domain settings
   - Add your custom domain
   - Follow Netlify's DNS configuration instructions

## API Integration

The application fetches dish data from:
```
https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Dish data provided by Syook
- Icons and images from various sources
- Community support and feedback
