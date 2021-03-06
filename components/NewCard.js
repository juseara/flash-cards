import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import * as _ from 'lodash'
import  { saveDeck } from '../utils/helper'
import { setDeck } from '../actions'
import * as colors from '../utils/colors'

class NewCard extends Component {
    state = {
        question: '',
        awers: ''
    };

    static navigationOptions = ({ navigation }) => {
        const { deck } = navigation.state.params

        return {
            title: `Card to deck ${deck.name}`
        }
    }



    handleSubmit = () => {
        
        const { goBack, deck, add } = this.props
        
        console.log("STATE", this.props)
        if (_.isEmpty(this.state.question)) {
            alert('Question is required')
            return
        }

        if (_.isEmpty(this.state.awers)) {
            alert('Question is awers')
            return
        }

        deck.questions.push(this.state)
        add(deck)
        
        this.setState({
            question:'',
            awers:''
        })

        goBack()
    }
    render() {


        return (
            <KeyboardAvoidingView behavior='padding' style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={style.box}>
                    <Text>You Quest</Text>
                    <TextInput
                        placeholder="Write a question here"
                        onChangeText={(text) => this.setState({ question: text })}
                        style={style.input}
                        value={this.state.question}
                    />
                    <Text>A awers</Text>
                    <TextInput
                        placeholder="Write a awers here"
                        onChangeText={(text) => this.setState({ awers: text })}
                        style={style.input}
                        value={this.state.awers}
                    />
                </View>
                <View style={style.box}>
                    <TouchableOpacity style={style.btn} onPress={this.handleSubmit}>
                        <Text style={{ color: colors.green }}>SUBMIT</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const style = StyleSheet.create({
    box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    btn: {

        justifyContent: 'center',
        alignItems: "center",
        borderColor: colors.green,
        borderWidth: 1,
        padding: 5,
        borderRadius: 4,
        height: 45,
        width: '50%'
    },
    input: {
        width: '80%',
        borderColor: colors.black,
        borderWidth: 1,
        padding: 5,
        paddingLeft:10,
        borderRadius: 4,
        margin: 15
    }
})

function mapDispatchToProps (dispatch, { navigation }) {
    return {
     add:async (deck)=> {
         await saveDeck(deck)
         dispatch(setDeck(deck))
     },
     goBack: () => navigation.goBack()
   }
}

function mapStateToProps (state,{navigation}) {
    const { deck } = navigation.state.params
    return { deck }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewCard)