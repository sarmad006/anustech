import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'right',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    textAlign: 'right',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#bfbfbf',
  },
});

export const InvoicePDF = ({ invoice, client }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>חשבונית מס</Text>
        <Text style={styles.text}>מספר חשבונית: {invoice.number}</Text>
        <Text style={styles.text}>תאריך: {new Date(invoice.issueDate).toLocaleDateString('he-IL')}</Text>
        
        <View style={{ marginTop: 20 }}>
          <Text style={styles.subtitle}>פרטי לקוח</Text>
          <Text style={styles.text}>{client.name}</Text>
          <Text style={styles.text}>{client.contactName}</Text>
          <Text style={styles.text}>{client.phone}</Text>
          <Text style={styles.text}>{client.email}</Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.subtitle}>פרטי חשבונית</Text>
          <View style={styles.table}>
            {invoice.items.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={[styles.tableCell, { width: '40%' }]}>
                  <Text>{item.description}</Text>
                </View>
                <View style={[styles.tableCell, { width: '20%' }]}>
                  <Text>{item.quantity}</Text>
                </View>
                <View style={[styles.tableCell, { width: '20%' }]}>
                  <Text>₪{item.unitPrice.toLocaleString()}</Text>
                </View>
                <View style={[styles.tableCell, { width: '20%' }]}>
                  <Text>₪{item.total.toLocaleString()}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={{ marginTop: 'auto' }}>
          <Text style={styles.text}>סה״כ לתשלום: ₪{invoice.amount.toLocaleString()}</Text>
          <Text style={styles.text}>תאריך תשלום: {new Date(invoice.dueDate).toLocaleDateString('he-IL')}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export const GenerateInvoicePDF = ({ invoice, client }) => (
  <PDFDownloadLink
    document={<InvoicePDF invoice={invoice} client={client} />}
    fileName={`invoice-${invoice.number}.pdf`}
  >
    {({ loading }) =>
      loading ? 'מכין חשבונית...' : 'הורד חשבונית'
    }
  </PDFDownloadLink>
);