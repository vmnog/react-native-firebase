import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, View} from 'react-native';
import BookList from '../../components/BookList';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={{padding: 20}}>
      <View style={{width: '50%', marginVertical: 20}}>
        <Button
          title="Adicionar livro"
          onPress={() => navigation.navigate('Add')}
        />
      </View>
      <BookList />
    </View>
  );
};

export default HomeScreen;
