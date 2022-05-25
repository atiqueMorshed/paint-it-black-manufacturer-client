import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../firebase.init';
import Error from '../Shared/Error';
import SpinnerFullScreen from '../Shared/SpinnerFullScreen';

import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import {
  faClose,
  faStar as faSolidStar,
} from '@fortawesome/free-solid-svg-icons';
import { useAddReview } from '../../Hooks/useAddReview';
import Rating from 'react-rating';

const AddReview = () => {
  const [authUser, authLoading] = useAuthState(auth);

  const [rating, setRating] = useState(4.5);

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSuccess = (data) => {
    toast.success(
      (t) => (
        <div className="flex gap-3 items-center">
          <p>Review placed!</p>
          <FontAwesomeIcon
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
            icon={faClose}
          />
        </div>
      ),
      {
        duration: 6000,
        id: 'successPlacingReview',
      }
    );
  };
  const onError = (error) => {
    toast.error(
      (t) => (
        <div className="flex gap-3 items-center">
          <p>{error?.message || 'Failed to place review.'}</p>
          <FontAwesomeIcon
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
            icon={faClose}
          />
        </div>
      ),
      {
        duration: 6000,
        id: 'errorPlacingReview',
      }
    );
  };
  const { isLoading, isFetching, mutate } = useAddReview({
    onSuccess,
    onError,
  });

  // Resets form on success
  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  // Handle Form Submit
  const onSubmit = async (data) => {
    const { review } = data;
    if (review) {
      mutate({
        review,
        rating,
        uid: authUser.uid,
        displayName: authUser?.displayName || 'Not Provided',
      });
    }
  };

  if (authLoading || isLoading || isFetching) {
    return <SpinnerFullScreen />;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="card card-compact w-11/12 max-w-sm px-4 py-10 h-fit bg-base-100 shadow-xl">
        <h1 className="text-3xl font-medium mb-4 text-center">Add Review</h1>
        <form
          className="flex flex-col items-start pl-2 sm:pl-4"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Review Field */}
          <div className="form-control mt-6 w-full max-w-xs">
            <label htmlFor="review" className="label">
              <span className="label-text">Review</span>
            </label>
            <textarea
              id="review"
              type="text"
              rows={4}
              className="input input-bordered w-full max-w-xs rounded py-2 h-20"
              placeholder="Review Message"
              name="review"
              {...register('review', {
                required: 'Review message is required.',
                minLength: {
                  value: 10,
                  message: 'Minimum 10 characters.',
                },
                maxLength: {
                  value: 200,
                  message: 'Maximum 200 characters.',
                },
              })}
            />
            {errors?.review?.message && <Error error={errors.review.message} />}
          </div>
          <div className="mt-6">
            <label className="label">
              <span className="label-text">Leave a rating</span>
            </label>
            <Rating
              required
              initialRating={rating}
              emptySymbol={
                <FontAwesomeIcon className="h-8 w-8" icon={faStar} />
              }
              fullSymbol={
                <FontAwesomeIcon className="h-8 w-8" icon={faSolidStar} />
              }
              fractions={2}
              onChange={(val) => setRating(val)}
            />
          </div>
          <button className="btn mt-8">Place review</button>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
