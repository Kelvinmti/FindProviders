import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'gobarber', // identifica de qual aplicação são os reducers
      storage: AsyncStorage,
      whitelist: ['auth', 'user'], // aqui serão colocados todos os reducers que desejam ser persistidos
    },
    reducers
  );
  return persistedReducer;
};
