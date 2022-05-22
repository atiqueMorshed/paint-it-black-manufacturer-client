import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { auth } from '../../firebase.init';
import Spinner from '../Shared/Spinner';
import Error from '../Shared/Error';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  const [authUser, authLoading] = useAuthState(auth);

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const [signInWithEmailAndPassword, emailUser, emailLoading, emailError] =
    useSignInWithEmailAndPassword(auth);

  // Resets form on success
  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  // Redirects if an user already exists
  useEffect(() => {
    if (authUser) {
      navigate(from, { replace: true });
    }
  }, [authUser, navigate, from]);

  // Handle Form Submit
  const onSubmit = async (data) => {
    const { email, password } = data;
    if (email && password) {
      await signInWithEmailAndPassword(email, password);
    }
  };

  if (emailLoading || authLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="my-20">
      <div className="sm:px-10 sm:py-20 sm:border sm:rounded w-[300px] sm:w-[400px] max-w-[90%] mx-auto">
        <form
          className="flex flex-col justify-center"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-3xl font-medium mb-4 text-center">Login Now</h1>

          {/* Email Field */}
          <div className="form-control w-full max-w-xs">
            <label htmlFor="email" className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              className="input input-bordered w-full rounded max-w-xs"
              id="email"
              type="email"
              placeholder="Your email address."
              {...register('email', {
                required: 'Email is required.',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Enter a valid email.',
                },
                validate: (val) => {
                  if (val.startsWith(' ') || val.endsWith(' ')) {
                    return 'Cannot contain empty space in the beginning or end.';
                  }
                },
              })}
            />

            {errors?.email?.message && <Error error={errors.email.message} />}
          </div>

          {/* Password Field */}
          <div className="form-control mt-6 w-full max-w-xs">
            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              className="input input-bordered rounded w-full max-w-xs"
              id="password"
              type="password"
              placeholder="Enter your Password"
              {...register('password', {
                required: 'Password is required.',
                minLength: {
                  value: 6,
                  message: 'Minimum 6 characters long.',
                },
                maxLength: {
                  value: 15,
                  message: 'Maximum 15 characters long.',
                },
                pattern: {
                  value: /(\D*\d){2,}/,
                  message: 'Minimum 2 digits.',
                },
                validate: (val) => {
                  if (val.startsWith(' ') || val.endsWith(' ')) {
                    return 'Cannot contain empty space in the beginning or end.';
                  }
                },
              })}
            />
            {errors?.password?.message && (
              <Error error={errors.password.message} />
            )}
          </div>

          <button className="btn mt-10 rounded hover:bg-opacity-90">
            Login
          </button>
          {emailError?.message && <Error error={emailError.message} />}

          <p className="text-xs font-medium mt-8">
            Don't have an account?{' '}
            <Link className="underline hover:text-gray-600" to="/register">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
