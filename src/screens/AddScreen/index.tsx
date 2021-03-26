import React from 'react';
import {Text, View, TextInput, Button} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {v4 as uuidv4} from 'uuid';

import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const AddScreen: React.FC = () => {
  const {control, handleSubmit, errors} = useForm();
  const navigation = useNavigation();

  const onSubmit = (data: {title: string; name: string}) => {
    firestore()
      .collection('books')
      .doc(uuidv4())
      .set(data)
      .then(() => {
        navigation.goBack();
      });
  };

  return (
    <View>
      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            placeholder="Title"
          />
        )}
        name="title"
        rules={{required: true}}
        defaultValue=""
      />
      {errors.title && <Text>This is required.</Text>}

      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            placeholder="Author"
          />
        )}
        name="author"
        rules={{required: true}}
        defaultValue=""
      />
      {errors.author && <Text>This is required.</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default AddScreen;
