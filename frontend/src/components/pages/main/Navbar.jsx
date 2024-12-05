import { useAuthStore } from '../../../store/AuthStore';
import { Link, useNavigate } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { logout, user, isLoading, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    console.log(isAuthenticated);
    navigate('/login');
  }
  const handleLogout = () => {
    try {
      logout();
      toast.success('Logout Successful');
      // navigate('/login');
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };
  return (
    <div className='navbar bg-base-100'>
      <div className='flex-1'>
        <Link to='/' className='btn btn-ghost text-xl'>
          Authi&apos;Fy
        </Link>
      </div>
      <div className='flex-none gap-2'>
        <div className='form-control'>
          <input
            type='text'
            placeholder='Search'
            className='input input-bordered w-24 md:w-auto'
          />
        </div>
        <div className='dropdown dropdown-end'>
          <div
            tabIndex={0}
            role='button'
            className='btn btn-ghost btn-circle avatar'
          >
            <div className='w-10 rounded-full'>
              <p className='text-xl font-bold mt-1'>
                {user.name.slice(0, 2).toUpperCase()}
              </p>
              {/* <img
                alt='Tailwind CSS Navbar component'
                src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
              /> */}
            </div>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'
          >
            <li>
              <a className='justify-between'>{user.name}</a>
            </li>
            <li>
              <Link to='/docs'>Documentation</Link>
            </li>
            <li>
              <a onClick={handleLogout}>
                {isLoading ? (
                  <LoaderCircle className='animate-spin' />
                ) : (
                  'Logout'
                )}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
