import React from 'react';
import { Typography, Button } from "@material-tailwind/react";
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

import { PDFDownloadLink } from '@react-pdf/renderer';
import QrInvoiceCode from "../../components/receipts/qrInvoiceCode";
import QRCode from 'qrcode';
// import ReceiptDocument from './ReceiptDocument'; // Assuming you saved the above component as ReceiptDocument.js


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  total: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  qrCode: {
    width: 100,
    height: 100,
    marginTop: 20,
    alignSelf: 'center',
  },
});


const ReceiptDocument = ({ receiptData, qrCodeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Receipt</Text>
        {/* Optional: Add a logo */}
        {/* <Image src="path/to/your/logo.png" style={{ width: 50, height: 50, marginBottom: 10 }} /> */}
        <Text>Invoice ID: {receiptData.invoiceId}</Text>
        <Text>Date: {receiptData.date}</Text>
        <Text>Customer: {receiptData.customerName}</Text>
        <View style={{ marginTop: 20 }}>
          {receiptData.items.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text>{item.description}</Text>
              <Text>${item.amount}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.total}>Total: ${receiptData.total}</Text>
        {qrCodeData && (
          <Image src={qrCodeData} style={styles.qrCode} />
        )}
      </View>
    </Page>
  </Document>
);

const MyReceiptGenerator = () => {
  const receiptData = {
    invoiceId: 'INV-001',
    date: '2025-09-27',
    customerName: 'John Doe',
    items: [
      { description: 'Product A', amount: 15.00 },
      { description: 'Product B', amount: 25.50 },
    ],
    total: 40.50,
  };

  const [qrCodeData, setQrCodeData] = React.useState('');

  React.useEffect(() => {
    const generateQRCode = async () => {
      try {
        const qrCodeUrl = `Invoice: ${receiptData.invoiceId}, Total: $${receiptData.total}`;
        const qrDataURL = await QRCode.toDataURL(qrCodeUrl, { errorCorrectionLevel: 'H' });
        setQrCodeData(qrDataURL);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQRCode();
  }, [receiptData]);

  return (
    <div>
      <h1>Generate Receipt</h1>
      <PDFDownloadLink
        document={<ReceiptDocument receiptData={receiptData} qrCodeData={qrCodeData} />}
        fileName="receipt.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download Receipt'
        }
      </PDFDownloadLink>
    </div>
  );
};

const Debts = () =>{
  const receiptData = {
    invoiceId: 1,
    date: '10/12/2025',
    customerName:'Sergio Cardenas',
    items:[
      {
        description:'product1',
        amount:'2'
      },
      {
        description:'product1',
        amount:'2'
      },{
        description:'product1',
        amount:'2'
      }
    ],
    total:'123'
  }

  const [qrCodeData, setQrCodeData] = React.useState('');

  React.useEffect(() => {
    const generateQRCode = async () => {
      try {
        const qrCodeUrl = `Invoice: ${receiptData.invoiceId}, Total: $${receiptData.total}`;
        const qrDataURL = await QRCode.toDataURL(qrCodeUrl, { errorCorrectionLevel: 'H' });
        setQrCodeData(qrDataURL);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQRCode();
  }, [receiptData]);

  return(
    <>
      <Typography className='text-center' variant="h3" color="black">Deudas</Typography>

      <Button>
        Pagar Recibo
      </Button>

      <PDFDownloadLink
        document={<ReceiptDocument receiptData={receiptData} qrCodeData={qrCodeData} />}
        fileName="receipt.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download Receipt with QR Code'
        }
      </PDFDownloadLink>

      <MyReceiptGenerator/>

      <QrInvoiceCode invoiceDataUrl={'www.google.com'} />
    </>
  )
}

export default Debts;