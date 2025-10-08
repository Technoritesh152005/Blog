import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../appwrite/auth';
import { Button, Input, Logo } from './index';
import { useForm } from 'react-hook-form';

function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const create = async (data) => {
    setError('');
    setLoading(true);
    try {
      await authService.createAccount(data);
      alert('Signup successful! Please login.');
      navigate('/login'); // Redirect to login
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
          Sign up to create account
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Already have an account?{' '}
          <Link to="/login" className="text-red-500 hover:underline">
            Sign In
          </Link>
        </p>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            {...register('name', { required: true })}
          />
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
            {loading ? 'Creating...' : 'Create Account'}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
