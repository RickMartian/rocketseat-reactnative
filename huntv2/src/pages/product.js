import React from 'react';

import { WebView } from 'react-native';

const Product = ({ navigation }) => ( //esse padrão de variável, que não é classe, nunca vai poder ter state (stateless component);
    <WebView source={{ uri: navigation.state.params.product.url }}/>
)

Product.navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.product.title
});

export default Product;