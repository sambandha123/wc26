import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('');
    const res = await googleLogin(credentialResponse.credential);
    if (res.success) {
      navigate('/');
    } else {
      setError(res.message);
    }
  };

  const handleGoogleError = () => {
    setError('Google Registration Failed');
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await register(name, email, password);
    if (res.success) {
      navigate('/');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4 py-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="glass-card p-6 sm:p-8 w-full max-w-md rounded-2xl"
      >
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-center mb-6">Create Account</h2>
        {error && <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
            <input 
              type="text" 
              required 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="glass-input" 
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="glass-input" 
              placeholder="Enter your email address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="glass-input" 
              placeholder="Create a strong password"
            />
          </div>
          <button type="submit" className="btn-primary w-full text-lg mt-4">Join Now</button>
        </form>

        <div className="my-6 flex items-center justify-center space-x-4">
          <span className="h-px w-full bg-white/10"></span>
          <span className="text-sm text-gray-400 uppercase tracking-wider">OR</span>
          <span className="h-px w-full bg-white/10"></span>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
            theme="filled_black"
            shape="pill"
            text="signup_with"
          />
        </div>
        
        <p className="mt-6 text-center text-gray-400">
          Already have an account? <Link to="/login" className="text-electric-blue hover:underline">Login here</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
