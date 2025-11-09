import React from 'react';
import { Typography, Button, Input, Checkbox } from "@material-tailwind/react";
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

import { PDFDownloadLink } from '@react-pdf/renderer';
import QrInvoiceCode from "../../components/receipts/qrInvoiceCode";
import QRCode from 'qrcode';
// import ReceiptDocument from './ReceiptDocument'; // Assuming you saved the above component as ReceiptDocument.js

import { useEffect, useState } from 'react';
import { ClipLoader } from "react-spinners";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
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


const ReceiptDocument = ({ receiptData, qrCodeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Pago de agua</Text>
        {/* Optional: Add a logo */}
        {/* <Image src="path/to/your/logo.png" style={{ width: 50, height: 50, marginBottom: 10 }} /> */}
        <Text>Num. de Factura: {receiptData.invoiceId}</Text>
        <Text>Fecha: {receiptData.date}</Text>
        <Text>Usuario: {receiptData.customerName}</Text>
        <View style={{ marginTop: 20 }}>
          {receiptData.items.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text>{item.description}</Text>
              <Text>Bs. {item.amount}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.total}>Total: Bs.- {receiptData.total}</Text>
        {qrCodeData && (
          <Image src={qrCodeData} style={styles.qrCode} />
        )}
      </View>
    </Page>
  </Document>
);



const Collections = () =>{

  const [qrCodeData, setQrCodeData] = useState('');

  useEffect(() => {
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
      <Typography className='text-center' variant="h1" color="black">Deudas</Typography>
        <div className='flex justify-center'>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Nombre
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Monto a pagar
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {/* <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              /> */}
            </div>
            {/* <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            /> */}
      <PDFDownloadLink
        document={
          <ReceiptDocument
            receiptData={receiptData} 
            qrCodeData={qrCodeData} />
        }
        fileName="receipt.pdf"
      >
        {
          ({ blob, url, loading, error }) => {
            return loading ? 
              <ClipLoader
                loading={loading}
                // cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
               : <Button fullWidth> Pagar Deuda </Button>
          }
        }
      </PDFDownloadLink>

            {/* <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <a href="#" className="font-medium text-gray-900">
                Sign In
              </a>
            </Typography> */}
          </form>
        </div>

    </>
  )
}

export default Collections;