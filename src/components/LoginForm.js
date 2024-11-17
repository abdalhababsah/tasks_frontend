import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.token);
  const { role } = useSelector((state) => state.auth.user);
  const { error } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    dispatch(login(email, password, navigate));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, role, navigate]);

  return (
    <div className="flex min-h-full flex-col dark:bg-gray-900 h-screen justify-center px-6 py-12 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full flex flex-col justify-center sm:max-w-sm">
        <h1 className="mx-auto h-10 dark:text-gray-400 font-bold w-auto text-2xl" alt="Mena Devs">
          MENA<span className="text-[#3de533]">Devs</span> AI
        </h1>
      </div>

      <div className="mt-10 sm:mx-auto dark:bg-gray-800 sm:w-full sm:max-w-sm border border-spacing-2 p-8 shadow">
        <h2 className=" text-center dark:text-gray-400  text-xl font-bold leading-9 tracking-tight text-gray-900 pb-3">
          Sign in to your account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm dark:text-gray-400 font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm dark:text-gray-400 font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full p-3 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {error && (
           		<span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">

              {error.message}
            </span>
          )}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
