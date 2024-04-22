import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create a PDF component to render the invoice
const InvoicePDF = ({ order }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={stylesHeaders.page}>Hakim Livs</Text>
          <Text style={styles.page}>Faktura</Text>
        </View>


        <View style={styles.section}>
          <Text>Faktura</Text>
        </View>

        <View style={styles.section}>
          <Text>Order ID: {order.orderId}</Text>
          <Text>Kund: {order.customerNameFull}</Text>
          <Text>Leveranssätt: {order.deliveryMethod}</Text>
          <Text>Status: {order.orderStatus}</Text>
        </View>

        <View style={styles.section}>
          <Text>Products:</Text>
          {order.products.map((product, index) => (
            <View key={index} style={styles.product}>
              <Text>Title: {product.name}</Text>
              <Text>Price: {product.price} SEK</Text>
              <Text>Quantity: {product.quantity}</Text>
              <Text>Status: {product.status}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text>Total: {calculateTotalValue(order)} SEK</Text>
        </View>
      </Page>
    </Document>
  );
};

const stylesHeaders = StyleSheet.create({
  page: {
    paddingLeft: -20,
    textAlign: 'left',
    color: '#0000FF',
    fontSize: 26,
    fontWeight: 'normal',
  },
});

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  product: {
    marginLeft: 10,
    marginTop: 5,
    padding: 5,
    // border: '1px solid #ccc',
  },
});


const calculateTotalValue = (order) => {
  return order.products.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
};

// Render the PDF viewer component
const InvoiceViewer = ({ order }) => {
  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <InvoicePDF order={order} />
    </PDFViewer>
  );
};

export default InvoiceViewer;
