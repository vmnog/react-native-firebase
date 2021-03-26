import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';
import IBookDTO from '../../dtos/IBookDTO';

const DetailsScreen: React.FC = () => {
  const route = useRoute();

  // @ts-ignore
  const book: IBookDTO = route.params.book;

  return (
    <View>
      <Text>id: {book.id}</Text>
      <Text>title: {book.title}</Text>
      <Text>author: {book.author}</Text>
    </View>
  );
};

export default DetailsScreen;
