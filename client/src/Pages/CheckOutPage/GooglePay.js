import React from 'react'
import GooglePayButton from '@google-pay/button-react';
const GooglePay = ({TotalPrice}) => {
    return (
        <GooglePayButton
            buttonColor="white"
            buttonType="book"
            buttonLocale="en"
            buttonSizeMode="fill"
            style={{ width: 240, height: 20 }}
            environment="TEST"
            paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                    {
                        type: 'CARD',
                        parameters: {
                            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                            allowedCardNetworks: ['MASTERCARD', 'VISA'],
                        },
                        tokenizationSpecification: {
                            type: 'PAYMENT_GATEWAY',
                            parameters: {
                                gateway: 'example',
                                gatewayMerchantId: 'exampleGatewayMerchantId',
                            },
                        },
                    },
                ],
                merchantInfo: {
                    merchantId: 'BCR2DN4TQDFMHTIC',
                    merchantName: 'Raha',
                },
                transactionInfo: {
                    totalPriceStatus: 'FINAL',
                    totalPriceLabel: 'Total',
                    totalPrice:TotalPrice,
                    currencyCode:'CAD',
                    countryCode: 'CA',
                },
            }}
            onLoadPaymentData={paymentRequest => {
                console.log('load payment data', paymentRequest);
            }}

        />
    )
}

export default GooglePay