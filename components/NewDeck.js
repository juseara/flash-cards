import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
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
            alert("Name is requered")
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
                    <Text style={style.content}>Name your new Deck.</Text>
                    <TextInput  onChangeText={(text) => {
                      const { deck } = this.state
                        deck.name = text
                        this.setState({ deck })
                        }} 
                    placeholder="Write name is here" 
                    style={style.input} 
                    value={this.state.deck.name} />
                </View>
                <View style={Platform.OS !== 'ios' ? style.viewBtn:style.viewBtnIos}>
                    <TouchableOpacity onPress={this.handleSubmit} style={Platform.OS !== 'ios' ?
                    style.btnSubmit : style.iosBtnSubmit}>
                        <Text style={Platform.OS !== 'ios' ?{ color: colors.black }:{color:colors.white,fontWeight:'bold',fontSize:20}}>SUBMIT</Text>
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
    viewBtnIos:{
        flex:1,
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    btnSubmit: {
        backgroundColor: colors.yelowLight,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    iosBtnSubmit:{
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:colors.white,
        borderWidth:1,
        padding:15,
        borderRadius:100,
        width:200,
        backgroundColor:colors.yelowLight
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

