import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { newsData } from '../data/newsData';

// Typdefinition für die News-Daten
type NewsItem = {
  id: string;
  title: string;
  description: string;
  date: string;
};

const NewsList = () => {
  const renderItem = ({ item }: { item: NewsItem }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>{item.description}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button>Mehr lesen</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={newsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    marginBottom: 10,
  },
});

export default NewsList;
