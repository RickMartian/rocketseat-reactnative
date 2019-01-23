import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../services/api';

export default class Main extends Component {
    static navigationOptions = {
        title: "Hunt",
    };

    componentDidMount() {/*Assim que o componente é montado em tela,  
    esse método é disparado.*/
        this.loadProducts();
    }
    /*state -- objeto, serve para armazenar toda informação que quisermos
    usar e manipular dentro da classe. O react fica ouvindo as alterações
    do estado, e toda vez que tive uma alteração dentro do state, o react
    executa o render novamente. */
    state = { 
        productInfo: {},
        docs: [], //declara as variáveis que quer usar pra salvar
        page: 1
    };

    /*quando os componentes são do próprio react, como componentDidMount
    e render, pode usar métodos metodo() {}; porém, quando n for, é
    preciso utilizar arrow functions, como no loadProducts, porque assim
    ela vai enxergar o this dentro da classe. */

    loadProducts = async (page = 1) => {/*arrow function, n cria um novo escopo de função,
        herda o escopo acima dele.*/
        const response = await api.get(`/products?page=${page}`);

        const { docs, ...productInfo } = response.data;

        this.setState({ docs: [...this.state.docs, ...docs], productInfo, page });
    };

    loadMore = () => {
        const { page, productInfo } = this.state;


        if(page === productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
    };

    renderItem = ({ item }) => (
        <View style={styles.productContainer}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>

            <TouchableOpacity style={styles.productButton} onPress={() => {
                this.props.navigation.navigate('ProductsPage', { product: item });
            }} /*
            precisa de uma função obrigatória pra quando ser pressionado.*/>
                <Text style={styles.productButtonText}>Acessar</Text>
            </TouchableOpacity>
        </View>
    );

    render() {
        return (
            <View style={styles.container}>
                {/* duas formas de colocar arquivos em tela com Text, etc:
                { return value}  ou ( value )*/}
                {/* {this.state.docs.map( product => (
                    <Text key={product._id}>{product.title}</Text>))
                } */}

                {/* FlatList lida melhor com performance de atualizações
                para fazer listagem de itens */}

                <FlatList 
                contentContainerStyle={styles.list}//pra quando quiser estilizar o conteúdo da FlatList, e nao ela em si.
                data={this.state.docs} //pega os dados que estão dentro do state
                keyExtractor={item => item._id}//key(obrigatória) para identificar o valor único de cada um
                renderItem={this.renderItem}/*função para render cada item na tela*/
                onEndReached={this.loadMore}//função disparada automaticamente quando chegar ao fim da lista 
                onEndReachedThreshold={0.1}//qual é o percentual que eu quero chegar do fim da lista pra começar a carregar os novos intens
                /> 

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },  

    list: {
        padding: 20  
    },

    productContainer: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20
    },

    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'

    },

    productDescription: {
        fontSize: 16,
        color: '#999',
        marginTop: 5,
        lineHeight: 24,   
    },

    productButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#DA552F',
        backgroundColor: 'transparent',  
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },

    productButtonText: {
        fontSize: 16,
        color: '#DA552F',
        fontWeight: 'bold'
    }


});