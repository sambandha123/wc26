import React, { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const MatchResultsModal = ({ match, onClose }) => {
  const { user } = useContext(AuthContext);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get(`/api/predictions/match/${match.id}`, config);
        setPredictions(data);
      } catch (error) {
        console.error("Error fetching match predictions", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, [match.id, user.token]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex justify-center items-center bg-black/80 backdrop-blur-sm p-3 sm:p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }}
          className="bg-navy-900 border border-electric-blue/30 rounded-2xl p-4 sm:p-6 lg:p-8 w-full max-w-4xl relative shadow-[0_0_50px_rgba(0,240,255,0.15)] flex flex-col max-h-[95vh] md:max-h-[90vh]"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl font-light leading-none z-10">&times;</button>

          <h2 className="text-2xl sm:text-3xl font-display font-bold text-center mb-2 flex-shrink-0 text-electric-blue">Match Results</h2>
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6 flex-shrink-0">
            <img src={match.team_a_logo} alt={match.team_a} className="w-8 h-5 sm:w-10 sm:h-6 object-cover rounded shadow border border-white/10 flex-shrink-0" />
            <p className="text-center text-gold font-semibold text-base sm:text-xl tracking-wide">{match.team_a} vs {match.team_b}</p>
            <img src={match.team_b_logo} alt={match.team_b} className="w-8 h-5 sm:w-10 sm:h-6 object-cover rounded shadow border border-white/10 flex-shrink-0" />
          </div>

          <div className="overflow-y-auto custom-scrollbar flex-1 pr-2 -mr-2 pb-2 space-y-6">
            
            {/* Actual Match Stats */}
            <div className="bg-black/30 p-4 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold mb-3 text-white border-b border-white/10 pb-2">Actual Results</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-400 block text-xs">Final Score</span>
                  <span className="font-bold text-white text-lg">{match.score_a} - {match.score_b}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs">Winner</span>
                  <span className="font-bold text-gold">{match.actual_winner || 'Draw'}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs">First Center</span>
                  <span className="font-semibold text-white">{match.actual_first_center || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs">First Corner</span>
                  <span className="font-semibold text-white">{match.actual_first_corner || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs">First Goal Scorer</span>
                  <span className="font-semibold text-white">{match.actual_first_scorer || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs">🟨 Yellow Cards</span>
                  <span className="font-semibold text-white">{match.team_a}: {match.actual_yellow_cards_a} | {match.team_b}: {match.actual_yellow_cards_b}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-400 block text-xs">🟥 Red Cards</span>
                  <span className="font-semibold text-white">{match.team_a}: {match.actual_red_cards_a} | {match.team_b}: {match.actual_red_cards_b}</span>
                </div>
              </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-black/30 p-4 rounded-xl border border-electric-blue/20">
              <h3 className="text-lg font-bold mb-3 text-electric-blue border-b border-electric-blue/20 pb-2 flex justify-between items-center">
                <span>Prediction Leaderboard</span>
                <span className="text-xs bg-electric-blue/20 text-electric-blue px-2 py-1 rounded">Total Players: {predictions.length}</span>
              </h3>
              
              {loading ? (
                <div className="text-center py-8 text-gray-400">Loading leaderboard...</div>
              ) : predictions.length === 0 ? (
                <div className="text-center py-8 text-gray-400">No verified predictions for this match.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-300">
                    <thead className="text-xs uppercase bg-white/5 text-gray-400">
                      <tr>
                        <th className="px-4 py-3 rounded-tl-lg">Rank</th>
                        <th className="px-4 py-3">Player</th>
                        <th className="px-4 py-3">Predicted Score</th>
                        <th className="px-4 py-3 text-right rounded-tr-lg text-gold">Points Earned</th>
                      </tr>
                    </thead>
                    <tbody>
                      {predictions.map((pred, idx) => (
                        <React.Fragment key={pred.id}>
                          <tr 
                            onClick={() => setExpandedId(expandedId === pred.id ? null : pred.id)}
                            className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                          >
                            <td className="px-4 py-3 font-bold">
                              {idx === 0 ? <span className="text-2xl">🥇</span> : 
                               idx === 1 ? <span className="text-2xl">🥈</span> : 
                               idx === 2 ? <span className="text-2xl">🥉</span> : 
                               <span className="text-gray-500 pl-2">#{idx + 1}</span>}
                            </td>
                            <td className="px-4 py-3 font-semibold text-white">{pred.user.name}</td>
                            <td className="px-4 py-3">{pred.score_a} - {pred.score_b}</td>
                            <td className="px-4 py-3 text-right font-bold text-gold text-base flex items-center justify-end gap-2">
                              {pred.points_earned}
                              <span className="text-gray-500 text-[10px]">{expandedId === pred.id ? '▲' : '▼'}</span>
                            </td>
                          </tr>
                          {expandedId === pred.id && (
                            <tr className="bg-black/40">
                              <td colSpan="4" className="px-4 py-4 border-b border-white/5">
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-gray-300">
                                  <div><span className="text-gray-500 block mb-1">First Center:</span><span className="font-semibold text-white">{pred.first_center}</span></div>
                                  <div><span className="text-gray-500 block mb-1">First Corner:</span><span className="font-semibold text-white">{pred.first_corner}</span></div>
                                  <div><span className="text-gray-500 block mb-1">First Scorer:</span><span className="font-semibold text-white">{pred.first_scorer}</span></div>
                                  <div><span className="text-gray-500 block mb-1">Predicted Winner:</span><span className="font-semibold text-white">{pred.winner}</span></div>
                                  <div><span className="text-gray-500 block mb-1">🟨 Cards {match.team_a}:</span><span className="font-semibold text-white">{pred.yellow_cards_a}</span></div>
                                  <div><span className="text-gray-500 block mb-1">🟨 Cards {match.team_b}:</span><span className="font-semibold text-white">{pred.yellow_cards_b}</span></div>
                                  <div><span className="text-gray-500 block mb-1">🟥 Cards {match.team_a}:</span><span className="font-semibold text-white">{pred.red_cards_a}</span></div>
                                  <div><span className="text-gray-500 block mb-1">🟥 Cards {match.team_b}:</span><span className="font-semibold text-white">{pred.red_cards_b}</span></div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MatchResultsModal;
