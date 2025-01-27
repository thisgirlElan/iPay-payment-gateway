import CryptoJS from 'crypto-js';
import {DefaultPayment} from './components/DefaultPayment';
import {SinglePayment} from './components/SinglePayment';

const IPaySDK = {
  configure: ({hashkey, vid}) => {
    IPaySDK.config = {hashkey, vid};
  },

  generateHash: fields => {
    const dataString = Object.values(fields).join('');
    const hashkey = IPaySDK.config.hashkey;
    const generateHash = CryptoJS.HmacSHA1(dataString, hashkey).toString(
      CryptoJS.enc.Hex,
    );
    return generateHash;
  },

  validateModes: selectedMode => {
    console.log('Selected mode:', selectedMode);
    const modes = [
      'autopay',
      'mpesa',
      'airtel',
      'equity',
      'pesalink',
      'bonga',
      'vooma',
      'unionpay',
      'creditcard',
      'debitcard',
    ];
    return modes.reduce((acc, mode) => {
      acc[mode] = mode === selectedMode ? '0' : '1';
      return acc;
    }, {});
  },
};

export {IPaySDK, DefaultPayment, SinglePayment};
