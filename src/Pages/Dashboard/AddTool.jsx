import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../firebase.init';
import { useAddTool } from '../../Hooks/useAddTool';
import Error from '../Shared/Error';
import SpinnerFullScreen from '../Shared/SpinnerFullScreen';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const AddTool = () => {
  const [authUser, authLoading] = useAuthState(auth);

  const {
    handleSubmit,
    reset,
    register,
    getValues,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSuccess = (data) => {
    toast.success(
      (t) => (
        <div className="flex gap-3 items-center">
          <p>Tool added!</p>
          <FontAwesomeIcon
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
            icon={faClose}
          />
        </div>
      ),
      {
        duration: 6000,
        id: 'successAddingTool',
      }
    );
  };
  const onError = (error) => {
    toast.error(
      (t) => (
        <div className="flex gap-3 items-center">
          <p>{error?.message || 'Failed to add tool.'}</p>
          <FontAwesomeIcon
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
            icon={faClose}
          />
        </div>
      ),
      {
        duration: 6000,
        id: 'errorAddingTool',
      }
    );
  };
  const { isLoading, isFetching, mutate } = useAddTool({
    onSuccess,
    onError,
  });

  // Resets form on success
  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  // Handle Form Submit
  const onSubmit = async (data) => {
    const { name, description, minQuantity, available, price, image } = data;
    mutate({
      uid: authUser.uid,
      tool: {
        toolName: name,
        toolDescription: description,
        minQuantity,
        available,
        price,
        imageUrl: image,
      },
    });
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
          {/* Name Field */}
          <div className="form-control mt-6 w-full max-w-xs">
            <label htmlFor="name" className="label">
              <span className="label-text">Tool Name</span>
            </label>
            <input
              id="name"
              type="text"
              className="input input-bordered w-full max-w-xs rounded py-2"
              placeholder="Tool Name"
              name="name"
              {...register('name', {
                required: 'Tool name is required.',
                minLength: {
                  value: 3,
                  message: 'Minimum 3 characters.',
                },
                maxLength: {
                  value: 30,
                  message: 'Maximum 30 characters.',
                },
              })}
            />
            {errors?.name?.message && <Error error={errors.name.message} />}
          </div>

          {/* Description Field */}
          <div className="form-control mt-6 w-full max-w-xs">
            <label htmlFor="description" className="label">
              <span className="label-text">Tool Description</span>
            </label>
            <textarea
              id="description"
              type="text"
              className="input input-bordered w-full max-w-xs rounded py-2 h-20"
              placeholder="Tool description"
              name="description"
              {...register('description', {
                required: 'Tool description is required.',
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
            {errors?.description?.message && (
              <Error error={errors.description.message} />
            )}
          </div>

          {/* minQuantity Field */}
          <div className="form-control mt-6 w-full">
            <label htmlFor="minQuantity" className="label">
              <span className="label-text">Minimum Quantity</span>
            </label>
            <input
              id="minQuantity"
              type="number"
              className="input input-bordered w-full rounded py-2"
              placeholder="Minimum Quantity"
              name="minQuantity"
              {...register('minQuantity', {
                required: 'Minimum Quantity is required.',
                minLength: {
                  value: 1,
                  message: 'Minimum 1 digit.',
                },
                maxLength: {
                  value: 10,
                  message: 'Maximum 10 digits.',
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Only Numbers',
                },
                validate: (val) => {
                  if (val.startsWith(' ') || val.endsWith(' ')) {
                    return 'Cannot start or end with spaces.';
                  }
                  if (val <= 0) {
                    return 'Enter positive integer.';
                  }
                },
              })}
            />
            {errors?.minQuantity?.message && (
              <Error error={errors.minQuantity.message} />
            )}
          </div>

          {/* Available Field */}
          <div className="form-control mt-6 w-full">
            <label htmlFor="available" className="label">
              <span className="label-text">Available Quantity</span>
            </label>
            <input
              id="available"
              type="number"
              className="input input-bordered w-full rounded py-2"
              placeholder="Available Quantity"
              name="available"
              {...register('available', {
                required: 'Minimum Quantity is required.',
                minLength: {
                  value: 1,
                  message: 'Minimum 1 digit.',
                },
                maxLength: {
                  value: 10,
                  message: 'Maximum 10 digits.',
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Only Numbers',
                },
                validate: (val) => {
                  if (val.startsWith(' ') || val.endsWith(' ')) {
                    return 'Cannot start or end with spaces.';
                  }
                  if (val <= 0) {
                    return 'Enter positive integer.';
                  }

                  if (getValues('minQuantity') - val > 0) {
                    return 'Cannot be less than min quantity.';
                  }
                },
              })}
            />
            {errors?.available?.message && (
              <Error error={errors.available.message} />
            )}
          </div>

          {/* Price Field */}
          <div className="form-control mt-6 w-full">
            <label htmlFor="price" className="label">
              <span className="label-text">Price per unit</span>
            </label>
            <input
              id="price"
              type="number"
              className="input input-bordered w-full rounded py-2"
              placeholder="Price per unit"
              name="price"
              {...register('price', {
                required: 'Price per unit is required.',
                minLength: {
                  value: 1,
                  message: 'Minimum 1 digit.',
                },
                maxLength: {
                  value: 10,
                  message: 'Maximum 10 digits.',
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Only Numbers',
                },
                validate: (val) => {
                  if (val.startsWith(' ') || val.endsWith(' ')) {
                    return 'Cannot start or end with spaces.';
                  }
                  if (val <= 0) {
                    return 'Enter positive integer.';
                  }
                },
              })}
            />
            {errors?.price?.message && <Error error={errors.price.message} />}
          </div>

          {/* Image Field */}
          <div className="form-control mt-6 w-full">
            <label htmlFor="image" className="label">
              <span className="label-text">Image URL</span>
            </label>
            <input
              id="image"
              type="text"
              className="input input-bordered w-full rounded py-2"
              placeholder="Image URL"
              name="image"
              {...register('image', {
                required: 'Image URL is required.',
                minLength: {
                  value: 10,
                  message: 'Minimum 10 characters.',
                },

                validate: (val) => {
                  if (val.startsWith(' ') || val.endsWith(' ')) {
                    return 'Cannot start or end with spaces.';
                  }
                },
              })}
            />
            {errors?.image?.message && <Error error={errors.image.message} />}
          </div>

          <button className="btn mt-8">Add Tool</button>
        </form>
      </div>
    </div>
  );
};

export default AddTool;
