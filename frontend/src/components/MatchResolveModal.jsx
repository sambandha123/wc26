import { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const MatchResolveModal = ({ match, onClose, onSuccess }) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    actual_first_center: '', actual_first_corner: '', actual_first_scorer: '',
    actual_score_a: 0, actual_score_b: 0,
    actual_yellow_cards_a: 0, actual_yellow_cards_b: 0,
    actual_red_cards_a: 0, actual_red_cards_b: 0,
    actual_winner: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`/api/matches/${match.id}/resolve`, formData, config);
      setMessage('Match resolved successfully! Points distributed.');
      setTimeout(() => {
        if (onSuccess) onSuccess();
        else onClose();
      }, 2000);
    } catch (error) {
      setMessage('Error resolving match.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex justify-center items-center bg-black/80 backdrop-blur-sm p-3 sm:p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }}
          className="bg-navy-900 border border-red-500/50 rounded-2xl p-4 sm:p-6 lg:p-8 w-full max-w-4xl relative shadow-[0_0_50px_rgba(255,0,0,0.15)] flex flex-col max-h-[95vh] md:max-h-[90vh]"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl font-light leading-none z-10">&times;</button>

          <h2 className="text-2xl sm:text-3xl font-display font-bold text-center mb-2 flex-shrink-0 text-red-500">Resolve Match</h2>
          <p className="text-center text-gray-400 mb-4 text-sm">Enter the ACTUAL results of the match to calculate points.</p>
          
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6 flex-shrink-0">
            <img src={match.team_a_logo} alt={match.team_a} className="w-8 h-5 sm:w-10 sm:h-6 object-cover rounded shadow border border-white/10 flex-shrink-0" />
            <p className="text-center text-gold font-semibold text-base sm:text-xl tracking-wide">{match.team_a} vs {match.team_b}</p>
            <img src={match.team_b_logo} alt={match.team_b} className="w-8 h-5 sm:w-10 sm:h-6 object-cover rounded shadow border border-white/10 flex-shrink-0" />
          </div>

          {message && <div className="mb-4 bg-red-500/20 text-red-400 p-3 sm:p-4 rounded-lg border border-red-500/50 text-center text-base sm:text-lg flex-shrink-0">{message}</div>}

          <div className="overflow-y-auto custom-scrollbar flex-1 pr-2 -mr-2 pb-2">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-5">
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select name="actual_first_center" required onChange={handleChange} className="glass-input text-white bg-navy-900 border-red-500/50 focus:border-red-500 py-2.5 sm:py-3 text-sm sm:text-base w-full">
                    <option value="">First to Center</option>
                    <option value={match.team_a}>{match.team_a}</option>
                    <option value={match.team_b}>{match.team_b}</option>
                  </select>

                  <select name="actual_first_corner" required onChange={handleChange} className="glass-input text-white bg-navy-900 border-red-500/50 focus:border-red-500 py-2.5 sm:py-3 text-sm sm:text-base w-full">
                    <option value="">First Corner</option>
                    <option value={match.team_a}>{match.team_a}</option>
                    <option value={match.team_b}>{match.team_b}</option>
                    <option value="None">None</option>
                  </select>

                  <select name="actual_first_scorer" required onChange={handleChange} className="glass-input text-white bg-navy-900 border-red-500/50 focus:border-red-500 py-2.5 sm:py-3 text-sm sm:text-base w-full">
                    <option value="">First Goal Scorer</option>
                    <option value={match.team_a}>{match.team_a} (Any Player)</option>
                    <option value={match.team_b}>{match.team_b} (Any Player)</option>
                    <option value="No Goals">No Goals</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-red-500/10 p-2 sm:p-3 rounded-lg border border-red-500/20 flex flex-col items-center">
                    <label className="text-[10px] sm:text-xs font-semibold text-gray-300 uppercase tracking-wider text-center mb-1 sm:mb-2 line-clamp-2 min-h-[32px] sm:min-h-[40px] flex items-center">Actual Score {match.team_a}</label>
                    <input type="number" name="actual_score_a" min="0" required onChange={handleChange} className="w-full bg-transparent text-2xl sm:text-3xl font-bold text-center focus:outline-none" defaultValue={0} />
                  </div>
                  <div className="bg-red-500/10 p-2 sm:p-3 rounded-lg border border-red-500/20 flex flex-col items-center">
                    <label className="text-[10px] sm:text-xs font-semibold text-gray-300 uppercase tracking-wider text-center mb-1 sm:mb-2 line-clamp-2 min-h-[32px] sm:min-h-[40px] flex items-center">Actual Score {match.team_b}</label>
                    <input type="number" name="actual_score_b" min="0" required onChange={handleChange} className="w-full bg-transparent text-2xl sm:text-3xl font-bold text-center focus:outline-none" defaultValue={0} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Yellow Cards per team */}
                  <div>
                    <label className="text-xs font-semibold text-yellow-400 uppercase tracking-wider mb-2 block">🟨 Actual Yellow Cards</label>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div className="bg-white/5 p-2 sm:p-3 rounded-lg border border-white/10 flex flex-col items-center">
                        <label className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider text-center mb-1 sm:mb-2 line-clamp-2 min-h-[28px] flex items-center">{match.team_a}</label>
                        <input type="number" name="actual_yellow_cards_a" min="0" required onChange={handleChange} className="w-full bg-transparent text-xl sm:text-2xl font-bold text-center focus:outline-none" defaultValue={0} />
                      </div>
                      <div className="bg-white/5 p-2 sm:p-3 rounded-lg border border-white/10 flex flex-col items-center">
                        <label className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider text-center mb-1 sm:mb-2 line-clamp-2 min-h-[28px] flex items-center">{match.team_b}</label>
                        <input type="number" name="actual_yellow_cards_b" min="0" required onChange={handleChange} className="w-full bg-transparent text-xl sm:text-2xl font-bold text-center focus:outline-none" defaultValue={0} />
                      </div>
                    </div>
                  </div>

                  {/* Red Cards per team */}
                  <div>
                    <label className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2 block">🟥 Actual Red Cards</label>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div className="bg-white/5 p-2 sm:p-3 rounded-lg border border-white/10 flex flex-col items-center">
                        <label className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider text-center mb-1 sm:mb-2 line-clamp-2 min-h-[28px] flex items-center">{match.team_a}</label>
                        <input type="number" name="actual_red_cards_a" min="0" required onChange={handleChange} className="w-full bg-transparent text-xl sm:text-2xl font-bold text-center focus:outline-none" defaultValue={0} />
                      </div>
                      <div className="bg-white/5 p-2 sm:p-3 rounded-lg border border-white/10 flex flex-col items-center">
                        <label className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider text-center mb-1 sm:mb-2 line-clamp-2 min-h-[28px] flex items-center">{match.team_b}</label>
                        <input type="number" name="actual_red_cards_b" min="0" required onChange={handleChange} className="w-full bg-transparent text-xl sm:text-2xl font-bold text-center focus:outline-none" defaultValue={0} />
                      </div>
                    </div>
                  </div>
                </div>

                <select name="actual_winner" required onChange={handleChange} className="glass-input text-white bg-navy-900 border-red-500/50 focus:border-red-500 py-2.5 sm:py-3 text-sm sm:text-base w-full">
                  <option value="">Select Actual Winner</option>
                  <option value={match.team_a}>{match.team_a}</option>
                  <option value={match.team_b}>{match.team_b}</option>
                  <option value="Draw">Draw</option>
                </select>

              </div>

              <button type="submit" disabled={loading} className="w-full py-3 sm:py-4 text-lg sm:text-xl mt-6 sm:mt-8 bg-red-600 hover:bg-red-700 text-white font-bold shadow-[0_0_30px_rgba(255,0,0,0.4)] hover:shadow-[0_0_40px_rgba(255,0,0,0.6)] rounded-xl uppercase tracking-widest transition-all hover:scale-[1.02]">
                {loading ? 'Processing...' : 'Submit Results & Calculate Points'}
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MatchResolveModal;
