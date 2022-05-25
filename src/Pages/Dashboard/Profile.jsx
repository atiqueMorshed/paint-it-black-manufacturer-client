import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase.init';
import { useGetPrivateData } from '../../Hooks/useGetPrivateData';
import { useUpdateProfile } from '../../Hooks/useUpdateProfile';
import Error from '../Shared/Error';
import SpinnerFullScreen from '../Shared/SpinnerFullScreen';

const Profile = () => {
  const [authUser, authLoading] = useAuthState(auth);
  const navigate = useNavigate();
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitSuccessful },
    setValue,
  } = useForm({
    defaultValues: {
      name: authUser?.displayName || '',
      email: authUser?.email || '',
    },
  });

  // Get Profile Data
  const { isLoading, isFetching, isRefetching, isError, error, data, refetch } =
    useGetPrivateData({
      url: `/api/userprofile/${authUser.uid}`,
      name: 'getProfileInfo',
    });

  useEffect(() => {
    console.log(data);
    if (data?.location) setValue('location', data.location);
    if (data?.education) setValue('education', data.education);
    if (data?.phone) setValue('phone', data.phone);
    if (data?.linkedin) setValue('linkedin', data.linkedin);
  }, [data, setValue]);

  // Update Profile
  const onSuccess = (data) => {
    toast.success(
      (t) => (
        <div className="flex gap-3 items-center">
          <p>Profile Updated!</p>
          <FontAwesomeIcon
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
            icon={faClose}
          />
        </div>
      ),
      {
        duration: 6000,
        id: 'successUpdatingProfile',
      }
    );
    refetch();
  };
  const onError = (error) => {
    toast.error(
      (t) => (
        <div className="flex gap-3 items-center">
          <p>{error?.message || 'Failed to update profile.'}</p>
          <FontAwesomeIcon
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
            icon={faClose}
          />
        </div>
      ),
      {
        duration: 6000,
        id: 'errorUpdatingProfile',
      }
    );
  };
  const {
    isLoading: isUpdateLoading,
    isFetching: isUpdateFetching,
    mutate,
  } = useUpdateProfile({ onSuccess, onError });

  // Resets form on success
  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  // Handle Form Submit
  const onSubmit = (data) => {
    const { education, location, phone, linkedin } = data;
    mutate({
      education,
      location,
      phone,
      linkedin,
      uid: authUser.uid,
    });
  };

  if (
    isLoading ||
    isFetching ||
    isRefetching ||
    isUpdateLoading ||
    isUpdateFetching ||
    authLoading
  ) {
    return <SpinnerFullScreen />;
  }

  if (isError) {
    return (
      <div id="tools" className="my-32 text-secondary">
        <h1 className="text-4xl text-center font-medium pb-16">Edit Profile</h1>
        <div className="flex flex-col items-center gap-4 h-[200px]">
          <h1 className="text-2xl text-center font-bold">
            There was a problem loading profile information from server
          </h1>
          <h1 className="text-center">{error?.message}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <div className="card card-compact w-11/12 max-w-sm px-4 py-10 bg-base-100 shadow-xl">
        <form
          className="flex flex-col items-center"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-3xl font-medium mb-2 text-center">
            Edit Profile
          </h1>

          {/* Name Field */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              className="input input-bordered w-full rounded max-w-xs"
              id="name"
              type="text"
              value={authUser?.displayName}
              readOnly
              disabled
            />
          </div>

          {/* Email Field */}
          <div className="form-control w-full max-w-xs mt-2">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              className="input input-bordered w-full rounded max-w-xs"
              id="email"
              type="email"
              value={authUser?.email}
              readOnly
              disabled
            />
            {authUser?.emailVerified === false ? (
              <Error
                error={
                  'Your email is not verified. (can continue for testing).'
                }
              />
            ) : (
              <label className="label">
                <span className="text-success label-text-alt">
                  Your email is verified
                </span>
              </label>
            )}
          </div>

          {/* Location Field */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Location</span>
            </label>

            <input
              type="text"
              className="input input-bordered w-full max-w-xs rounded"
              placeholder="Enter your location."
              name="location"
              {...register('location', {
                maxLength: {
                  value: 50,
                  message: 'Maximum 50 characters.',
                },
                validate: (val) => {
                  if (val.startsWith(' ') || val.endsWith(' ')) {
                    return 'Cannot contain empty space in the beginning or end.';
                  }
                },
              })}
            />
            {errors?.location?.message && (
              <Error error={errors.location.message} />
            )}
          </div>

          {/* Education Field */}
          <div className="form-control w-full max-w-xs mt-2">
            <label className="label">
              <span className="label-text">Education</span>
            </label>

            <input
              type="text"
              className="input input-bordered w-full max-w-xs rounded"
              placeholder="Enter your education degree."
              name="education"
              {...register('education', {
                maxLength: {
                  value: 50,
                  message: 'Maximum 50 characters.',
                },
                validate: (val) => {
                  if (val.startsWith(' ') || val.endsWith(' ')) {
                    return 'Cannot contain empty space in the beginning or end.';
                  }
                },
              })}
            />
            {errors?.education?.message && (
              <Error error={errors.education.message} />
            )}
          </div>

          {/* Phone Field */}
          <div className="form-control w-full max-w-xs mt-2">
            <label className="label">
              <span className="label-text">Phone</span>
            </label>

            <input
              type="number"
              className="input input-bordered w-full max-w-xs rounded"
              placeholder="Enter your phone number"
              name="phone"
              {...register('phone', {
                validate: (val) => {
                  if (val.startsWith(' ') || val.endsWith(' ')) {
                    return 'Cannot contain empty space in the beginning or end.';
                  }
                },
              })}
            />
            {errors?.phone?.message && <Error error={errors.phone.message} />}
          </div>

          {/* LinkedIn Field */}
          <div className="form-control w-full max-w-xs mt-2">
            <label className="label">
              <span className="label-text">LinkedIn Profile</span>
            </label>

            <input
              type="text"
              className="input input-bordered w-full max-w-xs rounded"
              placeholder="Enter your linkedin profile."
              name="linkedin"
              {...register('linkedin', {
                maxLength: {
                  value: 80,
                  message: 'Maximum 80 characters.',
                },
                validate: (val) => {
                  if (val.startsWith(' ') || val.endsWith(' ')) {
                    return 'Cannot contain empty space in the beginning or end.';
                  }
                },
              })}
            />
            {errors?.linkedin?.message && (
              <Error error={errors.linkedin.message} />
            )}
          </div>
          <div className="flex gap-4 mt-4">
            <button className="btn btn-primary">Update Profile</button>
          </div>
        </form>
        <button
          onClick={() => navigate(0)}
          className="btn btn-xs mt-4 w-20 mx-auto"
        >
          Default
        </button>
      </div>
    </div>
  );
};

export default Profile;
