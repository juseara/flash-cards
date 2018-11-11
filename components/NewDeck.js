import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'

import * as _ from 'lodash'
import * as colors from '../utils/colors'
import  { saveDeck } from '../utils/helper'
import { setDeck } from '../actions'

class NewDecks extends Component {
    state = {
        deck: {
            name:'',
            questions:[]

        },
      };

    componentDidMount(){
        
    }
    
    handleSubmit =()=>{
        const  { add, goBack } = this.props
        if(_.isEmpty(this.state.deck.name))
        {
            alert("O nome é obrigatorio!")
            return
        }

        add(this.state.deck)
        this.setState({
            deck:{
                name:'',
                questions:[]
            }
        })
        goBack()
        console.log("STATE",this.state)
        
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={style.container}>
                <View style={style.viewInput}>
                    <Text style={style.content}>De um nome ao seu novo Deck.</Text>
                    <TextInput  onChangeText={(text) => {
                      const { deck } = this.state
                        deck.name = text
                        this.setState({ deck })
                        }} 
                    placeholder="Digite o nome aqui" 
                    style={style.input} 
                    value={this.state.deck.name} />
                </View>
                <View style={style.viewBtn}>
                    <TouchableOpacity onPress={this.handleSubmit} style={style.btnSubmit}>
                        <Text style={{ color: colors.black }}>SUBMIT</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1
    },
    content: {
        fontSize: 20,
        alignSelf:'center'
    },
    input:{
        fontSize: 20,
        marginTop:20,
       
    },
    viewInput: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    viewBtn: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%',
    },
    btnSubmit: {
        backgroundColor: colors.yelowLight,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    }
})

function mapDispatchToProps (dispatch, { navigation }) {
     return {
      add:(deck)=> {
          saveDeck(deck)
          dispatch(setDeck(deck))
      },
      goBack: () => navigation.goBack()
    }
}

export default connect(null,mapDispatchToProps)(NewDecks)

