import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Matches from './pages/Matches';
import Admin from './pages/Admin';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Groups from './pages/Groups';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col relative overflow-hidden">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8 relative pt-24">
            <Routes>
              <Route path="/" element={<div className="flex flex-col"><div className="text-center mt-6 sm:mt-10 mb-4 max-w-4xl mx-auto px-2"><h1 className="text-3xl sm:text-4xl md:text-6xl font-display text-electric-blue drop-shadow-[0_0_15px_rgba(0,240,255,0.6)] font-bold mb-4 uppercase tracking-wider">FIFA 2026 PREDICTOR</h1><p className="mt-4 text-base sm:text-lg md:text-xl text-gray-300">The ultimate premium betting experience</p></div><Matches /></div>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          
          {/* Background Elements */}
          <div className="fixed inset-0 z-[-10] pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric-blue/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px]"></div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
