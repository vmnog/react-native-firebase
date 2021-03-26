import React, {useCallback, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

interface IBookDTO {
  id: string;
  title: string;
  author: string;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<IBookDTO[]>([] as IBookDTO[]);

  const getBooks = useCallback(() => {
    firestore().collection('books').onSnapshot(onResult, onError);
  }, []);

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
      <TouchableOpacity onPress={getBooks}>
        <Text>Carregar livros</Text>
      </TouchableOpacity>
      {books.map(book => (
        <TouchableOpacity key={book.id}>
          <Text>
            {book.title} - {book.author}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BookList;
