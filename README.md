# Flashcards Mobile

Esse projeto é uma aplicativo para `android` e `ios`. onde você pode criar baralhos com perguntas e resposta para testar seu conhecimento.

## Instalação

você deve seguir os passos listado abaixa para instalar todas as dependências e iniciar o projeto.

* install all project dependencies with `npm install`
* install expo-cli globally `npm install -g expo-cli`
* start app in your device or simulator `expo start` or `yarn start`

## Funcionalidade da aplicação

Nesta aplicação, temos 5 views que são:

* View da lista de baralhos (View padrão)
    * exibe o título de cada baralho
    * exibe o número de cartões em cada baralho
    
* View de um baralho individual
    * exibe o título do baralho
    * exibe o número de cartões em um baralho
    * exibe uma opção para começar um quiz no baralho
    * uma opção de adicionar uma nova pergunta ao baralho
    * uma opção de deletar o baralho

* View do quiz
    * exibe a pergunta do cartão
    * uma opção de visualizar a resposta (virar o cartão) clicando em Answer
    * um botão "Correto" para o usuário clicar caso ele tenha acertado a questão de acordo com a resposta que tinha em mente
    * um botão "Incorreto" para o usuário clicar caso ele tenha errado a questão de acordo com a resposta que tinha em mente
    * o número de cartões que faltam para terminar o quiz
    * exibe a porcentagem correta assim que o quiz é completado

* View do novo baralho
    * Uma opção de inserir o título do novo baralho
    * Uma opção de enviar o novo título do baralho e assim criar o baralho
    
* View de nova pergunta
    * Uma opção de inserir uma pergunta
    * Uma opção de inserir uma resposta
    * Uma opção de enviar a nova pergunta e assim criar um cartão
