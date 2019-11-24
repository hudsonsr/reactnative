import { createAppContainer } from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';

import Main from './page/Main';
import User from './page/User';

const Routes = createAppContainer(
   createStackNavigator(
      {
         Main,
         User,
      },
      {
         headerLayoutPreset: 'center',
         headerBackTitleVisible: false,
         defaultNavigationOptions: {
            headerStyle: {
               backgroundColor: '#7159c1',
            },
            headerTintColor: '#fff',
         },
      }
   )
);

export default Routes;
