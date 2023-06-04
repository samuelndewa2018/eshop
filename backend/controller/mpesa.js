require("dotenv").config();
const Transaction = require("../model/transaction");
const datetime = require("node-datetime");
const axios = require("axios");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const pass_key = process.env.pass_key;

const short_code = process.env.SHORT_CODE;
const key = process.env.CONSUMER_KEY;
const secret = process.env.CONSUMER_SECRET;
const auth = new Buffer.from(`${key}:${secret}`).toString("base64");
const newPassword = () => {
  const dt = datetime.create();
  const formatted = dt.format("YmdHMS");
  const passString = short_code + pass_key + formatted;
  const base64Encoded = Buffer.from(passString).toString("base64");
  return base64Encoded;
};

exports.token = async (req, res, next) => {
  const key = process.env.CONSUMER_KEY;
  const secret = process.env.CONSUMER_SECRET;
  const auth = new Buffer.from(`${key}:${secret}`).toString("base64");

  await axios
    .get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          authorization: `Basic ${auth}`,
        },
      }
    )
    .then((res) => {
      //   resp.status(200).json(res.data);
      token = res.data.access_token;
      // console.log(token);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.stkPush = catchAsyncErrors(async (req, res, next) => {
  const phone = req.body.phone.substring(1); //formated to 72190........
  const amount = req.body.amount;
  const date = new Date();
  const callbackurl = process.env.CALL_BACK_URL;
  const callbackroute = process.env.CALL_BACK_ROUTE;
  const timestamp =
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);

  const base64Encoded = Buffer.from(short_code + pass_key + timestamp).toString(
    "base64"
  );

  const password = base64Encoded;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const stkUrl =
    "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
  let data = {
    BusinessShortCode: "174379",
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    // PartyA: `${phoneNo}`,
    PartyA: `254${phone}`,
    PartyB: "174379",
    // PhoneNumber: `${phoneNo}`,
    PhoneNumber: `254${phone}`,
    CallBackURL: `${callbackurl}/${callbackroute}`,
    AccountReference: "eShop",
    TransactionDesc: "Lipa na M-PESA",
  };
  try {
    await axios
      .post(stkUrl, data, {
        headers: headers,
      })
      .then((response) => {
        res.send(response.data);
      });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Error occurred. Please try again", 500));
  }
});

const callback_route = process.env.CALLBACK_ROUTE;
exports.stkCallback = (req, res) => {
  if (!req.body.Body.stkCallback.CallbackMetadata) {
    console.log(req.body.Body.stkCallback.ResultDesc);
    res.status(200).json("ok");
    return;
  }

  const amount = req.body.Body.stkCallback.CallbackMetadata.Item[0].Value;
  const code = req.body.Body.stkCallback.CallbackMetadata.Item[1].Value;
  const phone1 =
    req.body.Body.stkCallback.CallbackMetadata.Item[4].Value.toString().substring(
      3
    );
  const phone = `0${phone1}`;
  // saving the transaction to db
  // console.log({
  //   phone,
  //   code,
  //   amount,
  // });
  const transaction = new Transaction();

  transaction.customer_number = phone;
  transaction.mpesa_ref = code;
  transaction.amount = amount;

  transaction
    .save()
    .then((data) => {
      console.log({ message: "transaction saved successfully", data });
    })
    .catch((err) => console.log(err.message));

  res.status(200).json("ok");
};

exports.stkpushquery = catchAsyncErrors(async (req, res) => {
  const CheckoutRequestID = req.body.CheckoutRequestID;

  const date = new Date();
  const timestamp =
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);

  const passkey = process.env.MPESA_PASSKEY;

  const password = new Buffer.from(short_code + pass_key + timestamp).toString(
    "base64"
  );

  await axios

    .post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query",
      {
        BusinessShortCode: "174379",
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: CheckoutRequestID,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((responce) => {
      res.status(200).json(responce.data);
    })
    .catch((err) => {
      // console.log(err.message);
      res.status(400).json(err);
    });
});

// require("dotenv").config();
// const datetime = require("node-datetime");
// const axios = require("axios");
// const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// const ErrorHandler = require("../utils/ErrorHandler");
// const pass_key = process.env.PASS_KEY;
// const short_code = process.env.SHORT_CODE;
// const consumer_key = process.env.CONSUMER_KEY;
// const consumer_secret = process.env.CONSUMER_SECRET;
// const newPassword = () => {
//   const dt = datetime.create();
//   const formatted = dt.format("YmdHMS");
//   const passString = short_code + pass_key + formatted;
//   const base64Encoded = Buffer.from(passString).toString("base64");
//   return base64Encoded;
// };

// exports.token = catchAsyncErrors(async (req, res, next) => {
//   const url =
//     "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
//   const auth =
//     "Basic " +
//     Buffer.from(consumer_key + ":" + consumer_secret).toString("base64");
//   const headers = {
//     Authorization: auth,
//   };
//   axios
//     .get(url, {
//       headers: headers,
//     })
//     .then((response) => {
//       let data = response.data;
//       let access_token = data.access_token;
//       req.token = access_token;
//       next();
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

// exports.stkPush = catchAsyncErrors(async (req, res, next) => {
//   const phone = req.body.phone.substring(1); //formated to 72190........
//   const amount = req.body.amount;

//   const token = req.token;
//   const dt = datetime.create();
//   const formatted = dt.format("YmdHMS");
//   const headers = {
//     Authorization: "Bearer " + token,
//   };
//   const stkUrl =
//     "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
//   let data = {
//     BusinessShortCode: "174379",
//     Password: newPassword(),
//     Timestamp: formatted,
//     TransactionType: "CustomerPayBillOnline",
//     Amount: amount,
//     // PartyA: `${phoneNo}`,
//     PartyA: `254${phone}`,
//     PartyB: "174379",
//     // PhoneNumber: `${phoneNo}`,
//     PhoneNumber: `254${phone}`,
//     CallBackURL: "https://mydomain.com/pat",
//     AccountReference: "eShop",
//     TransactionDesc: "Lipa na M-PESA",
//   };
//   try {
//     await axios
//       .post(stkUrl, data, {
//         headers: headers,
//       })
//       .then((response) => {
//         res.send(response.data);
//       });
//   } catch (error) {
//     // console.log(error);
//     // return next(new ErrorHandler(error.message, 500));
//     return next(new ErrorHandler("Error occurred. Please try again", 500));
//   }
// });
