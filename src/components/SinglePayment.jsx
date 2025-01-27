import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import WebView from 'react-native-webview';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import PropTypes from 'prop-types';
import {styles} from './style';
import {IPaySDK} from '../iPayPaymentGateway';

const SinglePayment = ({
  mode,
  onClose,
  paymentParams,
  iPayAPI,
  onPaymentInitiated,
  style,
  textStyle,
}) => {
  const [loading, setLoading] = useState(false);
  const slideAnim = useRef(new Animated.Value(1000)).current;
  const [visible, setVisible] = useState(false);
  const [responseURL, setResponseURL] = useState(null);
  const [htmlContent, setHtmlContent] = useState('');

  const modeFields = IPaySDK.validateModes(mode);

  // const modeQuery = Object.entries(modeFields)
  //   .map(([key, value]) => `${key}=${value}`)
  //   .join('&');

  const generateModeQuery = selectedMode => {
    const modeFields = IPaySDK.validateModes(selectedMode);
    return Object.entries(modeFields)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  };

  const requestURL = `${iPayAPI}?${generateModeQuery(mode)}`;

  console.log('requesturl', requestURL);

  const requiredFields = [
    'live',
    'oid',
    'inv',
    'ttl',
    'tel',
    'eml',
    'vid',
    'curr',
    'cbk',
  ];
  const missingFields = requiredFields.filter(field => !paymentParams[field]);
  if (missingFields.length > 0) {
    Alert.alert('Error', `Missing fields: ${missingFields.join(', ')}`);
    return null;
  }

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 1000,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handlePayment = async () => {
    setLoading(true);
    setVisible(true);

    const fields = {...paymentParams};
    fields.hsh = IPaySDK.generateHash(fields);

    try {
      onPaymentInitiated(fields);

      const response = await axios.post(requestURL, fields, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        maxRedirects: 0,
        validateStatus: status => status < 500,
      });

      console.log('resp', response);

      if (response.status >= 200 && response.status < 300) {
        if (response.headers['content-type']?.includes('text/html')) {
          const successResponse =
            response.request.responseURL.includes('payment-api-v4');

          if (successResponse) {
            console.log('succRESP', response.request.responseURL);

            setHtmlContent(null);
            setResponseURL(response.request.responseURL);
          } else {
            setHtmlContent(response.data);
            setResponseURL(null);
          }}
      } else if (response.status >= 300 && response.status < 400) {
        const redirectUrl = response.headers['location'];
        if (redirectUrl) {
          setHtmlContent(
            `<meta http-equiv="refresh" content="0; url=${redirectUrl}" />`,
          );
        } else {
          Alert.alert('Error', 'Redirect URL not found.');
        }
      } else {
        Alert.alert('Error', `Unexpected response: ${response.status}`);
      }
    } catch (error) {
      console.error('Payment request error:', error);
      Alert.alert('Error', 'Failed to process the payment request.');
    } finally {
      setLoading(false);
    }
  };

  const renderErrorView = () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Payment process failed. Please try again.</Text>
      <TouchableOpacity onPress={handlePayment}>
        <Text style={{color: 'blue'}}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <TouchableOpacity style={[styles.button, style]} onPress={handlePayment}>
        <Text style={[styles.buttonText, textStyle]}>{loading ? 'Processing..' : `Pay with ${mode}`}</Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={() => {
          setVisible(false);
          onClose && onClose();
        }}>
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.animatedContainer,
                {transform: [{translateY: slideAnim}]},
              ]}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Pay with {mode}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setVisible(false);
                    onClose && onClose();
                  }}>
                  <Text style={styles.closeButton}>Close</Text>
                </TouchableOpacity>
              </View>
              {loading && <ActivityIndicator size="large" color="#000" />}
              <WebView
                originWhitelist={['*']}
                source={
                  responseURL
                    ? {uri: responseURL}
                    : htmlContent
                    ? {html: htmlContent}
                    : undefined
                }
                renderError={renderErrorView}
                onLoad={() => setLoading(false)}
                onError={renderErrorView}
                style={{flex: 1}}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

SinglePayment.propTypes = {
  mode: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  paymentParams: PropTypes.shape({
    live: PropTypes.string.isRequired,
    oid: PropTypes.string.isRequired,
    inv: PropTypes.string.isRequired,
    ttl: PropTypes.number.isRequired,
    tel: PropTypes.string.isRequired,
    eml: PropTypes.string.isRequired,
    vid: PropTypes.string.isRequired,
    curr: PropTypes.string.isRequired,
    p1: PropTypes.string,
    p2: PropTypes.string,
    p3: PropTypes.string,
    p4: PropTypes.string,
    cbk: PropTypes.string.isRequired,
  }).isRequired,
  iPayAPI: PropTypes.string,
  onPaymentInitiated: PropTypes.func,
  style: PropTypes.object,
  textStyle: PropTypes.object,
};

export {SinglePayment};
