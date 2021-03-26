import React, {useCallback, useEffect, useState} from 'react';
import {Button, Text, TouchableOpacity, View} from 'react-native';

import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import IBookDTO from '../../dtos/IBookDTO';

const BookList: React.FC = () => {
  const navigation = useNavigation();

  const [books, setBooks] = useState<IBookDTO[]>([] as IBookDTO[]);

  const getBooks = useCallback(() => {
    firestore().collection('books').onSnapshot(onResult, onError);
  }, []);

  const removeBook = (id: string) => {
    firestore().collection('books').doc(id).delete();
  };

  function onResult(QuerySnapshot: FirebaseFirestoreTypes.QuerySnapshot) {
    const booksCollection = QuerySnapshot.docs.map(book => ({
      id: book.ref.id,
      // @ts-ignore
      title: book._data.title,
      // @ts-ignore
      author: book._data.author,
    }));

    setBooks(booksCollection);
  }

  function onError(error: Error) {
    throw new Error(error.message);
  }

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  return (
    <View>
      {books.map(book => (
        <TouchableOpacity
          key={book.id}
          onPress={() =>
            navigation.navigate('Details', {
              book,
            })
          }
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 5,
          }}>
          <Text>
            {book.title} - {book.author}
          </Text>
          <View>
            <Button title="Remover" onPress={() => removeBook(book.id)} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BookList;
