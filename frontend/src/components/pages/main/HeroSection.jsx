import { useAuthStore } from '../../../store/AuthStore';

const HeroSection = () => {
  const { user } = useAuthStore();
  const userName = user.name.split(' ');

  return (
    <div className='hero bg-base-200 min-h-screen'>
      <div className='hero-content text-center'>
        <div className='max-w-[48rem]'>
          <h1 className='text-5xl font-bold'>Hi there, {userName[0]}</h1>
          <p className='py-6 max-w-md mx-40'>
            {
              'This robust and customizable Full-Stack SaaS Starter Template is your one-stop solution to kickstart your SaaS application without the hassle of setting up the foundational elements. Designed for developers and entrepreneurs, it saves time and ensures best practices for a production-ready application.'
            }
          </p>
          <div className='flex items-center gap-3'></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
