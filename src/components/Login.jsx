import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async (data) => {
    setError('');
    setLoading(true);
    try {
      const session = await authService.login(data);
      // login function in auth.js
      console.log("Logged in:", session);

      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate('/'); // redirect to home
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-lg bg-white rounded-xl p-10 shadow-md border border-black/10">
        <div className="mb-4 flex justify-center">
          <Logo width="100px" />
        </div>
        <h2 className="text-center text-2xl font-bold mb-2">
          Sign in to your account
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-red-500 hover:underline">
            Sign Up
          </Link>
        </p>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register('email', {
              required: true,
              pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register('password', { required: true })}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
