import React,{Component} from 'react'
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native'
import { connect } from 'react-redux'

import  { isStorageNotNull, startStorage, fetchDecks } from '../utils/helper'
import { getDecks } from '../actions'
import * as colors from '../utils/colors'

class Decks extends Component{
    async componentDidMount(){
        const { dispatch } = this.props
        if(!await isStorageNotNull()){
            await startStorage()
        }

        fetchDecks().then(decks=>{
            dispatch(getDecks(decks))
        })
    }

    render(){

        const decks = []

        if(this.props.decks && Object.keys(this.props.decks).length > 0){
            Object.keys(this.props.decks).map(key => {
              decks.push(this.props.decks[key])
            })
        }

        return(
            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                <FlatList 
                    data={decks}
                    keyExtractor={item => item.name}
                    renderItem={({item})=>(<Item {...this.props}  deck={item}/>)}
                />
            </View>
        )
    }
}

const Item = (props) =>{
    const { deck } = props
    
    return(
        <TouchableOpacity style={style.deckIten} onPress={() => props.navigation.push('Deck',{ deck })}>
            <Text style={style.deck}>
                {deck.name}
            </Text>
            <Text style={style.card}>
                {deck.questions.length} cards
            </Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    deckIten: {
        height:100,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:colors.grey,
        margin:5,
    },
    deck: {
        fontSize:20
    },
    card: {
        fontSize:10,
        padding:10
        
    }
})

function mapStateToProps(decks){
    return {
        decks
    }
}

export default connect(mapStateToProps)(Decks)
