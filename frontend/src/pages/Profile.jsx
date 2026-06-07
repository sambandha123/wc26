import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <div className="text-center mt-20">Please login.</div>;

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-8 px-3 sm:px-4">
      <h2 className="text-3xl sm:text-4xl font-display font-bold text-center mb-6 sm:mb-8 text-electric-blue">Your Profile</h2>
      
      <div className="glass-card p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 sm:gap-8 text-center md:text-left">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-navy-900 border-4 border-gold shadow-[0_0_20px_rgba(255,215,0,0.3)] flex items-center justify-center overflow-hidden flex-shrink-0">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl sm:text-5xl font-bold text-gray-400">{user.name.charAt(0)}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl sm:text-2xl font-bold text-white truncate">{user.name}</h3>
          <p className="text-sm sm:text-base text-gray-400 truncate">{user.email}</p>
          <div className="mt-4 inline-block bg-white/10 px-4 sm:px-6 py-2 rounded-lg border border-white/20">
            <span className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider block">Total Points</span>
            <span className="text-2xl sm:text-3xl font-display font-bold text-electric-blue">{user.points}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 glass-card p-6 sm:p-8">
        <h3 className="text-lg sm:text-xl font-bold mb-4 border-b border-white/10 pb-2">Prediction History</h3>
        <p className="text-sm sm:text-base text-gray-400 text-center py-6 sm:py-8">No predictions yet. Head to the matches page to make your first prediction!</p>
      </div>
    </div>
  );
};

export default Profile;
