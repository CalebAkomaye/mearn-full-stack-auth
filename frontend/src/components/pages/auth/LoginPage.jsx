import Input from '../../ui/Input';
import { motion } from 'motion/react';

import { useState } from 'react';
import { Mail, LockKeyhole } from 'lucide-react';

import Button from '../../ui/button';
import { Link } from 'react-router-dom';

import { useAuthStore } from '../../../store/AuthStore';
import { toast } from 'react-hot-toast';
import Container from '../../container';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, user } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Login successful');
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='max-w-md w-full bg-opacity-0 rounded-2xl shadow-xl overflow-hidden'
      >
        <div className='p-8'>
          <h1 className='text-3xl mb-3'>Welcome Back</h1>
          <form onSubmit={handleLogin}>
            <Input
              icon={Mail}
              type='email'
              value={email}
              placeholder='Email Address'
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              icon={LockKeyhole}
              type='password'
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='flex items-center mb-4'>
              <Link
                to={'/forgot-password'}
                className='text-sm text-gray-500 hover:underline'
              >
                Forgot Password?
              </Link>
            </div>
            <Button text='Login' loading={isLoading} styles='w-full' />
          </form>
          <div className='px-8 pt-4 opacity-50 flex justify-center'>
            <p className='text-sm text-gray-400'>
              Don&apos;t have an account?{' '}
              <Link to={'/signup'} className='hover:underline'>
                Singup
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </Container>
  );
};

export default LoginPage;
