import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import * as colors from '../utils/colors'
import { setLocalNotifiation } from '../utils/helper'
class Quiz extends PureComponent {

    state = {
        questionIndex: 0,
        numberCorrectAnswers: 0,
        showAnswer: false,
        deck: null
    }

    static navigationOptions = ({ navigation }) => {
        const { deck } = navigation.state.params

        return {
            title: `Quiz of deck ${deck.name}`
        }
    }
    componentDidMount(){
        const { navigation }  = this.props
        const deck = navigation.state.params
        console.log("DECK", deck)
        this.setState(deck)
    }

    handleShowAnswers = () => {
        this.setState({...this.state,showAnswer:!this.state.showAnswer})
    }

    handleSubmitAnswers = async (answers) => {
        const { deck, questionIndex, numberCorrectAnswers, showAnswer } = this.state

        if(answers==='correct'){
            this.setState((state)=>{
                return {...state,numberCorrectAnswers:numberCorrectAnswers +1 }
            })
        }

        this.setState((state)=>{
            return { ...state,questionIndex:questionIndex +1,showAnswer:!showAnswer}
        })

        if(questionIndex+1 === deck.questions.length)
        {
          await setLocalNotifiation()
        }
    }

    handleGoBack = () =>{
        this.props.navigation.goBack()
    }

    handleResetQuiz =()=>{
        this.setState({
            questionIndex: 0,
            numberCorrectAnswers: 0,
            showAnswer: false
        })
    }
    render() {
        const { questionIndex, deck, numberCorrectAnswers } = this.state

        if (!deck || !deck.questions) {
            return <View><Text>No deck loaded.</Text></View>
        }
        
        if (questionIndex >= deck.questions.length) {
            return (
                <GameOver score={((numberCorrectAnswers/deck.questions.length)*100).toFixed(0)} handleGoBack={this.handleGoBack} handleResetQuiz={this.handleResetQuiz} />
            )
        }

        return (
            <Game questionIndex={questionIndex} 
            deck={deck} 
            showAnswer={this.state.showAnswer} 
            handleSubmitAnswers={this.handleSubmitAnswers}
            handleShowAnswers={this.handleShowAnswers} />
        )

    }
}


const Game = ({ deck, handleShowAnswers, showAnswer, questionIndex = 0, handleSubmitAnswers }) => {
    console.log("DECK 3", deck)
    
    return (
        <View style={style.container}>
            <View style={style.stage}>
                <Text style={style.score}>{questionIndex+1}/{deck.questions.length}</Text>
            </View>
            <View style={[style.box, style.questions, style.card]}>
                {!showAnswer && <Text style={style.text}>{deck.questions[questionIndex].question}</Text>}
                {showAnswer && <Text style={style.text}>{deck.questions[questionIndex].awers}</Text>}
                {!showAnswer &&<TouchableOpacity style={style.btnAwers} onPress={handleShowAnswers}>
                    <Text style={{ color: colors.orage }}>ANSWERS</Text>
                </TouchableOpacity>}
            </View>
            <View style={style.box}>
                { showAnswer && <View>
                    <TouchableOpacity style={style.btnCorrect} onPress={()=>handleSubmitAnswers('correct')}>
                        <Text style={{ color: colors.green }}>CORRECT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.btnIncorrect} onPress={()=>handleSubmitAnswers('incorrect')}>
                        <Text style={{ color: colors.danger }}>INCORRECT</Text>
                    </TouchableOpacity>
                </View>}
            </View>
        </View>
    )
}

const GameOver = ({ score,handleGoBack, handleResetQuiz }) => {
    return (
        <View style={style.container}>
            <View style={[style.box]}>
                <Text style={style.GameOver}>GAME OVER</Text>
                <Text style={{ fontSize: 25 }}>You got {`${score}% correct answers.`}</Text>
            </View>
            <View style={[style.row]}>
                <TouchableOpacity style={style.btnDefault} onPress={handleResetQuiz}>
                    <Text style={{ color: colors.white }}>RESTART QUIZ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.btnDefault} onPress={handleGoBack}>
                    <Text style={{ color: colors.white }}>BACK TO DECK</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const btn = {
    backgroundColor: 'transparent',
    borderColor: colors.green,
    borderWidth: 2,
    padding: 10,
    borderRadius: 4,
    margin: 5,
    width: 200,
    height: 45,
    alignItems: "center",
    justifyContent: 'center'
}

const style = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    score:{
        fontSize: 20, 
        padding: 10, 
        fontWeight: "bold"
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    stage: {
        alignSelf: 'stretch',
    },
    btnCorrect: {
        ...btn
    },
    btnAwers: {
        ...btn,
        borderWidth: 0,
    },
    btnIncorrect: {
        ...btn,
        borderColor: colors.danger
    },
    btnDefault: {
        ...btn,
        backgroundColor: colors.grey,
        borderWidth: 0,
        width: 150
    },
    card: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 10,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },
    questions: {
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 4,
        width: "80%",
        justifyContent: 'space-around'

    },
    box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        fontSize: 25,
        textAlign: 'center'
    },textGameOver:{
        fontSize: 30, 
        justifyContent: 'flex-start'
    }
})
export default Quiz