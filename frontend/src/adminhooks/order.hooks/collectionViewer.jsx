import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create a PDF component to render the invoice
const CollectPDF = ({ order }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text>Ordererererere ID: {order.orderId}</Text>
          <Text>Kund: {order.customerNameFull}</Text>
          <Text>Leveranssätt: {order.deliveryMethod}</Text>
          <Text>Orderstatus: {order.orderStatus}</Text>
          <Text>Produkter:</Text>
          {order.products.map((product, index) => (
            <View key={index} style={styles.product}>
              <Text>Titel: {product.name}</Text>
              <Text>Pris: {product.price} SEK</Text>
              <Text>Antal: {product.quantity}</Text>
              <Text>Status: {product.status}</Text>
            </View>
          ))}
          <Text>Totalt: {calculateTotalValue(order)} SEK</Text>
        </View>
      </Page>
    </Document>
  );
};

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  product: {
    marginLeft: 10,
    marginTop: 5,
    padding: 5,
    border: '1px solid #ccc',
  },
});


const calculateTotalValue = (order) => {
  return order.products.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
};

// Render the PDF viewer component
const CollectionViewer = ({ order }) => {
  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <CollectPDF order={order} />
    </PDFViewer>
  );
};

export default CollectionViewer;
