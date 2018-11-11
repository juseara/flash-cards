import React, {Component} from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import * as colors from '../utils/colors'

class Deck extends Component {
    static navigationOptions = ({ navigation }) => {
        const { deck } = navigation.state.params
        
        return {
          title: `${deck.name}`
        }
      }
    render(){
        const { deck } = this.props
        return(
            <View style={style.container}>
                <Text style={style.deckName}>{deck.name}</Text>
                <Text style={style.cardCount}>{deck.questions ? deck.questions.length : 0} cards</Text> 
                <TouchableOpacity style={style.btnAddCard}>
                    <Text style={{color:colors.green}}>ADD CARD</Text>
                </TouchableOpacity>   
                <TouchableOpacity style={style.btnQuiz}>
                    <Text style={{color:colors.white}}>START QUIZ</Text>
                </TouchableOpacity>   
            </View>
        )
    }
}

const btn = {
    backgroundColor:'transparent',
    borderColor:colors.green,
    borderWidth:2,
    padding:10,
    borderRadius:4,        
    margin:5,
    width:200,
    height:45,
    alignItems:"center",
    justifyContent:'center'
}

const style = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
    },
    deckName:{
        fontSize:25,
        marginBottom:10
    },
    cardCount:{
        marginBottom:50
    },
    btnAddCard:{
        ...btn
    },
    btnQuiz:{
        ...btn,
        backgroundColor:'green',
        borderWidth:0,
        
    }
})

function mapStateToProps (state,{navigation}) {
    const { deck } = navigation.state.params
    return { deck }
}

export default connect(mapStateToProps)(Deck)