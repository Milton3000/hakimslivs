import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';


const InvoicePDF = ({ order }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View>
          <View>
            <Text style={stylesHeaders.page}>Hakim Livs</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.headerText}>Faktura</Text>
          </View>

          <View style={styles.headerContent}>
            <View style={styles.box}>
              <Text style={styles.sectionHeader}>Fakturaadress</Text>
              <View style={styles.row}>
              <Text style={styles.rowFields}>{order.customerNameFull}</Text>
              </View>
              <View style={styles.row}>
              <Text style={styles.rowFields}>{order.customerAddress}</Text>
              </View>
              <View style={styles.row}>
              <Text style={styles.rowFields}>{order.customerEmail}</Text>
              </View>
              <View style={styles.row}>
              <Text style={styles.rowFields}>{order.customerPhone}</Text>
              </View>
            </View>
            <View style={styles.boxTwo}>
              <Text style={styles.sectionHeader}>Leveransadress</Text>
              <View style={styles.row}>
              <Text style={styles.rowFields}>{order.customerNameFull}</Text>
              </View>
              <View style={styles.row}>
              <Text style={styles.rowFields}>{order.customerAddress}</Text>
              </View>
              <View style={styles.row}>
              <Text style={styles.rowFields}>{order.customerEmail}</Text>
              </View>
              <View style={styles.row}>
              <Text style={styles.rowFields}>{order.customerPhone}</Text>
              </View>
            </View>
          </View>

          <View style={styles.subHeader}>
            <View>
              <View style={styles.section}>
                <View style={styles.infoHeader}>
                  <Text style={styles.otherFields}>Order:</Text>
                </View>
                <View style={styles.product}>
                  <Text style={styles.otherFields}>{order.orderId}</Text>
                </View>
              </View>
              <View style={styles.section}>
                <View style={styles.infoHeader}>
                  <Text style={styles.otherFields}>OCR:</Text>
                </View>
                <View style={styles.product}>
                  <Text style={styles.otherFields}>******************</Text>
                </View>
              </View>
            </View>

            <View style={styles.payBox}>
              <View style={styles.payRow}>
                <Text style={styles.otherFields}>Referens/OCR:</Text>
                <Text style={styles.otherFields}>******************</Text>
              </View>
              <View style={styles.payRow}>
                <Text style={styles.otherFields}>Förfallodatum</Text>
                <Text style={styles.otherFields}>******************</Text>
              </View>
              <View style={styles.payRow}>
                <Text style={styles.otherFields}>Bankgiro</Text>
                <Text style={styles.otherFields}>123-4567</Text>
              </View>
              <View style={styles.payRow}>
                <Text style={styles.otherFields}>Att betala</Text>
                <Text style={styles.otherFields}>{calculateTotalValue(order)} SEK</Text>
              </View>
            </View>

          </View>
        

        <View style={styles.section}>
          <View style={styles.productsHeader}>
            <Text style={styles.productName}>Artikel:</Text>
            <Text style={styles.otherFields}>Antal:</Text>
            <Text style={styles.otherFields}>á-pris:</Text>
            <Text style={styles.otherFields}>Belopp:</Text>
          </View>
          {order.products.map((product, index) => (
            <View key={index} style={styles.product}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.otherFields}>{product.quantity}</Text>
              <Text style={styles.otherFields}>{formatedPrice(product.price)}</Text>
              <Text style={styles.otherFields}>{calculateProductTotal(product.price, product.quantity)}</Text>
            </View>
          ))}

          <View style={styles.productTotal}>
            <Text>Summa totalt: {calculateTotalValue(order)} SEK</Text>
          </View>
        </View>
        </View>
        <View style={styles.footer}>
          <View>
            <Text>Adress</Text>
            <View style={styles.footerContent}>
              <Text>Storgatan 123</Text>
              <Text>123 34</Text>
              <Text>Stockholm</Text>
            </View>
          </View>
          <View>
            <Text>Telefon</Text>
            <View style={styles.footerContent}>
              <Text>0123-456789</Text>
            </View>
          </View>
          <View>
            <Text>Email</Text>
            <View style={styles.footerContent}>
              <Text>info@hakimlivs.se</Text>
            </View>
          </View>
          <View>
            <Text>Bankgiro</Text>
            <View style={styles.footerContent}>
              <Text>123-4567</Text>
            </View>
          </View>
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
    fontSize: 12,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 18,
    marginTop: -22,
    marginLeft: 220,
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  sectionHeader: {
    fontSize: 14,
    paddingBottom: 10,
  },
  section: {
    padding: 10,
  },
  subHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: 10,
  },
  boxTwo: {
    display: 'flex',
    flexDirection: 'column',

    width: '40%',
    padding: 10,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  payBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '50%',
    padding: 10,
    border: '1px solid #ccc',
  },
  payRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  infoHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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
  productTotal: {
    paddingTop: 30,
    marginLeft: 300,
    borderBottom: '1px solid #ccc',
  },
  otherFields: {
    flex: 1,
  },
  rowFields: {
    flex: 2,
    padding: 2,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    padding: 10,
    borderTop: '1px solid #ccc',
  },
  footerContent: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 10,
  },
});

const formatedPrice = (price) => {
  return price.toFixed(2).replace('.', ',');
};

const calculateProductTotal = (price, quantity) => {
  const total = price * quantity;
  return total.toFixed(2).replace('.', ',');
};

const calculateTotalValue = (order) => {
  return order.products.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2).replace('.', ',');
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
