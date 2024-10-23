


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppColors } from './src/provider/AppColors';

const Stack = createNativeStackNavigator();

import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import configureStore from './src/provider/redux/store'; // Adjust the import path as necessary
import HomeComponent from './src/HomeComponent';

const App = () => {
  const [store, setStore] = useState(null);

  useEffect(() => {
    const initializeStore = async () => {
      const createdStore = await configureStore();
      setStore(createdStore);
    };
    initializeStore();
  }, []);

  if (!store) {
    return null; // You can return a loading indicator here if you want
  }
  return (
    <Provider store={store}>
      
    <NavigationContainer  >
      <Stack.Navigator initialRouteName="HomeComponent" screenOptions={{
         headerStyle: {
          backgroundColor: AppColors.themeColor   
        },
        navigationBarColor:AppColors.secondThemeColor,
        headerTintColor:AppColors.whiteColor,
        statusBarHidden:false,
        statusBarTranslucent:true,
        statusBarColor:"transparent",
        statusBarStyle:'light'
      }}>
     
        <Stack.Screen name="HomeComponent" component={HomeComponent}  />
       
        
      
      </Stack.Navigator>
    </NavigationContainer>
    
    </Provider>
  );
};

export default App;
