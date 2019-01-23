import { createStackNavigator, createAppContainer } from 'react-navigation';
import Main from './pages/main';
import Product from './pages/product';

const AppNavigator = createStackNavigator({
    Home: {
        screen: Main
    },

    ProductsPage: {
        screen: Product
    }
}, {
    initialRouteName: 'Home',

    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "#DA552F"
        },

        headerTitleStyle: {
            flex: 1,
            textAlign: 'center'
        },
        headerTintColor: "#FFF" 
    }
});
        

export default createAppContainer(AppNavigator);
