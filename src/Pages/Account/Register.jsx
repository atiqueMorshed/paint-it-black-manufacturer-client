import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useForm } from 'react-hook-form';
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from 'react-firebase-hooks/auth';

import { auth } from '../../firebase.init';
import SpinnerFullScreen from '../Shared/SpinnerFullScreen';
import Error from '../Shared/Error';
import GoogleLogin from './GoogleLogin';
import { useUpdateUserGetToken } from '../../Hooks/useUpdateUserGetToken';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = useForm();

  const [authUser, authLoading] = useAuthState(auth);

  const [createUserWithEmailAndPassword, emailUser, emailLoading, emailError] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  const onSuccess = () => {
    navigate('/', { replace: true });
  };

  const onError = (error) => {
    toast.error(
      (t) => (
        <div className="flex gap-3 items-center">
          <p>
            {error?.message || 'Error saving user to DB and generating JWT.'}
          </p>
          <FontAwesomeIcon
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
            icon={faClose}
          />
        </div>
      ),
      {
        duration: 6000,
        id: 'errorRegisterUpdateUserGetToken',
      }
    );
  };
  const { mutateAsync, isLoading } = useUpdateUserGetToken({
    onSuccess,
    onError,
  });

  // Updates user and generates JWT after successful login
  useEffect(() => {
    if (emailUser?.user) {
      mutateAsync({
        uid: emailUser.user.uid,
      });
    }
  }, [emailUser, mutateAsync]);

  // Redirects if user exists
  useEffect(() => {
    if (authUser && localStorage.getItem('paintitblack-at') === authUser.uid) {
      navigate('/', { replace: true });
    }
  }, [authUser, navigate]);

  // Resets form on success
  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    if (email && password && name) {
      await createUserWithEmailAndPassword(email, password);
      if (!emailError) await updateProfile({ displayName: name });
      if (emailUser) {
        toast.success(
          (t) => (
            <div className="flex gap-3 items-center">
              <p>Registration Successful, Please verify your email.</p>
              <FontAwesomeIcon
                className="cursor-pointer"
                onClick={() => toast.dismiss(t.id)}
                icon={faClose}
              />
            </div>
          ),
          {
            duration: 6000,
            id: 'successRegistrationUpdateUserGetToken',
          }
        );
      }
    }
  };

  if (authLoading || isLoading || emailLoading || updating) {
    return <SpinnerFullScreen />;
  }

  return (
    <div className="my-20">
      <div className="sm:px-10 sm:py-20 w-[300px] sm:w-[400px] max-w-[90%] mx-auto sm:border sm:rounded">
        <form
          className="flex flex-col justify-center"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <h1 className="text-3xl font-medium mb-4 text-center">
            Register Now
          </h1>

          {/* Name Field */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>

            <input
              type="text"
              className="input input-bordered w-full max-w-xs rounded"
              placeholder="Enter your name"
              name="name"
              {...register('name', {
                required: 'Name is required.',
                pattern: {
                  value: /^[a-zA-Z ]+$/,
                  message: 'Only alphabets and space.',
                },
                minLength: {
                  value: 4,
                  message: 'Minimum 4 characters.',
                },
                validate: (val) => {
                  if (val.startsWith(' ') || val.endsWith(' ')) {
                    return 'Cannot contain empty space in the beginning or end.';
                  }
                },
              })}
            />
            {errors?.name?.message && <Error error={errors.name.message} />}
          </div>

          {/* Email */}
          <div className="form-control w-full max-w-xs mt-6">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full max-w-xs rounded"
              name="email"
              {...register('email', {
                required: 'Email is required.',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Enter valid email.',
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

          {/* Password */}
          <div className="form-control w-full max-w-xs mt-6">
            <label className="label">
              <span className="label-text">Password</span>
            </label>

            <input
              type="password"
              placeholder="Enter your Password"
              className="input input-bordered w-full max-w-xs rounded"
              name="password"
              {...register('password', {
                required: 'Password is required.',
                minLength: {
                  value: 5,
                  message: 'Minimum 5 characters long.',
                },
                maxLength: {
                  value: 12,
                  message: 'Maximum 12 characters long.',
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

          {/* Confirm password */}
          <div className="form-control w-full max-w-xs mt-6">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your Password"
              className="input input-bordered w-full max-w-xs rounded"
              name="confirmPassword"
              {...register('confirmPassword', {
                required: 'Confirm password is required.',

                validate: (val) => {
                  if (watch('password') !== val) {
                    return 'Passwords must match.';
                  }
                  if (val.startsWith(' ') || val.endsWith(' ')) {
                    return 'Cannot contain empty space in the beginning or end.';
                  }
                },
              })}
            />
            {errors?.confirmPassword?.message && (
              <Error error={errors.confirmPassword.message} />
            )}
          </div>

          <button className="btn mt-10 rounded hover:bg-opacity-90">
            Register
          </button>

          {emailError?.message && <Error error={emailError.message} />}
          {updateError?.message && <Error error={updateError.message} />}

          <p className="text-xs font-medium mt-8">
            Already have an account?{' '}
            <Link className="underline hover:text-gray-600" to="/login">
              Login
            </Link>
          </p>
        </form>
        <div className="divider">OR</div>
        <div className="mt-6">
          <GoogleLogin from="/" />
        </div>
      </div>
    </div>
  );
};

export default Register;
