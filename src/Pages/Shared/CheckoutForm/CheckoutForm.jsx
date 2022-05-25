import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from '@stripe/react-stripe-js';
import { useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { usePaymentIntent } from '../../../Hooks/usePaymentIntent';
import { useSavePaymentToDB } from '../../../Hooks/useSavePaymentToDB';
import Spinner from '../Spinner';

const useOptions = () => {
  const options = {
    style: {
      base: {
        fontSize: '18px',
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#11468F',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return options;
};

const CheckoutForm = ({
  item,
  refetch,
  billingDetails,
  extraFormInfo: { toolName, quantity },
}) => {
  const { total, orderId } = item;
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const navigate = useNavigate();

  // Mutates Stripe intent and returns client secret.
  const onSuccess = (data) => {
    setClientSecret(data.clientSecret);
  };
  const onError = () => {
    toast.error(
      (t) => (
        <div className="flex gap-3 items-center">
          <p>{error?.message || 'Failed to process payment.'}</p>
          <FontAwesomeIcon
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
            icon={faClose}
          />
        </div>
      ),
      {
        duration: 6000,
        id: 'errorPaymentIntent',
      }
    );
  };

  const { mutate, isLoading, isFetching } = usePaymentIntent({
    onError,
    onSuccess,
  });
  useEffect(() => {
    if (item?.total) {
      mutate(item);
    }
  }, [item, item?.total, mutate]);

  // Saves successful payment to DB
  const onPaymentSavedToDBSuccess = () => {
    toast.success(
      (t) => (
        <div className="flex gap-3 items-center">
          <p>{'Successfully saved payment to DB.'}</p>
          <FontAwesomeIcon
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
            icon={faClose}
          />
        </div>
      ),
      {
        duration: 6000,
        id: 'successSavingPaymentToDB',
      }
    );
    refetch ? refetch() : navigate('/dashboard', { replace: true });
  };
  const onPaymentSavedToDBError = (error) => {
    toast.error(
      (t) => (
        <div className="flex gap-3 items-center">
          <p>{error?.message || 'Failed to save payment to DB.'}</p>
          <FontAwesomeIcon
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
            icon={faClose}
          />
        </div>
      ),
      {
        duration: 6000,
        id: 'errorSavingPaymentToDB',
      }
    );
  };

  const {
    mutateAsync: mutateAsyncSavePaymentToDB,
    isLoading: savePaymentToDBLoading,
    isFetching: savePaymentToDBFetching,
  } = useSavePaymentToDB({
    onSuccess: onPaymentSavedToDBSuccess,
    onError: onPaymentSavedToDBError,
  });

  const [clientSecret, setClientSecret] = useState();
  const [error, setError] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardNumberElement);
    const { error } = await stripe.createPaymentMethod({
      // const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: card,
    });
    if (error) setError(error.message);
    else setError(null);

    // Confirms card payment.
    const { paymentIntent, error: errorIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: billingDetails,
        },
      });

    if (errorIntent) setError(errorIntent.message);
    else {
      setError(null);
      await mutateAsyncSavePaymentToDB({
        transactionId: paymentIntent.id,
        orderId: item.orderId,
        total: item.total,
        uid: item.uid,
      });
    }
  };
  if (
    isLoading ||
    isFetching ||
    savePaymentToDBLoading ||
    savePaymentToDBFetching
  ) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center text-center max-w-[250px] mx-auto">
      <h2 className="card-title mb-3">{toolName}</h2>
      <h3 className="text-xs bg-success font-bold text-black px-2 rounded-full mb-3">
        Order #{orderId?.slice(-4)}
      </h3>
      <div className="text-sm flex justify-between items-center w-full mx-auto mb-3">
        <p>Quantity</p>
        <span className="text-lg font-bold">{quantity}</span>
      </div>
      <div className="text-sm flex justify-between items-center w-full mx-auto mb-3">
        <p>Subtotal</p>
        <span className="text-lg font-bold">${Math.round(total / 1.1)}</span>
      </div>
      <div className="text-sm flex justify-between items-center w-full mx-auto">
        <p>Vat (10%)</p>
        <span className="text-lg font-bold">
          ${total - Math.round(total / 1.1)}
        </span>
      </div>
      <div className="divider divider-vertical"></div>
      <div className="text-sm flex justify-between items-center w-full mx-auto mb-3">
        <p>Total</p>
        <span className="text-lg font-bold">${total}</span>
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-xs flex flex-col gap-8 mb-4"
      >
        <label className="flex flex-col items-start">
          <p className="font-bold">Card number</p>
          <CardNumberElement
            className="border border-primary py-2 px-4 rounded w-64"
            options={options}
          />
        </label>
        <div className="flex justify-between gap-8">
          <label className="flex flex-col items-start">
            <p className="font-bold">CVC</p>

            <CardCvcElement
              className="border border-primary py-2 px-4 rounded w-20"
              options={options}
            />
          </label>

          <label className="flex flex-col items-start">
            <p className="font-bold">Expiration date</p>

            <CardExpiryElement
              className="border border-primary py-2 px-4 rounded w-32"
              options={options}
            />
          </label>
        </div>
        <div className="flex flex-col gap-4 items-start">
          <button
            className={`btn w-32 mt-2 ${
              stripe ? 'btn-primary' : 'btn-disabled'
            }`}
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Pay
          </button>
          <p className="text-error">{error}</p>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
