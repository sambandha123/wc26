import { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const PredictionModal = ({ match, onClose }) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    first_center: '', first_corner: '', first_scorer: '',
    score_a: 0, score_b: 0, yellow_cards: 0, red_cards: 0, winner: '',
    transaction_id: '', method: 'ESEWA'
  });
  const [screenshot, setScreenshot] = useState(null);
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
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      data.append('match_id', match.id);
      if (screenshot) data.append('screenshot', screenshot);

      const config = { headers: { Authorization: `Bearer ${user.token}`, 'Content-Type': 'multipart/form-data' } };
      await axios.post('/api/predictions', data, config);
      setMessage('Prediction submitted successfully! Pending admin approval.');
      setTimeout(onClose, 2000);
    } catch (error) {
      setMessage('Error submitting prediction.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex justify-center items-start sm:items-center bg-black/80 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }}
          className="bg-navy-900 border border-electric-blue/30 rounded-2xl p-4 sm:p-6 lg:p-8 w-full max-w-4xl my-4 sm:my-8 relative shadow-[0_0_50px_rgba(0,240,255,0.15)]"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl font-light leading-none">&times;</button>

          <h2 className="text-2xl sm:text-3xl font-display font-bold text-center mb-2">Make Prediction</h2>
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <img src={match.team_a_logo} alt={match.team_a} className="w-8 h-5 sm:w-10 sm:h-6 object-cover rounded shadow border border-white/10 flex-shrink-0" />
            <p className="text-center text-gold font-semibold text-base sm:text-xl tracking-wide">{match.team_a} vs {match.team_b}</p>
            <img src={match.team_b_logo} alt={match.team_b} className="w-8 h-5 sm:w-10 sm:h-6 object-cover rounded shadow border border-white/10 flex-shrink-0" />
          </div>

          {message && <div className="mb-6 bg-electric-blue/20 text-electric-blue p-3 sm:p-4 rounded-lg border border-electric-blue/50 text-center text-base sm:text-lg">{message}</div>}

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
              {/* Prediction Section */}
              <div className="space-y-4 sm:space-y-5">
                <h3 className="text-lg sm:text-xl font-bold border-b border-white/10 pb-2 sm:pb-3 text-electric-blue flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse"></span> Match Events
                </h3>
                <select name="first_center" required onChange={handleChange} className="glass-input text-white bg-navy-900 border-electric-blue/50 focus:border-electric-blue py-2.5 sm:py-3 text-sm sm:text-base w-full">
                  <option value="">Select team to start from center</option>
                  <option value={match.team_a}>{match.team_a}</option>
                  <option value={match.team_b}>{match.team_b}</option>
                </select>

                <select name="first_corner" required onChange={handleChange} className="glass-input text-white bg-navy-900 border-electric-blue/50 focus:border-electric-blue py-2.5 sm:py-3 text-sm sm:text-base w-full">
                  <option value="">Select team to get first corner</option>
                  <option value={match.team_a}>{match.team_a}</option>
                  <option value={match.team_b}>{match.team_b}</option>
                  <option value="None">None</option>
                </select>

                <select name="first_scorer" required onChange={handleChange} className="glass-input text-white bg-navy-900 border-electric-blue/50 focus:border-electric-blue py-2.5 sm:py-3 text-sm sm:text-base w-full">
                  <option value="">Select first goal scorer</option>
                  <option value={match.team_a}>{match.team_a} (Any Player)</option>
                  <option value={match.team_b}>{match.team_b} (Any Player)</option>
                  <option value="No Goals">No Goals</option>
                </select>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-white/5 p-2 sm:p-3 rounded-lg border border-white/10 flex flex-col items-center">
                    <label className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider text-center mb-1 sm:mb-2 line-clamp-2 min-h-[32px] sm:min-h-[40px] flex items-center">Score {match.team_a}</label>
                    <input type="number" name="score_a" min="0" required onChange={handleChange} className="w-full bg-transparent text-2xl sm:text-3xl font-bold text-center focus:outline-none" defaultValue={0} />
                  </div>
                  <div className="bg-white/5 p-2 sm:p-3 rounded-lg border border-white/10 flex flex-col items-center">
                    <label className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider text-center mb-1 sm:mb-2 line-clamp-2 min-h-[32px] sm:min-h-[40px] flex items-center">Score {match.team_b}</label>
                    <input type="number" name="score_b" min="0" required onChange={handleChange} className="w-full bg-transparent text-2xl sm:text-3xl font-bold text-center focus:outline-none" defaultValue={0} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <input type="number" name="yellow_cards" placeholder="Yellow Cards" required onChange={handleChange} className="glass-input py-2.5 sm:py-3 text-sm sm:text-base w-full" />
                  <input type="number" name="red_cards" placeholder="Red Cards" required onChange={handleChange} className="glass-input py-2.5 sm:py-3 text-sm sm:text-base w-full" />
                </div>

                <select name="winner" required onChange={handleChange} className="glass-input text-white bg-navy-900 border-electric-blue/50 focus:border-electric-blue py-2.5 sm:py-3 text-sm sm:text-base">
                  <option value="">Select Winner</option>
                  <option value={match.team_a}>{match.team_a}</option>
                  <option value={match.team_b}>{match.team_b}</option>
                  <option value="Draw">Draw</option>
                </select>
              </div>

              {/* Payment Section */}
              <div className="space-y-4 sm:space-y-5">
                <h3 className="text-lg sm:text-xl font-bold border-b border-white/10 pb-2 sm:pb-3 text-gold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold"></span> Payment Verification
                </h3>
                <div className="bg-gradient-to-br from-white/10 to-transparent p-4 sm:p-5 rounded-xl border border-white/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                  <p className="text-gray-300 text-sm sm:text-base">Entry Fee: <strong className="text-xl sm:text-2xl text-gold ml-2">रु 200</strong></p>
                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-400 leading-relaxed">Scan the QR code below and upload your transaction receipt to secure your prediction.</p>

                  <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white/10 mx-auto mt-4 sm:mt-6 rounded-xl flex items-center justify-center border border-white/20 shadow-inner overflow-hidden relative">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAwaDEwdjEwaC0xMHptMjAgMGgxMHYxMGgtMTB6bTIwIDBoMTB2MTBoLTEwem0wIDIwaDEwdjEwaC0xMHptLTIwIDBoMTB2MTBoLTEwem0tMjAgMGgxMHYxMGgtMTB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiPjwvcGF0aD4KPC9zdmc+')] opacity-50"></div>
                    <span className="text-white/40 font-semibold tracking-widest relative z-10 text-xs sm:text-sm">QR CODE</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <select name="method" onChange={handleChange} className="glass-input text-white bg-navy-900 border-gold/30 focus:border-gold py-2.5 sm:py-3 text-sm sm:text-base">
                    <option value="ESEWA">eSewa</option>
                    <option value="KHALTI">Khalti</option>
                    <option value="BANK">Bank Transfer</option>
                  </select>
                  <input name="transaction_id" placeholder="Transaction ID" required onChange={handleChange} className="glass-input border-gold/30 focus:border-gold py-2.5 sm:py-3 text-sm sm:text-base" />
                </div>

                <div className="bg-white/5 p-3 sm:p-4 rounded-xl border border-white/10">
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2 sm:mb-3">Upload Receipt Screenshot</label>
                  <input type="file" accept="image/*" required onChange={e => setScreenshot(e.target.files[0])} className="w-full text-xs sm:text-sm text-gray-400 file:mr-3 sm:file:mr-4 file:py-2 file:px-3 sm:file:py-2.5 sm:file:px-5 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-bold file:bg-gold file:text-navy-900 hover:file:bg-gold-hover file:transition-colors file:cursor-pointer cursor-pointer" />
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-gold w-full py-3 sm:py-4 text-lg sm:text-xl mt-6 sm:mt-8 shadow-[0_0_30px_rgba(255,215,0,0.4)] hover:shadow-[0_0_40px_rgba(255,215,0,0.6)] rounded-xl uppercase tracking-widest transition-all hover:scale-[1.02]">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-navy-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Processing...
                </span>
              ) : 'Confirm Prediction'}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PredictionModal;
