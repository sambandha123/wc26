import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import MatchResolveModal from '../components/MatchResolveModal';

const Admin = () => {
  const { user } = useContext(AuthContext);
  const [predictions, setPredictions] = useState([]);
  const [matches, setMatches] = useState([]);
  const [selectedMatchToResolve, setSelectedMatchToResolve] = useState(null);

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      fetchPredictions();
      fetchMatches();
    }
  }, [user]);

  const fetchMatches = async () => {
    try {
      const { data } = await axios.get('/api/matches');
      if (Array.isArray(data)) {
        setMatches(data.filter(m => m.status !== 'FINISHED'));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPredictions = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('/api/predictions', config);
      if (Array.isArray(data)) {
        setPredictions(data);
      } else {
        console.error("API Error: Expected array but got", typeof data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerify = async (id) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`/api/predictions/${id}/verify`, {}, config);
      fetchPredictions();
    } catch (error) {
      alert('Error verifying prediction');
    }
  };

  if (!user || user.role !== 'ADMIN') {
    return <div className="text-center mt-20 text-red-500 glass-card p-8 inline-block mx-auto">Access Denied. Admins only.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-8 px-3 sm:px-4 space-y-6 sm:space-y-8">
      <h2 className="text-2xl sm:text-3xl font-display font-bold text-center text-electric-blue">Admin Dashboard</h2>

      <div className="glass-card p-4 sm:p-8 overflow-x-auto">
        <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 border-b border-white/10 pb-2 text-red-400">Resolve Matches</h3>
        <table className="w-full text-left border-collapse whitespace-nowrap min-w-[600px] mb-8">
          <thead>
            <tr className="border-b border-white/20 text-electric-blue">
              <th className="p-3">Match</th>
              <th className="p-3">Group</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {matches.map(match => (
              <tr key={match.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                <td className="p-3 font-semibold">{match.team_a} vs {match.team_b}</td>
                <td className="p-3 text-gray-400">{match.group_name}</td>
                <td className="p-3">
                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400">
                    {match.status}
                  </span>
                </td>
                <td className="p-3">
                  <button onClick={() => setSelectedMatchToResolve(match)} className="btn-primary py-1 px-3 text-sm bg-red-600 hover:bg-red-700">Resolve Match</button>
                </td>
              </tr>
            ))}
            {matches.length === 0 && (
              <tr><td colSpan="4" className="p-6 text-center text-gray-400">All matches have been resolved.</td></tr>
            )}
          </tbody>
        </table>

        <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 border-b border-white/10 pb-2">Recent Predictions & Payments</h3>
        <table className="w-full text-left border-collapse whitespace-nowrap min-w-[600px]">
          <thead>
            <tr className="border-b border-white/20 text-electric-blue">
              <th className="p-3">User</th>
              <th className="p-3">Match</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Receipt</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map(pred => (
              <tr key={pred.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                <td className="p-3">{pred.user?.name}</td>
                <td className="p-3">{pred.match?.team_a} vs {pred.match?.team_b}</td>
                <td className="p-3">{pred.payment?.method} ({pred.payment?.transaction_id})</td>
                <td className="p-3">
                  {pred.payment?.screenshot_url && (
                    <a href={`${pred.payment.screenshot_url}`} target="_blank" rel="noreferrer" className="text-electric-blue hover:underline">View</a>
                  )}
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${pred.status === 'VERIFIED' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {pred.status}
                  </span>
                </td>
                <td className="p-3">
                  {pred.status === 'PENDING' && (
                    <button onClick={() => handleVerify(pred.id)} className="btn-primary py-1 px-3 text-sm">Verify</button>
                  )}
                </td>
              </tr>
            ))}
            {predictions.length === 0 && (
              <tr><td colSpan="6" className="p-6 text-center text-gray-400">No predictions found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedMatchToResolve && (
        <MatchResolveModal 
          match={selectedMatchToResolve} 
          onClose={() => setSelectedMatchToResolve(null)} 
          onSuccess={() => { setSelectedMatchToResolve(null); fetchMatches(); }} 
        />
      )}
    </div>
  );
};

export default Admin;
