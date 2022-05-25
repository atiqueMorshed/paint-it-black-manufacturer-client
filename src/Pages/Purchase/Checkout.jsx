import React from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ orderData }) => {
  const navigate = useNavigate();
  const { quantity, total } = orderData;

  const subTotal = Math.round(total / 1.1);
  const vat = total - subTotal;

  return (
    <div className="card card-compact w-11/12 max-w-sm px-4 py-10 h-fit bg-base-100 shadow-xl">
      <form className="flex flex-col items-center" autoComplete="off">
        <h1 className="text-3xl font-medium mb-4 text-center">
          Payment Information
        </h1>

        {/* Order Quantity Field */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Order Quantity</span>
          </label>
          <input
            className="input input-bordered w-full rounded max-w-xs"
            id="quantity"
            type="text"
            value={quantity || ''}
            readOnly
            disabled
          />
        </div>
        <div className="flex flex-col items-end w-full pr-4 pt-4">
          <p className="text-sm">
            Subtotal <span className="text-lg font-bold">${subTotal}</span>
          </p>
          <p className="text-sm">
            Vat (10%) <span className="text-lg font-bold">${vat}</span>
          </p>
          <div className="divider divider-vertical"></div>
          <p className="text-sm">
            Total: <span className="text-lg font-bold">${total}</span>
          </p>
        </div>
        <div className="flex mt-4 items-center">
          <button className="button-style-1">Pay Now</button>
          <div className="divider divider-horizontal"></div>
          <button
            onClick={() => {
              navigate('/dashboard', { replace: true });
            }}
            className="btn btn-sm hover:bg-primary"
          >
            Your Orders
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
