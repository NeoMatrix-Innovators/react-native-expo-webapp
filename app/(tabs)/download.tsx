import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable, Button } from 'react-native-paper';

const DownloadTable = () => {
  const data = [
    { id: '1', name: 'Datei1.pdf', size: '1.2 MB' },
    { id: '2', name: 'Bild2.png', size: '500 KB' },
    { id: '3', name: 'Dokument3.docx', size: '750 KB' },
  ];

  const handleDownload = (fileName: string) => {
    // Hier kommt der Download-Handler
    console.log(`Herunterladen: ${fileName}`);
    alert(`Download gestartet: ${fileName}`);
  };


  return (
    <View style={styles.container}>
      <DataTable>
        {/* Tabellenkopf */}
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title numeric>Größe</DataTable.Title>
          <DataTable.Title>Aktionen</DataTable.Title>
        </DataTable.Header>

        {/* Tabellendaten */}
        {data.map((item) => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell numeric>{item.size}</DataTable.Cell>
            <DataTable.Cell>
              <Button
                mode="contained"
                onPress={() => handleDownload(item.name)}
              >
                Download
              </Button>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
});

export default DownloadTable;
