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
        if(decks.length === 0){
            return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:colors.white}}>
                    <View style={style.sumary}>
                        <Text style={{fontSize:30}}>You don't have a decks</Text>
                    </View>
                </View>
            )
        }
        return(
            <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center',backgroundColor:colors.white}}>
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
        backgroundColor:colors.blueLight,
        margin:5,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
    },
    deck: {
        fontSize:20,
    },
    card: {
        fontSize:10,
        padding:10
    },
    sumary:{
        height:100,
        alignItems:'center',
        justifyContent:'center',
        margin:5,
        padding:10,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
    }
})

function mapStateToProps(decks){
    return {
        decks
    }
}

export default connect(mapStateToProps)(Decks)
