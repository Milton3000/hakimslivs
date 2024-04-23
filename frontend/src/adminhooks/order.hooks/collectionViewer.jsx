import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const CollectPDF = ({ order }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View>
          <Text style={stylesHeaders.page}>Hakim Livs</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.contentHeader}>Plocklista</Text>
        </View>

        <View style={styles.section}>
          <Text>Order: {order.orderId}</Text>
          <Text>Kund: {order.customerNameFull}</Text>
          <Text>Leveranssätt: {order.deliveryMethod}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.productsHeader}>
            <Text style={styles.productName}>Artikel:</Text>
            <Text style={styles.otherFields}>Antal:</Text>
            <Text style={styles.otherFields}>Plockad:</Text>
            <Text style={styles.otherFields}>Status:</Text>
          </View>
          {order.products.map((product, index) => (
            <View key={index} style={styles.product}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.otherFields}>{product.quantity}</Text>
              <Text style={styles.otherFields}>____</Text>
              <Text style={styles.otherFields}>{product.status}</Text>
            </View>
          ))}
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
    fontSize: 14,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  contentHeader: {
    fontSize: 18,
    marginTop: -22,
    marginLeft: 220,
  },
  productsHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: '1px solid #ccc',
    width: '100%',
  },
  product: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    width: '100%',
  },
  productName: {
    flex: 2,
    paddingRight: 10,
  },
  otherFields: {
    flex: 1,
    textAlign: 'center',
  },
});

const CollectionViewer = ({ order }) => {
  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <CollectPDF order={order} />
    </PDFViewer>
  );
};

export default CollectionViewer;
