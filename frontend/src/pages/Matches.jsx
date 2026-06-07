import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import PredictionModal from '../components/PredictionModal';
import { AuthContext } from '../context/AuthContext';

const Matches = () => {
  const { user } = useContext(AuthContext);
  const [matches, setMatches] = useState([]);
  const [myPredictions, setMyPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const { data } = await axios.get('/api/matches');
        if (Array.isArray(data)) {
          setMatches(data);
        } else {
          console.error("API Error: Expected array but got", typeof data);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    const fetchMyPredictions = async () => {
      if (!user) return;
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('/api/predictions/my', config);
        if (Array.isArray(data)) {
          setMyPredictions(data);
        }
      } catch (error) {
        console.error("Failed to fetch my predictions", error);
      }
    };

    fetchMatches();
    fetchMyPredictions();
  }, [user]);

  // Handle when a new prediction is made in the modal
  const handlePredictionSuccess = () => {
    setSelectedMatch(null);
    if (user) {
      // Re-fetch my predictions to update the UI
      axios.get('/api/predictions/my', { headers: { Authorization: `Bearer ${user.token}` } })
        .then(res => setMyPredictions(res.data))
        .catch(err => console.error(err));
    }
  };

  if (loading) return <div className="text-center mt-20 text-electric-blue text-xl font-display">Loading matches...</div>;

  return (
    <div className="py-6 sm:py-8 max-w-7xl mx-auto px-3 sm:px-4">
      <h2 className="text-3xl sm:text-4xl font-display font-bold text-center mb-2 sm:mb-4 text-electric-blue drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
        Tournament Fixtures
      </h2>
      <p className="text-center text-sm sm:text-base text-gray-400 mb-8 sm:mb-12">Make predictions on the latest World Cup 2026 matches</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match, index) => {
          const dateObj = new Date(match.match_time);
          const formattedDate = dateObj.toLocaleDateString('en-US', { timeZone: 'Asia/Kathmandu', weekday: 'short', month: 'short', day: 'numeric' });
          const formattedTime = dateObj.toLocaleTimeString('en-US', { timeZone: 'Asia/Kathmandu', hour: '2-digit', minute: '2-digit', hour12: false });
          const predictedRecord = myPredictions.find(p => p.match_id === match.id);

          return (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index % 10) * 0.05 }}
              className="glass-card overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300 border-white/5 hover:border-electric-blue/30 shadow-lg hover:shadow-[0_8px_30px_rgba(0,240,255,0.1)]"
            >
              {/* Header */}
              <div className="bg-black/40 border-b border-white/5 px-4 sm:px-5 py-3 flex justify-between items-center text-xs font-semibold text-gray-400 tracking-wider">
                <div className="flex items-center gap-2">
                  <span className="text-electric-blue font-bold">GROUP {match.group_name}</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-300">{formattedDate}</span>
                </div>
                <div className={`px-2 py-1 rounded bg-white/5 ${match.status === 'LIVE' ? 'text-red-500 animate-pulse border border-red-500/30' : 'text-gray-300'}`}>
                  {match.status === 'UPCOMING' ? formattedTime : match.status}
                </div>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center gap-4 sm:gap-5 relative">
                {/* Background VS Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                  <span className="text-8xl font-display font-black italic">VS</span>
                </div>

                {/* Team A */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3 sm:gap-4 overflow-hidden mr-2">
                    <img src={match.team_a_logo} alt={match.team_a} className="w-10 h-6 sm:w-12 sm:h-8 rounded object-cover border border-white/10 shadow-md flex-shrink-0" />
                    <span className="font-display font-bold text-base sm:text-lg text-white tracking-wide truncate">{match.team_a}</span>
                  </div>
                  {match.status !== 'UPCOMING' && (
                    <span className="text-xl sm:text-2xl font-bold text-gold flex-shrink-0">{match.score_a}</span>
                  )}
                </div>

                {/* Team B */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3 sm:gap-4 overflow-hidden mr-2">
                    <img src={match.team_b_logo} alt={match.team_b} className="w-10 h-6 sm:w-12 sm:h-8 rounded object-cover border border-white/10 shadow-md flex-shrink-0" />
                    <span className="font-display font-bold text-base sm:text-lg text-white tracking-wide truncate">{match.team_b}</span>
                  </div>
                  {match.status !== 'UPCOMING' && (
                    <span className="text-xl sm:text-2xl font-bold text-gold flex-shrink-0">{match.score_b}</span>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 sm:px-5 pb-4 sm:pb-5 mt-auto space-y-4">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 bg-black/20 py-2 rounded-md truncate px-2">
                  <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                  <span className="truncate">{match.stadium}</span>
                </div>
                
                {predictedRecord ? (
                  <button 
                    disabled
                    className={`w-full py-2.5 sm:py-3 rounded-lg border font-bold tracking-widest uppercase text-sm sm:text-base ${predictedRecord.status === 'VERIFIED' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'}`}
                  >
                    Predicted ({predictedRecord.status})
                  </button>
                ) : (
                  <button 
                    onClick={() => setSelectedMatch(match)} 
                    className="w-full py-2.5 sm:py-3 rounded-lg bg-transparent hover:bg-electric-blue text-electric-blue hover:text-navy-900 border border-electric-blue/50 hover:border-transparent font-bold tracking-widest uppercase transition-all duration-300 text-sm sm:text-base"
                  >
                    {match.status === 'FINISHED' ? 'View Details' : 'Predict Match'}
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {matches.length === 0 && (
        <div className="text-center text-gray-400 glass-card p-12 w-full max-w-2xl mx-auto">
          No matches found. Admin needs to add matches.
        </div>
      )}

      {selectedMatch && (
        <PredictionModal match={selectedMatch} onClose={() => setSelectedMatch(null)} onSuccess={handlePredictionSuccess} />
      )}
    </div>
  );
};

export default Matches;
