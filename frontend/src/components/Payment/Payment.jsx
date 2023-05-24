import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { useEffect } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { NumericFormat } from "react-number-format";
import { useFormik } from "formik";
import * as yup from "yup";
import Spinner from "../Spinner";

const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "USD",
              value: orderData?.totalPrice,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;

      let paymentInfo = payer;

      if (paymentInfo !== undefined) {
        paypalPaymentHandler(paymentInfo);
      }
    });
  };

  const paypalPaymentHandler = async (paymentInfo) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      id: paymentInfo.payer_id,
      status: "succeeded",
      type: "Paypal",
    };

    await axios
      .post(`${server}/order/create-order`, order, config)
      .then((res) => {
        setOpen(false);
        navigate("/order/success");
        toast.success("Order successful!");
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
  };

  const paymentData = {
    amount: Math.round(orderData?.totalPrice * 100),
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${server}/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymnentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "Credit Card",
          };

          await axios
            .post(`${server}/order/create-order`, order, config)
            .then((res) => {
              setOpen(false);
              navigate("/order/success");
              toast.success("Order successful!");
              localStorage.setItem("cartItems", JSON.stringify([]));
              localStorage.setItem("latestOrder", JSON.stringify([]));
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            });
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      type: "Cash On Delivery",
    };

    await axios
      .post(`${server}/order/create-order`, order, config)
      .then((res) => {
        setOpen(false);
        navigate("/order/success");
        toast.success("Order successful!");
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
  };
  // mpesa.....
  // const mpesaHandler = async (e) => {
  //   e.preventDefault();

  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   order.paymentInfo = {
  //     type: "Mpesa",
  //   };

  //   await axios
  //     .post(`${server}/order/create-order`, order, config)
  //     .then((res) => {
  //       setOpen(false);
  //       navigate("/order/success");
  //       toast.success("Order successful!");
  //       localStorage.setItem("cartItems", JSON.stringify([]));
  //       localStorage.setItem("latestOrder", JSON.stringify([]));
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 2000);
  //     });
  // };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo
            user={user}
            open={open}
            setOpen={setOpen}
            onApprove={onApprove}
            createOrder={createOrder}
            paymentHandler={paymentHandler}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
            // mpesaHandler={mpesaHandler}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

const mpesaSchema = yup.object({
  phone: yup
    .string()
    .required("Phone Number is required")
    .min(10, "Phone number should be 10 numbers")
    .max(10, "Phone number must be 10 numbers"),
});
const PaymentInfo = ({
  user,
  open,
  setOpen,
  onApprove,
  createOrder,
  paymentHandler,
  cashOnDeliveryHandler,
  // mpesaHandler,
}) => {
  const [select, setSelect] = useState(1);
  // const [phone, phone/] = useState(user && user.phoneNumber);
  const [orderData1, setOrderData1] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const orderData1 = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData1(orderData1);
  }, []);
  const formik = useFormik({
    initialValues: {
      phone: "",
    },
    validationSchema: mpesaSchema,
    onSubmit: async (values) => {
      const phone = values.phone;
      // const amount = 10;

      const amount = Math.round(orderData1.totalPrice);

      await setLoading(true);
      axios
        .post(
          `${server}/mpesa/stk`,
          { phone, amount },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success(res.data.message);
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setLoading(false);
        });
    },
  });

  return (
    <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
      {/* select buttons */}
      {/* mpesa payment */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(1)}
          >
            {select === 1 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with Mpesa
          </h4>
        </div>

        {/* pay with payement */}
        {select === 1 ? (
          <div className=" w-ful flex border-b">
            <form className="pt-2" onSubmit={formik.handleSubmit}>
              <div className="w-full flex pb-3">
                <label className=" w-[50%] pb-2 mt-[11px]">Phone Number</label>
                <div>
                  <input
                    placeholder="07✱✱✱✱✱✱✱✱"
                    className={`${styles.input} p-3 w-[50%] text-[#444]`}
                    onChange={formik.handleChange("phone")}
                    onBlur={formik.handleBlur("phone")}
                    value={formik.values.phone}
                  />
                  <div className="text-red-500 text-xs">
                    {formik.touched.phone && formik.errors.phone}
                  </div>
                </div>
              </div>
              <div>
                <button
                  disabled={loading}
                  type="submit"
                  className="group relative w-full flex justify-center mb-4 py-3 px-4 border border-transparent text-[18px] font-[600] rounded-[5px] text-white !bg-[#12b32a] hover:!bg-[#12b32a]"
                >
                  {loading ? (
                    <p className="flex">
                      <Spinner /> Processing...
                    </p>
                  ) : (
                    <p className="">Pay Now</p>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : null}
      </div>

      <br />
      {/* paypal payment */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(2)}
          >
            {select === 2 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with Paypal
          </h4>
        </div>

        {/* pay with payement */}
        {select === 2 ? (
          <div className="w-full flex border-b">
            <div
              className={`${styles.button} !bg-[#f0d613] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              onClick={() => setOpen(true)}
            >
              Pay Now
            </div>
            {open && (
              <div className="w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[99999]">
                <div className="w-full 800px:w-[40%] h-screen 800px:h-[80vh] bg-white rounded-[5px] shadow flex flex-col justify-center p-8 relative overflow-y-scroll">
                  <div className="w-full flex justify-end p-3">
                    <RxCross1
                      size={30}
                      className="cursor-pointer absolute top-3 right-3"
                      onClick={() => setOpen(false)}
                    />
                  </div>
                  <PayPalScriptProvider
                    options={{
                      "client-id":
                        "Aczac4Ry9_QA1t4c7TKH9UusH3RTe6onyICPoCToHG10kjlNdI-qwobbW9JAHzaRQwFMn2-k660853jn",
                    }}
                  >
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      onApprove={onApprove}
                      createOrder={createOrder}
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>

      <br />
      {/* cash on delivery */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(3)}
          >
            {select === 3 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Cash on Delivery
          </h4>
        </div>

        {/* cash on delivery */}
        {select === 3 ? (
          <div className="w-full flex">
            <form className="w-full" onSubmit={cashOnDeliveryHandler}>
              <input
                type="submit"
                value="Confirm"
                className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              />
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const CartData = ({ orderData }) => {
  const shipping = orderData?.shipping?.toFixed(2);
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">
          <NumericFormat
            value={orderData?.subTotalPrice}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"Ksh. "}
          />
        </h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">
          {" "}
          <NumericFormat
            value={shipping}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"Ksh. "}
          />
        </h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          {orderData?.discountPrice ? (
            <NumericFormat
              value={orderData?.discountPrice}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Ksh. "}
            />
          ) : (
            "-"
          )}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        <NumericFormat
          value={orderData?.totalPrice}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"Ksh. "}
        />
      </h5>
      <br />
    </div>
  );
};

export default Payment;
