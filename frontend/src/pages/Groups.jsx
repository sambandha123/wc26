import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Groups = () => {
  const [groups, setGroups] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const { data } = await axios.get('/api/groups');
        if (typeof data === 'object' && !Array.isArray(data) && data !== null) {
          setGroups(data);
        } else {
          console.error("API Error: Expected object but got", typeof data);
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  if (loading) {
    return <div className="text-center mt-20 text-electric-blue text-xl font-display">Loading Group Stages...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:py-8 px-3 sm:px-4">
      <h2 className="text-3xl sm:text-4xl font-display font-bold text-center mb-2 sm:mb-4 text-electric-blue drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
        Group Stage
      </h2>
      <p className="text-center text-sm sm:text-base text-gray-400 mb-8 sm:mb-12">Current standings for the FIFA World Cup 2026</p>

      {/* Changed to 2 columns maximum to give the tables more horizontal space and prevent wrapping */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {Object.keys(groups).map((groupName, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            key={groupName}
            className="glass-card overflow-hidden flex flex-col"
          >
            <div className="bg-white/5 border-b border-white/10 p-4">
              <h3 className="text-2xl font-display font-bold text-white">Group {groupName}</h3>
            </div>
            
            <div className="w-full overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse whitespace-nowrap min-w-[460px]">
                <thead>
                  <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-white/10 bg-black/20">
                    <th className="p-2.5 sm:p-3 font-medium">Team</th>
                    <th className="p-1.5 sm:p-2 font-medium text-center w-10">MP</th>
                    <th className="p-1.5 sm:p-2 font-medium text-center w-10">W</th>
                    <th className="p-1.5 sm:p-2 font-medium text-center w-10">D</th>
                    <th className="p-1.5 sm:p-2 font-medium text-center w-10">L</th>
                    <th className="p-1.5 sm:p-2 font-medium text-center w-10">GF</th>
                    <th className="p-1.5 sm:p-2 font-medium text-center w-10">GA</th>
                    <th className="p-1.5 sm:p-2 font-medium text-center w-10">GD</th>
                    <th className="p-1.5 sm:p-2 font-bold text-white text-center w-12">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {groups[groupName].map((team, tIndex) => (
                    <tr 
                      key={team.id} 
                      className={`
                        border-b border-white/5 hover:bg-white/10 transition-colors text-sm
                        ${tIndex < 2 ? 'border-l-4 border-l-electric-blue bg-electric-blue/5' : 'border-l-4 border-l-transparent'}
                      `}
                    >
                      <td className="p-2.5 sm:p-3 flex items-center gap-2 sm:gap-3">
                        <span className="text-gray-500 font-bold w-4 text-right">{tIndex + 1}</span>
                        <img src={team.flag} alt={team.name} className="w-6 h-4 object-cover rounded shadow-sm border border-white/10 flex-shrink-0" />
                        <span className={`font-semibold truncate max-w-[120px] sm:max-w-none ${tIndex < 2 ? 'text-white' : 'text-gray-300'}`}>{team.name}</span>
                      </td>
                      <td className="p-1.5 sm:p-2 text-center text-gray-300 font-mono text-xs sm:text-sm">{team.mp}</td>
                      <td className="p-1.5 sm:p-2 text-center text-gray-300 font-mono text-xs sm:text-sm">{team.w}</td>
                      <td className="p-1.5 sm:p-2 text-center text-gray-300 font-mono text-xs sm:text-sm">{team.d}</td>
                      <td className="p-1.5 sm:p-2 text-center text-gray-300 font-mono text-xs sm:text-sm">{team.l}</td>
                      <td className="p-1.5 sm:p-2 text-center text-gray-400 font-mono text-xs sm:text-sm">{team.gf}</td>
                      <td className="p-1.5 sm:p-2 text-center text-gray-400 font-mono text-xs sm:text-sm">{team.ga}</td>
                      <td className="p-1.5 sm:p-2 text-center text-gray-400 font-mono text-xs sm:text-sm">{team.gd}</td>
                      <td className="p-1.5 sm:p-2 text-center font-bold text-electric-blue text-sm sm:text-base font-mono bg-electric-blue/5">{team.pts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-3 text-xs text-gray-500 bg-black/40 flex items-center gap-2 mt-auto">
              <div className="w-2 h-2 bg-electric-blue rounded-full shadow-[0_0_8px_rgba(0,240,255,0.8)]"></div>
              <span>Knockout stage qualification</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Groups;
