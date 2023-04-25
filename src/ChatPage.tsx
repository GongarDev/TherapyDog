
import { useState } from "react";
import './styles.css'

import { Grid } from '@mui/material';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import { MessageDirection } from '@chatscope/use-chat';

import { chat } from './chat'

// import { useStore } from './useStore'

export interface State {
    fromText: string,
    result: string,
  }

export const ChatPage = () => {

    // const {
    //     fromText,
    //     result,
    //     setFromText,
    //     setResult
    // } = useStore()

    const [messages, setMessages] = useState([
        {
            message: "Hola, ¿Santo y seña?, si no lo sabes, pregúntaselo al autor. ¡Guau!",
            sentTime: "just now",
            sender: "ChatGPT",
            direction: MessageDirection.Incoming,
            position: 0
        }
    ]);
    
    const [isTyping, setIsTyping] = useState(false);

    const sendMessage = async (message: string) => {

        if(messages.length == 1 && message != 'guauguau') return

        if(messages.length == 1 && message == 'guauguau'){

            setMessages([...messages,{
                message: "Bienvenido, soy el cínico perro psicólogo, ¿En qué puedo ayudarte?.",
                sentTime: "just now",
                sender: "ChatGPT",
                direction: MessageDirection.Incoming,
                position: 0
            }])
            return
        }

        const newMessageUser = {
            message,
            sentTime: "just now",
            sender: "user",
            direction: MessageDirection.Outgoing,
            position: 0
        };

        let newMessages = [...messages, newMessageUser];

        setMessages( newMessages )
        console.log(newMessages);
        setIsTyping(true);

        chat( { text: message} )
        .then(result => {
            if (result == null) return
            const newMessageAssistant = {
                message: result,
                sentTime: "just now",
                sender: "ChatGPT",
                direction: MessageDirection.Incoming,
                position: 0
        };
            newMessages = [...newMessages, newMessageAssistant]; 

            setMessages( newMessages )
            setIsTyping(false);
            console.log(newMessages);
        })
        .catch(() => {})

    }

 
    return (
        <Grid
            className='animate__animated animate__fadeIn animate__faster chat-content'
            container
            spacing={ 0 }
            direction="column"
            justifyContent="flex-end"
            justifyItems= 'flex-end'
            sx={{ width: '50%', height: 'calc( 100vh - 240px )', margin: {sm: 14, xs: 4} }}
        >
            <MainContainer responsive>
                <ChatContainer>  
                    <MessageList
                        style={{ overflowY: "scroll", maxHeight: 'calc(100vh - 280px)' }} 
                        scrollBehavior="smooth" 
                        typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
                    >
                        {
                            messages && messages.map((message, i) => {
                                return <Message 
                                            key={i} 
                                            model={{
                                                message: message.message,
                                                sentTime: message.sentTime,
                                                sender: message.sender,
                                                direction: message.direction,
                                                position: 0
                                    
                                            }} 
                                        />                                   
                            })
                        }
                    </MessageList>
                    <MessageInput 
                        placeholder="Type message here" 
                        onSend={ sendMessage } 
                        attachButton={false}
                    />        
                </ChatContainer>
            </MainContainer>
        </Grid>
    )
}