const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const Order = require("../model/order");
const Shop = require("../model/shop");
const Product = require("../model/product");
const sendMail = require("../utils/sendMail");

// create new order
router.post(
  "/create-order",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;
      console.log(shippingAddress);

      //   group cart items by shopId
      const shopItemsMap = new Map();

      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, []);
        }
        shopItemsMap.get(shopId).push(item);
      }
      const shopEmailsMap = new Map();

      for (const shopId of shopItemsMap.keys()) {
        const shop = await Shop.findById(shopId); // Replace with your method to fetch shop details

        if (shop) {
          shopEmailsMap.set(shopId, shop.email);
        }
      }

      // create an order for each shop
      const orders = [];

      for (const [shopId, items] of shopItemsMap) {
        const shopEmail = shopEmailsMap.get(shopId);
        const order = await Order.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
        });
        // console.log(order);
        const subTotals = order?.cart.reduce(
          (acc, item) => acc + item.qty * item.discountPrice,
          0
        );
        await sendMail({
          email: user.email,
          subject: "Order Confirmation",
          html: `<!DOCTYPE html>
          <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              <title>Simple Transactional Email</title>
              <style>
                @media only screen and (max-width: 620px) {
                  table.body h1 {
                    font-size: 28px !important;
                    margin-bottom: 10px !important;
                  }
          
                  table.body p,
                  table.body ul,
                  table.body ol,
                  table.body td,
                  table.body span,
                  table.body a {
                    font-size: 16px !important;
                  }
          
                  table.body .wrapper,
                  table.body .article {
                    padding: 10px !important;
                  }
          
                  table.body .content {
                    padding: 0 !important;
                  }
          
                  table.body .container {
                    padding: 0 !important;
                    width: 100% !important;
                  }
          
                  table.body .main {
                    border-left-width: 0 !important;
                    border-radius: 0 !important;
                    border-right-width: 0 !important;
                  }
          
                  table.body .btn table {
                    width: 100% !important;
                  }
          
                  table.body .btn a {
                    width: 100% !important;
                  }
          
                  table.body .img-responsive {
                    height: auto !important;
                    max-width: 100% !important;
                    width: auto !important;
                  }
                }
                @media all {
                  .ExternalClass {
                    width: 100%;
                  }
          
                  .ExternalClass,
                  .ExternalClass p,
                  .ExternalClass span,
                  .ExternalClass font,
                  .ExternalClass td,
                  .ExternalClass div {
                    line-height: 100%;
                  }
          
                  .apple-link a {
                    color: inherit !important;
                    font-family: inherit !important;
                    font-size: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                    text-decoration: none !important;
                  }
          
                  #MessageViewBody a {
                    color: inherit;
                    text-decoration: none;
                    font-size: inherit;
                    font-family: inherit;
                    font-weight: inherit;
                    line-height: inherit;
                  }
          
                  .btn-primary table td:hover {
                    background-color: #34495e !important;
                  }
          
                  .btn-primary a:hover {
                    background-color: #34495e !important;
                    border-color: #34495e !important;
                  }
                }
              </style>
            </head>
            <body
              style="
                background-color: #f6f6f6;
                font-family: sans-serif;
                -webkit-font-smoothing: antialiased;
                font-size: 14px;
                line-height: 1.4;
                margin: 0;
                padding: 0;
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
              "
            >
              <span
                class="preheader"
                style="
                  color: transparent;
                  display: none;
                  height: 0;
                  max-height: 0;
                  max-width: 0;
                  opacity: 0;
                  overflow: hidden;
                  mso-hide: all;
                  visibility: hidden;
                  width: 0;
                "
                >eShop</span
              >
              <table
                role="presentation"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="body"
                style="
                  border-collapse: separate;
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  background-color: #f6f6f6;
                  width: 100%;
                "
                width="100%"
                bgcolor="#f6f6f6"
              >
                <tr>
                  <td
                    style="font-family: sans-serif; font-size: 14px; vertical-align: top"
                    valign="top"
                  >
                    &nbsp;
                  </td>
                  <td
                    class="container"
                    style="
                      font-family: sans-serif;
                      font-size: 14px;
                      vertical-align: top;
                      display: block;
                      max-width: 580px;
                      padding: 10px;
                      width: 580px;
                      margin: 0 auto;
                    "
                    width="580"
                    valign="top"
                  >
                    <div
                      class="content"
                      style="
                        box-sizing: border-box;
                        display: block;
                        margin: 0 auto;
                        max-width: 580px;
                        padding: 10px;
                      "
                    >
                      <!-- START CENTERED WHITE CONTAINER -->
                      <table
                        role="presentation"
                        class="main"
                        style="
                          border-collapse: separate;
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          background: #ffffff;
                          border-radius: 3px;
                          width: 100%;
                        "
                        width="100%"
                      >
                        <!-- START MAIN CONTENT AREA -->
                        <tr>
                          <td
                            class="wrapper"
                            style="
                              font-family: sans-serif;
                              font-size: 14px;
                              vertical-align: top;
                              box-sizing: border-box;
                              padding: 20px;
                            "
                            valign="top"
                          >
                            <table
                              role="presentation"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              style="
                                border-collapse: separate;
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                width: 100%;
                              "
                              width="100%"
                            >
                              <tr>
                                <td
                                  style="
                                    font-family: sans-serif;
                                    font-size: 14px;
                                    vertical-align: top;
                                  "
                                  valign="top"
                                >
                                  <div
                                    style="
                                      display: flex;
                                      justify-content: center;
                                      align-items: center;
                                      margin-bottom: 25px;
                                    "
                                  >
                                    <img
                                      src="https://res.cloudinary.com/bramuels/image/upload/v1686982779/logo_kp04bo.svg"
                                      alt="eShoplogo"
                                    />
                                  </div>
          
                                  <h2>Thanks for shopping with us</h2>
                                  <p>Hello ${user.name},</p>
                                  <p>
                                    We have received your order and it's being processed.
                                  </p>
                                  <h2>
                                    Order No.
                                    ${order._id
                                      .toString()
                                      .replace(/\D/g, "")
                                      .slice(0, 10)}
                                  </h2>
                                  <h4>
                                  Ordered on: (${order.createdAt
                                    .toString()
                                    .substring(0, 10)})</h4>
                                  <table>
                                    <thead>
                                      <tr>
                                      <td style="padding-right: 20px;"><strong>Product(s)</strong></td>
                                      <td style="padding-right: 10px;"><strong>Quantity</strong></td>
                                      <td "text-align: right;"><strong align="right">Price</strong></td>
                                      </tr>
                                    </thead>
          
                                    <tbody>
                                      ${cart
                                        .map(
                                          (item) => `
                                      <tr>
                                        <td>${item.name}</td>
                                        <td align="center">${item.qty}</td>
                                        <td align="right">Ksh. ${item.discountPrice
                                          .toString()
                                          .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ","
                                          )}</td>
                                      </tr>
                                      `
                                        )
                                        .join("\n")}
                                    </tbody>
                                    <br/>
                                    <tfoot>
                                      <tr>
                                        <td colspan="2">Items Price:</td>
                                        <td align="right">Ksh. ${subTotals
                                          .toString()
                                          .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ","
                                          )}</td>
                                      </tr>
                                      <tr>
                                        <td colspan="2">Shipping Price:</td>
                                        <td align="right">Ksh. ${Math.round(
                                          subTotals * 0.1
                                        )
                                          .toString()
                                          .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ","
                                          )}</td>
                                      </tr>
                                      <tr>
                                        <td colspan="2">Discount: </td>
                                        <td align="right">Ksh. ${Math.round(
                                          order?.totalPrice -
                                            Math.round(subTotals * 0.1) -
                                            subTotals
                                        )
                                          .toString()
                                          .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ","
                                          )}</td>
                                      </tr>
                                      <br/>
                                      <tr>
                                        <td colspan="2"><strong>Total Price:</strong></td>
                                      
                                        <td align="right">
                                          <strong> Ksh. ${Math.round(totalPrice)
                                            .toString()
                                            .replace(
                                              /\B(?=(\d{3})+(?!\d))/g,
                                              ","
                                            )}</strong>
                                        </td>
                                      
                                      </tr>
                                      <br/><br/>
                                      <tr>
                                        <td colspan="2">Payment Method:</td>
                                        <td align="right">${
                                          paymentInfo.type
                                        }</td>
                                      </tr>
                                      <tr>
                                        <td colspan="2">Payment Status:</td>
                                        <td align="right">${
                                          paymentInfo.status
                                            ? paymentInfo.status
                                            : "Not paid"
                                        }</td>
                                      </tr>
                                    </tfoot>
                                  </table>
          
                                  <h2>Shipping address</h2>
                                  <p>
                                    ${shippingAddress.address1},<br />
                                    ${shippingAddress.address2},<br />
                                    ${shippingAddress.city},<br />
                                    ${shippingAddress.country}<br />
                                  </p>
                                  <hr />
                                  <p>Thanks for shopping with us.</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
          
                        <!-- END MAIN CONTENT AREA -->
                      </table>
                      <!-- END CENTERED WHITE CONTAINER -->
          
                      <!-- START FOOTER -->
                      <div
                        class="footer"
                        style="
                          clear: both;
                          margin-top: 10px;
                          text-align: center;
                          width: 100%;
                        "
                      >
                        <table
                          role="presentation"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          style="
                            border-collapse: separate;
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            width: 100%;
                          "
                          width="100%"
                        >
                          <tr>
                            <td
                              class="content-block"
                              style="
                                font-family: sans-serif;
                                vertical-align: top;
                                padding-bottom: 10px;
                                padding-top: 10px;
                                color: #999999;
                                font-size: 12px;
                                text-align: center;
                              "
                              valign="top"
                              align="center"
                            >
                              <span
                                class="apple-link"
                                style="
                                  color: #999999;
                                  font-size: 12px;
                                  text-align: center;
                                "
                                >eShop Online Shop, Kahawa Shukari, Baringo Road</span
                              >
                              <br />
                              Don't like receiving <b>eShop</b> emails?
                              <a
                                href="http://localhost:3000/unsubscribe"
                                style="
                                  text-decoration: underline;
                                  color: #999999;
                                  font-size: 12px;
                                  text-align: center;
                                "
                                >Unsubscribe</a
                              >.
                            </td>
                          </tr>
                          <tr>
                            <td
                              class="content-block powered-by"
                              style="
                                font-family: sans-serif;
                                vertical-align: top;
                                padding-bottom: 10px;
                                padding-top: 10px;
                                color: #999999;
                                font-size: 12px;
                                text-align: center;
                              "
                              valign="top"
                              align="center"
                            >
                              <a
                                href="http://htmlemail.io"
                                style="
                                  color: #999999;
                                  font-size: 12px;
                                  text-align: center;
                                  text-decoration: none;
                                "
                                >&copy; ${new Date().getFullYear()} eShop. All rights
                                reserved.</a
                              >.
                            </td>
                          </tr>
                        </table>
                      </div>
                      <!-- END FOOTER -->
                    </div>
                  </td>
                  <td
                    style="font-family: sans-serif; font-size: 14px; vertical-align: top"
                    valign="top"
                  >
                    &nbsp;
                  </td>
                </tr>
              </table>
            </body>
          </html>
          `,
        });
        await sendMail({
          email: shopEmail,
          subject: "New Order Notification",
          html: `<!DOCTYPE html>
          <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              <title>Simple Transactional Email</title>
              <style>
                @media only screen and (max-width: 620px) {
                  table.body h1 {
                    font-size: 28px !important;
                    margin-bottom: 10px !important;
                  }
          
                  table.body p,
                  table.body ul,
                  table.body ol,
                  table.body td,
                  table.body span,
                  table.body a {
                    font-size: 16px !important;
                  }
          
                  table.body .wrapper,
                  table.body .article {
                    padding: 10px !important;
                  }
          
                  table.body .content {
                    padding: 0 !important;
                  }
          
                  table.body .container {
                    padding: 0 !important;
                    width: 100% !important;
                  }
          
                  table.body .main {
                    border-left-width: 0 !important;
                    border-radius: 0 !important;
                    border-right-width: 0 !important;
                  }
          
                  table.body .btn table {
                    width: 100% !important;
                  }
          
                  table.body .btn a {
                    width: 100% !important;
                  }
          
                  table.body .img-responsive {
                    height: auto !important;
                    max-width: 100% !important;
                    width: auto !important;
                  }
                }
                @media all {
                  .ExternalClass {
                    width: 100%;
                  }
          
                  .ExternalClass,
                  .ExternalClass p,
                  .ExternalClass span,
                  .ExternalClass font,
                  .ExternalClass td,
                  .ExternalClass div {
                    line-height: 100%;
                  }
          
                  .apple-link a {
                    color: inherit !important;
                    font-family: inherit !important;
                    font-size: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                    text-decoration: none !important;
                  }
          
                  #MessageViewBody a {
                    color: inherit;
                    text-decoration: none;
                    font-size: inherit;
                    font-family: inherit;
                    font-weight: inherit;
                    line-height: inherit;
                  }
          
                  .btn-primary table td:hover {
                    background-color: #34495e !important;
                  }
          
                  .btn-primary a:hover {
                    background-color: #34495e !important;
                    border-color: #34495e !important;
                  }
                }
              </style>
            </head>
            <body
              style="
                background-color: #f6f6f6;
                font-family: sans-serif;
                -webkit-font-smoothing: antialiased;
                font-size: 14px;
                line-height: 1.4;
                margin: 0;
                padding: 0;
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
              "
            >
              <span
                class="preheader"
                style="
                  color: transparent;
                  display: none;
                  height: 0;
                  max-height: 0;
                  max-width: 0;
                  opacity: 0;
                  overflow: hidden;
                  mso-hide: all;
                  visibility: hidden;
                  width: 0;
                "
                >eShop</span
              >
              <table
                role="presentation"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="body"
                style="
                  border-collapse: separate;
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  background-color: #f6f6f6;
                  width: 100%;
                "
                width="100%"
                bgcolor="#f6f6f6"
              >
                <tr>
                  <td
                    style="font-family: sans-serif; font-size: 14px; vertical-align: top"
                    valign="top"
                  >
                    &nbsp;
                  </td>
                  <td
                    class="container"
                    style="
                      font-family: sans-serif;
                      font-size: 14px;
                      vertical-align: top;
                      display: block;
                      max-width: 580px;
                      padding: 10px;
                      width: 580px;
                      margin: 0 auto;
                    "
                    width="580"
                    valign="top"
                  >
                    <div
                      class="content"
                      style="
                        box-sizing: border-box;
                        display: block;
                        margin: 0 auto;
                        max-width: 580px;
                        padding: 10px;
                      "
                    >
                      <!-- START CENTERED WHITE CONTAINER -->
                      <table
                        role="presentation"
                        class="main"
                        style="
                          border-collapse: separate;
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          background: #ffffff;
                          border-radius: 3px;
                          width: 100%;
                        "
                        width="100%"
                      >
                        <!-- START MAIN CONTENT AREA -->
                        <tr>
                          <td
                            class="wrapper"
                            style="
                              font-family: sans-serif;
                              font-size: 14px;
                              vertical-align: top;
                              box-sizing: border-box;
                              padding: 20px;
                            "
                            valign="top"
                          >
                            <table
                              role="presentation"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              style="
                                border-collapse: separate;
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                width: 100%;
                              "
                              width="100%"
                            >
                              <tr>
                                <td
                                  style="
                                    font-family: sans-serif;
                                    font-size: 14px;
                                    vertical-align: top;
                                  "
                                  valign="top"
                                >
                                  <div
                                    style="
                                      display: flex;
                                      justify-content: center;
                                      align-items: center;
                                      margin-bottom: 25px;
                                    "
                                  >
                                    <img
                                      src="https://res.cloudinary.com/bramuels/image/upload/v1686982779/logo_kp04bo.svg"
                                      alt="eShoplogo"
                                    />
                                  </div>
          
                                  <h2>Thanks for shopping with us</h2>
                                  <p>Hello ${user.name},</p>
                                  <p>
                                    We have received your order and it's being processed.
                                  </p>
                                  <h2>
                                    Order No.
                                    ${order._id
                                      .toString()
                                      .replace(/\D/g, "")
                                      .slice(0, 10)}
                                  </h2>
                                  <h4>
                                  Ordered on: (${order.createdAt
                                    .toString()
                                    .substring(0, 10)})</h4>
                                  <table>
                                    <thead>
                                      <tr>
                                      <td style="padding-right: 20px;"><strong>Product(s)</strong></td>
                                      <td style="padding-right: 10px;"><strong>Quantity</strong></td>
                                      <td style="text-align: right;"><strong>Price</strong></td>
                                      </tr>
                                    </thead>
          
                                    <tbody>
                                      ${cart
                                        .map(
                                          (item) => `
                                      <tr>
                                        <td>${item.name}</td>
                                        <td align="center">${item.qty}</td>
                                        <td align="right">Ksh. ${item.discountPrice
                                          .toString()
                                          .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ","
                                          )}</td>
                                      </tr>
                                      `
                                        )
                                        .join("\n")}
                                    </tbody>
                                    <br/>
                                    <tfoot>
                                      <tr>
                                        <td colspan="2">Items Price:</td>
                                        <td align="right">Ksh. ${subTotals
                                          .toString()
                                          .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ","
                                          )}</td>
                                      </tr>
                                      <tr>
                                        <td colspan="2">Shipping Price:</td>
                                        <td align="right">Ksh. ${Math.round(
                                          subTotals * 0.1
                                        )
                                          .toString()
                                          .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ","
                                          )}</td>
                                      </tr>
                                      <tr>
                                        <td colspan="2">Discount: </td>
                                        <td align="right">Ksh. ${Math.round(
                                          order?.totalPrice -
                                            Math.round(subTotals * 0.1) -
                                            subTotals
                                        )
                                          .toString()
                                          .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ","
                                          )}</td>
                                      </tr>
                                      <br/>
                                      <tr>
                                        <td colspan="2"><strong>Total Price:</strong></td>
                                      
                                        <td align="right">
                                          <strong> Ksh. ${Math.round(totalPrice)
                                            .toString()
                                            .replace(
                                              /\B(?=(\d{3})+(?!\d))/g,
                                              ","
                                            )}</strong>
                                        </td>
                                      
                                      </tr>
                                      <br/><br/>
                                      <tr>
                                        <td colspan="2">Payment Method:</td>
                                        <td align="right">${
                                          paymentInfo.type
                                        }</td>
                                      </tr>
                                      <tr>
                                        <td colspan="2">Payment Status:</td>
                                        <td align="right">${
                                          paymentInfo.status
                                            ? paymentInfo.status
                                            : "Not paid"
                                        }</td>
                                      </tr>
                                    </tfoot>
                                  </table>
          
                                  <h2>Shipping address</h2>
                                  <p>
                                   
                                    ${shippingAddress.town},<br />
                                    ${shippingAddress.county},<br />
                                    ${shippingAddress.country}<br />
                                  </p>
                                  <hr />
                                  <p>Thanks for shopping with us.</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
          
                        <!-- END MAIN CONTENT AREA -->
                      </table>
                      <!-- END CENTERED WHITE CONTAINER -->
          
                      <!-- START FOOTER -->
                      <div
                        class="footer"
                        style="
                          clear: both;
                          margin-top: 10px;
                          text-align: center;
                          width: 100%;
                        "
                      >
                        <table
                          role="presentation"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          style="
                            border-collapse: separate;
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            width: 100%;
                          "
                          width="100%"
                        >
                          <tr>
                            <td
                              class="content-block"
                              style="
                                font-family: sans-serif;
                                vertical-align: top;
                                padding-bottom: 10px;
                                padding-top: 10px;
                                color: #999999;
                                font-size: 12px;
                                text-align: center;
                              "
                              valign="top"
                              align="center"
                            >
                              <span
                                class="apple-link"
                                style="
                                  color: #999999;
                                  font-size: 12px;
                                  text-align: center;
                                "
                                >eShop Online Shop, Kahawa Shukari, Baringo Road</span
                              >
                              <br />
                              Don't like receiving <b>eShop</b> emails?
                              <a
                                href="http://localhost:3000/unsubscribe"
                                style="
                                  text-decoration: underline;
                                  color: #999999;
                                  font-size: 12px;
                                  text-align: center;
                                "
                                >Unsubscribe</a
                              >.
                            </td>
                          </tr>
                          <tr>
                            <td
                              class="content-block powered-by"
                              style="
                                font-family: sans-serif;
                                vertical-align: top;
                                padding-bottom: 10px;
                                padding-top: 10px;
                                color: #999999;
                                font-size: 12px;
                                text-align: center;
                              "
                              valign="top"
                              align="center"
                            >
                              <a
                                href="http://htmlemail.io"
                                style="
                                  color: #999999;
                                  font-size: 12px;
                                  text-align: center;
                                  text-decoration: none;
                                "
                                >&copy; ${new Date().getFullYear()} eShop. All rights
                                reserved.</a
                              >.
                            </td>
                          </tr>
                        </table>
                      </div>
                      <!-- END FOOTER -->
                    </div>
                  </td>
                  <td
                    style="font-family: sans-serif; font-size: 14px; vertical-align: top"
                    valign="top"
                  >
                    &nbsp;
                  </td>
                </tr>
              </table>
            </body>
          </html>
          `,
        });
        orders.push(order);
      }

      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all orders of user
