import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaCrown, FaMedal } from 'react-icons/fa';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data } = await axios.get('/api/leaderboard');
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("API Error: Expected array but got", typeof data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) return <div className="text-center mt-20 text-electric-blue">Loading leaderboard...</div>;

  const getRankBadge = (index) => {
    if (index === 0) return <FaCrown className="text-gold text-2xl drop-shadow-md" />;
    if (index === 1) return <FaMedal className="text-gray-300 text-2xl" />;
    if (index === 2) return <FaMedal className="text-amber-600 text-2xl" />;
    return <span className="font-bold text-gray-500 w-6 inline-block text-center">{index + 1}</span>;
  };

  const getRowClass = (index) => {
    if (index === 0) return 'bg-gradient-to-r from-gold/20 to-transparent border-l-4 border-gold shadow-[inset_0_0_20px_rgba(255,215,0,0.1)]';
    if (index === 1) return 'bg-gradient-to-r from-gray-300/10 to-transparent border-l-4 border-gray-300';
    if (index === 2) return 'bg-gradient-to-r from-amber-600/10 to-transparent border-l-4 border-amber-600';
    return 'hover:bg-white/5 border-l-4 border-transparent hover:border-electric-blue transition-colors';
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 px-3 sm:px-4">
      <h2 className="text-3xl sm:text-4xl font-display font-bold text-center mb-2 sm:mb-4 text-electric-blue drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">Global Leaderboard</h2>
      <p className="text-center text-sm sm:text-base text-gray-400 mb-8 sm:mb-12">Top predictors for FIFA World Cup 2026</p>
      
      <div className="glass-card overflow-hidden">
        {users.map((user, index) => (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            key={user.id}
            className={`flex items-center justify-between p-3 sm:p-4 border-b border-white/5 ${getRowClass(index)}`}
          >
            <div className="flex items-center gap-2 sm:gap-4 overflow-hidden mr-2">
              <div className="w-8 h-8 sm:w-12 sm:h-12 flex-shrink-0 flex items-center justify-center">
                {getRankBadge(index)}
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-navy-900 border border-white/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-bold text-gray-400 text-sm sm:text-base">{user.name.charAt(0)}</span>
                )}
              </div>
              <span className={`font-semibold truncate text-sm sm:text-base ${index === 0 ? 'text-gold sm:text-lg' : 'text-white'}`}>{user.name}</span>
            </div>
            
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <span className="text-xl sm:text-2xl font-display font-bold text-electric-blue">{user.points}</span>
              <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">pts</span>
            </div>
          </motion.div>
        ))}
        {users.length === 0 && (
          <div className="p-8 text-center text-gray-400">No users found.</div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
