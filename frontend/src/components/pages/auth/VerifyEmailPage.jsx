import { motion } from 'motion/react';

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/button';
import { useAuthStore } from '../../../store/AuthStore';
import { toast } from 'react-hot-toast';
import Container from '../../container';

const VerifyEmailPage = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { verifyEmail, isLoading } = useAuthStore();

  const handleChange = (index, value) => {
    const newCode = [...code];

    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split('');
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || '';
      }
      setCode(newCode);

      // Focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== '');
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join('');
    try {
      await verifyEmail(verificationCode);
      toast.success('Email Verification Successful');
      navigate('/');
    } catch (error) {
      toast.error('Verification Failed');
      console.log(error);
    }
  };

  // Auto submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== '')) {
      handleSubmit(new Event('submit'));
    }
  }, [code]);

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='max-w-md w-full bg-opacity-0 rounded-2xl shadow-xl overflow-hidden'
      >
        <div className='p-8'>
          <h2 className='text-3xl mb-3'>Verify Your Email</h2>
          <p className='text-center text-gray-500 mb-6'>
            Enter the 6-digit code sent to your email address
          </p>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='flex justify-between'>
              {code.map((d, i) => (
                <input
                  key={i}
                  ref={(e) => (inputRefs.current[i] = e)}
                  maxLength='6'
                  value={d}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e.target.value)}
                  type='text'
                  className='w-12 h-12 text-center font-bold rounded-lg border-2 border-gray-600 bg-gray-700 focus:outline-none focus:border-gray-700'
                />
              ))}
            </div>
            <Button text='Verify' loading={isLoading} styles='w-full' />
          </form>
        </div>
      </motion.div>
    </Container>
  );
};

export default VerifyEmailPage;
