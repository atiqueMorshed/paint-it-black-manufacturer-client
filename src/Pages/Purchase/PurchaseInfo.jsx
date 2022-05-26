import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../firebase.init';
import Error from '../Shared/Error';
import SpinnerFullScreen from '../Shared/SpinnerFullScreen';
import Checkout from './Checkout';
import { usePlaceOrder } from '../../Hooks/usePlaceOrder';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import CheckoutForm from '../Shared/CheckoutForm/CheckoutForm';

const PurchaseInfo = ({ minQuantity, available, price, toolId, toolName }) => {
  const [authUser, authLoading] = useAuthState(auth);
  const [selectedQuantity, setSelectedQuantity] = useState(minQuantity);
  const [orderData, setOrderData] = useState();

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      quantity: minQuantity,
    },
  });

  const onSuccess = (data) => {
    toast.success(
      (t) => (
        <div className="flex gap-3 items-center">
          <p>Order Placed but you must pay to confirm.</p>
          <FontAwesomeIcon
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
            icon={faClose}
          />
        </div>
      ),
      {
        duration: 6000,
        id: 'successPlacingOrder',
      }
    );
    setOrderData(data);
  };
  const onError = (error) => {
    setOrderData(null);
    toast.error(
      (t) => (
        <div className="flex gap-3 items-center">
          <p>{error?.message || 'Failed to place order.'}</p>
          <FontAwesomeIcon
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
            icon={faClose}
          />
        </div>
      ),
      {
        duration: 6000,
        id: 'errorPlacingOrder',
      }
    );
  };
  const { isLoading, mutateAsync } = usePlaceOrder({ onSuccess, onError });

  // Resets form on success
  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  // Handle Form Submit
  const onSubmit = async (data) => {
    const { quantity, address, phone } = data;
    if (quantity && address && phone) {
      /*prettier-ignore*/ await mutateAsync({
        uid: authUser.uid,
        email: authUser.email,
        name: authUser.displayName,
        address,
        phone,
        toolId,
        toolName,
        quantity,
        total:  (quantity * price) + (quantity * price * 0.1),
      })
    }
  };

  if (authLoading || isLoading) {
    return <SpinnerFullScreen />;
  }
  if (orderData) {
    return (
      <div className="w-fit shadow-xl p-8 rounded-xl">
        <CheckoutForm
          item={{
            orderId: orderData._id,
            total: orderData.total,
            uid: orderData.uid,
            toolId: orderData.toolId,
          }}
          extraFormInfo={{
            toolName: orderData.toolName,
            quantity: orderData.quantity,
          }}
          billingDetails={{
            email: orderData.email,
            name: orderData?.displayName || 'N/A',
          }}
        />
      </div>
    );
  }

  return (
    <div className="card card-compact w-11/12 max-w-sm px-4 py-10 h-fit bg-base-100 shadow-xl">
      <form
        className="flex flex-col items-center"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl font-medium mb-4 text-center">
          Order Information
        </h1>

        {available < minQuantity && (
          <>
            <div className="text-error text-xs">
              We are not accepting any orders.
            </div>
            <div className="text-error text-xs py-3">
              Total available is less than min quantity
            </div>
          </>
        )}

        {/* Name Field */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            className="input input-bordered w-full rounded max-w-xs"
            id="name"
            type="text"
            value={authUser?.displayName || ''}
            readOnly
            disabled
          />
        </div>

        {/* Email Field */}
        <div className="form-control w-full max-w-xs mt-4">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            className="input input-bordered w-full rounded max-w-xs"
            id="email"
            type="email"
            value={authUser?.email || ''}
            readOnly
            disabled
          />
          {authUser?.emailVerified === false ? (
            <Error
              error={'Your email is not verified. (can continue for testing).'}
            />
          ) : (
            <label className="label">
              <span className="text-success label-text-alt">
                Your email is verified
              </span>
            </label>
          )}
        </div>

        {/* Quantity Field */}
        <div className="form-control w-full max-w-xs">
          <label htmlFor="quantity" className="label">
            <span className="label-text">Order Quantity</span>
            {selectedQuantity >= minQuantity && selectedQuantity <= available && (
              <span className="label-text-alt text-success">
                Total:{' '}
                <span className="font-bold text-sm">
                  $
                  {
                    /*prettier-ignore*/ (selectedQuantity * price) + (selectedQuantity * price * 0.1)
                  }{' '}
                  (10% vat)
                </span>
              </span>
            )}
          </label>

          <input
            type="number"
            className="input input-bordered w-full max-w-xs rounded"
            placeholder="Quantity"
            name="quantity"
            {...register('quantity', {
              onChange: (e) => setSelectedQuantity(e.target.value),
              required: 'Quantity is required.',
              pattern: {
                value: /^[0-9]+$/,
                message: 'Only numbers.',
              },
              validate: (val) => {
                if (val < minQuantity && val > available) {
                  return `We do not have enough product. Please wait until we restock.`;
                }
                if (val < minQuantity) {
                  return `Minimum threshold is ${minQuantity}`;
                }
                if (val > available) {
                  return `Total available is ${available} `;
                }
              },
            })}
          />
          {errors?.quantity?.message && (
            <Error error={errors.quantity.message} />
          )}
        </div>

        {/* Address Field */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Address</span>
          </label>

          <input
            type="text"
            className="input input-bordered w-full max-w-xs rounded"
            placeholder="Enter your address"
            name="address"
            {...register('address', {
              required: 'Address is required.',
              minLength: {
                value: 4,
                message: 'Minimum 4 characters.',
              },
              maxLength: {
                value: 40,
                message: 'Maximum 40 characters.',
              },
              validate: (val) => {
                if (val.startsWith(' ') || val.endsWith(' ')) {
                  return 'Cannot contain empty space in the beginning or end.';
                }
              },
            })}
          />
          {errors?.address?.message && <Error error={errors.address.message} />}
        </div>

        {/* Phone Field */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Phone</span>
          </label>

          <input
            type="number"
            className="input input-bordered w-full max-w-xs rounded"
            placeholder="Enter your phone number"
            name="address"
            {...register('phone', {
              required: 'Phone is required.',
              pattern: {
                value: /^[0-9]+$/,
                message: 'Only numbers',
              },
              validate: (val) => {
                if (val.startsWith(' ') || val.endsWith(' ')) {
                  return 'Cannot contain empty space in the beginning or end.';
                }
                if (val.length < 11) {
                  return 'Needs to be atleast 11 digits.';
                }
              },
            })}
          />
          {errors?.phone?.message && <Error error={errors.phone.message} />}
        </div>
        <button className="btn mt-8">Place order & proceed to payment</button>
      </form>
    </div>
  );
};

export default PurchaseInfo;
