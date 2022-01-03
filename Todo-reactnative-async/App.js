import * as React from 'react';
import Todohome from './Components/Screens/Todohome';
import Done from './Components/Screens/Done'
import Store from  './Components/Redux/Store'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './Components/Screens/Splash';
import { Provider } from 'react-redux';
import Task from './Components/Screens/Task';
import { NavigationContainer } from '@react-navigation/native';


const Tab  = createBottomTabNavigator();

function HomeTabs(){
  return(
    <Tab.Navigator
    screenOptions={
      ({route}) => ({
        tabBarIcon:({focused,size,color}) =>{
          let iconName;
          if (route.name === 'To-Do') {
            iconName = 'clipboard-list';
            size = focused ? 25 : 20;
          } else if (route.name === 'Done') {
            iconName = 'clipboard-check';
            size = focused ? 25 : 20;
          }
          return(
            <Icon
            name={iconName}
            size={size}
            color={color}
            />
          )
        }

      })
    }
    tabBarOptions={{
      activeTintColor: '#0080ff',
      inactiveTintColor: '#777777',
      labelStyle: { fontSize: 15, fontWeight: 'bold' }
    }}

    >
      <Tab.Screen name={'To-Do'} component={Todohome} />
      <Tab.Screen name={'Done'} component={Done} />

    </Tab.Navigator>
  )
}

const RootStack = createStackNavigator(); 

function App(){
  return(
    <Provider store={Store}>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#0080ff'
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: 'bold'
            }
          }}
        >
          <RootStack.Screen
            name="Splash"
            component={Splash}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="Home"
            component={HomeTabs}
          />
          <RootStack.Screen
            name="Task"
            component={Task}
          />
         
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App;