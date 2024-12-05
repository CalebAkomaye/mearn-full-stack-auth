import { motion } from 'motion/react';
import Input from '../../ui/Input';
import { User, LockKeyhole, Mail } from 'lucide-react';

import { useState } from 'react';
import Button from '../../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/AuthStore';
import Container from '../../container';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  const { signup, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
      navigate('/verify-email');
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
          <h1 className='text-3xl mb-3'>Create Account</h1>
          <form onSubmit={handleSignUp}>
            <Input
              icon={User}
              type='text'
              value={name}
              placeholder='Full Name'
              onChange={(e) => setName(e.target.value)}
            />
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
            <Button text='Sign Up' loading={isLoading} styles='w-full' />
          </form>
          <div className='px-8 pt-4 opacity-50 flex justify-center'>
            <p className='text-sm text-gray-400'>
              Already have an account?{' '}
              <Link to={'/login'} className='hover:underline'>
                Login
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </Container>
  );
};

export default SignupPage;
