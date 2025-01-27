import {SafeAreaView, Text, View} from 'react-native';
import {DefaultPayment, IPaySDK, SinglePayment} from './src/iPayPaymentGateway';
import React, {useState} from 'react';

IPaySDK.configure({
  hashkey: 'demoCHANGED',
  vid: 'demo',
});

const ExampleApp = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <Text>Hello World</Text>
      </View>
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

      <SinglePayment
        mode="creditcard"
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
          curr: 'kes',
          p1: '',
          p2: '',
          p3: '',
          p4: '',
          cbk: 'https://www.google.com',
          cst: '',
          crl: '',
        }}
        style={{backgroundColor: 'blue', padding: 10, margin: 20}}
        textStyle={{color: 'white', fontWeight: 'bold'}}
        onPaymentInitiated={fields => console.log('Payment initiated:', fields)}
      />
    </SafeAreaView>
  );
};

export default ExampleApp;
