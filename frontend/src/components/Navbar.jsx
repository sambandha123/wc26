import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFutbol, FaUserCircle, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
    >
      <div className="container mx-auto glass-card rounded-2xl px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center">
        {/* Brand & Toggle */}
        <div className="w-full flex justify-between items-center">
          <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 group">
            <FaFutbol className="text-3xl text-electric-blue group-hover:rotate-180 transition-transform duration-700" />
            <span className="text-2xl font-display font-bold tracking-wider text-white">WC26 <span className="text-electric-blue">BET</span></span>
          </Link>
          
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-gray-300 hover:text-white focus:outline-none text-2xl transition-colors p-1"
            aria-label="Toggle Navigation"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex space-x-8">
            <Link to="/matches" className="text-gray-300 hover:text-electric-blue transition-colors font-medium">Matches</Link>
            <Link to="/groups" className="text-gray-300 hover:text-electric-blue transition-colors font-medium">Groups</Link>
            <Link to="/leaderboard" className="text-gray-300 hover:text-electric-blue transition-colors font-medium">Leaderboard</Link>
          </div>
          
          {user ? (
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/20">
              <Link to="/profile" className="flex items-center gap-2 text-gold hover:text-gold-hover transition-colors font-semibold">
                <FaUserCircle className="text-xl" />
                <span className="whitespace-nowrap">{user.name}</span>
              </Link>
              <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-white whitespace-nowrap">
                {user.points} pts
              </div>
              {user.role === 'ADMIN' && (
                <Link to="/admin" className="text-xs font-bold tracking-wider uppercase bg-electric-blue/20 text-electric-blue px-3 py-1.5 rounded-lg border border-electric-blue/50 hover:bg-electric-blue/30 transition-colors whitespace-nowrap">Admin</Link>
              )}
              <button onClick={handleLogout} className="text-red-400 hover:text-red-300 transition-colors ml-2" title="Logout">
                <FaSignOutAlt className="text-xl" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/20">
              <Link to="/login" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-medium">
                <FaSignInAlt /> Login
              </Link>
              <Link to="/register" className="btn-primary flex items-center gap-2 py-2 px-4 rounded-lg text-sm">
                <FaUserPlus /> Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full md:hidden mt-4 pt-4 border-t border-white/10 flex flex-col gap-4 overflow-hidden"
            >
              <Link to="/matches" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-electric-blue transition-colors font-medium py-2 border-b border-white/5">Matches</Link>
              <Link to="/groups" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-electric-blue transition-colors font-medium py-2 border-b border-white/5">Groups</Link>
              <Link to="/leaderboard" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-electric-blue transition-colors font-medium py-2 border-b border-white/5">Leaderboard</Link>
              
              {user ? (
                <div className="flex flex-col gap-4 pt-2">
                  <div className="flex justify-between items-center py-2 bg-white/5 px-4 rounded-xl border border-white/10">
                    <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-gold hover:text-gold-hover transition-colors font-semibold">
                      <FaUserCircle className="text-xl" />
                      <span>{user.name}</span>
                    </Link>
                    <span className="bg-electric-blue/20 text-electric-blue border border-electric-blue/30 px-3 py-1 rounded-full text-xs font-bold">{user.points} pts</span>
                  </div>
                  {user.role === 'ADMIN' && (
                    <Link to="/admin" onClick={() => setIsOpen(false)} className="text-center py-2.5 rounded-lg bg-electric-blue/20 text-electric-blue border border-electric-blue/30 text-sm font-semibold uppercase tracking-wider">Admin Panel</Link>
                  )}
                  <button onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full py-2.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 flex items-center justify-center gap-2 font-medium">
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 pt-2">
                  <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 text-gray-300 hover:text-white py-2.5 border border-white/10 rounded-lg font-medium transition-colors">
                    <FaSignInAlt /> Login
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="btn-primary flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm">
                    <FaUserPlus /> Register
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
