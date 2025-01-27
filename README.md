# iPay React Native SDK

## Overview

The iPay React Native SDK simplifies integrating the iPay payment gateway into your React Native application. It supports multiple payment channels and offers customizable components to streamline payment processing.

---

## Features

- **Reusable Components:** Includes default payment setup and buttons for specific payment modes.
- **Multiple Payment Channels:** Mpesa, Airtel, Card payments, and others enabled by default.
- **Secure Configurations:** Supports configuration of `vid` (Vendor ID), and `hashkey` securely.
- **Customizable Options:** Enable or disable specific payment channels based on your requirements. _work in progress_

---

## Installation

Install the SDK via npm:

```bash
npm install iPay-payment-gateway
```

Install the SDK via yarn:

```bash
yarn add iPay-payment-gateway
```

---

## Configuration

Before using the SDK, configure it with your credentials.

### Example Configuration:

```javascript
import {IPaySDK} from 'iPay-payment-gateway';

IPaySDK.configure({
  vid: '<your-vid>', // Vendor ID provided by iPay
  hashkey: '<your-hashkey>', // Secure hash key for authentication
});
```

---

## Components

### 1. **DefaultPayment**

This pre-configured component opens all available payment modes in a modal.

#### Usage:

```javascript
import {DefaultPayment} from 'iPay-payment-gateway';

const App = () => {
  return (
    <DefaultPayment
      iPayAPI="https://payments.ipayafrica.com/v3/ke"
      buttonText="Pay with iPay"
      style={{padding: 10, margin: 20}}
      textStyle={{color: 'white', fontWeight: 'bold'}}
      onClose={() => setModalVisible(false)}
      paymentParams={{
        live: '1',
        oid: 'OID67890',
        inv: 'INV12345',
        ttl: 10,
        tel: '0700000000',
        eml: 'example@example.com',
        vid: IPaySDK.config.vid,
        curr: 'KES',
        p1: '',
        p2: '',
        p3: '',
        p4: '',
        cst: '',
        crl: '',
        cbk: 'https://www.google.com',
      }}
      onPaymentInitiated={fields => console.log('Payment initiated:', fields)}
    />
  );
};

export default App;
```

#### Props:

| Prop        | Type     | Description                                        |
| ----------- | -------- | -------------------------------------------------- |
| `iPayAPI`    | `string` | URL for the iPay API.                             |
| `buttonText`  | `string` | Text displayed on the payment button                |
| `style` | `object`   | Styles applied to the payment button. |
| `textStyle`   | `object`   | Styles applied to the button text.    |
 `onClose`    | `func` | Callback triggered when the payment modal closes.                            |
| `paymentParams`  | `object` | Payment paramters required by the iPay API                |
| `onPaymentInitiated` | `func`   | Callback triggered when payment is initiated  |

---

### 2. **SinglePayment (WIP)**

This customizable button allows initiating payments for a specific payment mode.

#### Usage:

```javascript
import {SinglePayment} from 'iPay-payment-gateway';

const App = () => {
  return (
    <SinglePayment
      mode="mpesa"
      iPayAPI="https://payments.ipayafrica.com/v3/ke"
      onClose={() => setModalVisible(false)}
      paymentParams={{
        live: '1',
        oid: 'OID67890',
        inv: 'INV12345',
        ttl: 10,
        tel: '0700000000',
        eml: 'example@example.com',
        vid: IPaySDK.config.vid,
        curr: 'KES',
        p1: '',
        p2: '',
        p3: '',
        p4: '',
        cbk: 'https://www.google.com',
        cst: '',
        crl: '',
      }}
      style={{backgroundColor: 'indigo', padding: 10, margin: 20}}
      textStyle={{color: 'white', fontWeight: 'bold'}}
      onPaymentInitiated={fields => console.log('Payment initiated:', fields)}
    />
  );
};

export default App;
```

#### Props:

| Prop        | Type     | Description                                        |
| ----------- | -------- | -------------------------------------------------- |
| `mode`      | `string` | Payment mode (e.g., `Mpesa`, `Airtel`, etc).    |
| `iPayAPI`    | `string` | URL for the iPay API.  |
| `style` | `object`   | Styles applied to the payment button. |
| `textStyle`   | `object`   | Styles applied to the button text.    |
 `onClose`    | `func` | Callback triggered when the payment modal closes.                            |
| `paymentParams`  | `object` | Payment paramters required by the iPay API                |
| `onPaymentInitiated` | `func`   | Callback triggered when payment is initiated  |

---

## Example App

Explore our example app on [GitHub](https://github.com/thisgirlElan/iPay-payment-gateway/blob/master/example/src/App.jsx) in the example folder for a comprehensive implementation guide.

---

## Versioning

The SDK follows [semantic versioning](https://semver.org/). Regularly update to the latest version to access new features and bug fixes.

---

## Support

For questions, issues, or feature requests, create a GitHub issue in the [iPay SDK Repository](https://github.com/thisgirlElan/iPay-payment-gateway.git).

---

## License

This SDK is licensed under the MIT License. Refer to the LICENSE file for more details.