router.get(
  "/get-all-orders/:userId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({ "user._id": req.params.userId }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all orders of seller
router.get(
  "/get-seller-all-orders/:shopId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({
        "cart.shopId": req.params.shopId,
      }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update order status for seller
router.put(
  "/update-order-status/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      console.log(order);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }
      if (req.body.status === "Transferred to delivery partner") {
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });
      }

      order.status = req.body.status;

      if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
        order.paymentInfo.status = "Succeeded";
        const serviceCharge = order.totalPrice * 0.1;
        await updateSellerInfo(order.totalPrice - serviceCharge);
      }

      await order.save({ validateBeforeSave: false });
      res.status(200).json({
        success: true,
        order,
      });

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock -= qty;
        product.sold_out += qty;

        await product.save({ validateBeforeSave: false });
      }

      async function updateSellerInfo(amount) {
        const seller = await Shop.findById(req.seller.id);

        seller.availableBalance = amount;

        await seller.save();
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// give a refund ----- user
router.put(
  "/order-refund/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      order.status = req.body.status;

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
        message: "Order Refund Request successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// accept the refund ---- seller
router.put(
  "/order-refund-success/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      order.status = req.body.status;

      await order.save();

      res.status(200).json({
        success: true,
        message: "Order Refund successfull!",
      });

      if (req.body.status === "Refund Success") {
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });
      }

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock += qty;
        product.sold_out -= qty;

        await product.save({ validateBeforeSave: false });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all orders --- for admin
router.get(
  "/admin-all-orders",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find().sort({
        deliveredAt: -1,
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
