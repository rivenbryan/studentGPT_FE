import React from 'react'
import { useForm } from '@mantine/form';
import axios from 'axios';
import { useEffect, useRef, useContext} from 'react';
import { ChatMessageType } from "../../types/types"
import ChatContent from './ChatContent';
import Input from './Input';
import ChatGptLogo from './ChatGptLogo';
import './ChatUI.css';
import { ChatMessageContext } from '../../contexts/ChatMessageContext';
import { LoadingOverlay } from '@mantine/core';
import {Loader} from '../Loader';
export default function ChatContainer() {
    const {apiTriggerFlag, allChatMessage, setAllChatMessage, allUserMessage, setAllUserMessage, isLoading, setIsLoading } = useContext(ChatMessageContext);

    /* isMountedRef variable is to make sure useEffect does not do an initial run */

    const form = useForm({
        initialValues: {
            value: '',
        }
    });
    
    useEffect(() => {

        // This code will run only after the component has mounted
        if (apiTriggerFlag.current) {
            console.log("UseEffect called! ")
            axios.post('https://studentgptbe-production.up.railway.app/api/request', allUserMessage)
            // axios.post('http://localhost:5000/api/request', allUserMessage)
                .then(response => {
                    console.log(allUserMessage)
                    const newMessage = response as ChatMessageType
                    setAllChatMessage((previousArrayChatMessages: any) => {

                        const newArrayOfChatMessages: string[] = [...previousArrayChatMessages]
                        console.log(newArrayOfChatMessages)
                        /* 
                        *  We want to add in two content to our chatMessage
                        *  1. The chat message that user type
                        *  2. The chat message that Chat GPT response
                        */
                        newArrayOfChatMessages.push(allUserMessage[allUserMessage.length - 1])
                        newArrayOfChatMessages.push(newMessage.data)
                        console.log(newArrayOfChatMessages)
                        return newArrayOfChatMessages;
                    })

                     /* 
                     *  Reset Loader to false
                     */
                    setIsLoading(false)
                })
                .catch(error => {
                    console.log(error)
                });
        } else {
            /*
            * When useEffect is run for the first time, it sets isMountedRef to True
            */
            apiTriggerFlag.current = true;
        }

        /*
        * Empty the form
        */

        form.setFieldValue('value', "")

    }, [allUserMessage]);

    

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        console.log("Clicked!")
        const requestParameter = form.values;
        console.log(requestParameter)
        if (requestParameter.value == ""){
            // Set Error Message // 
            return
        }
        console.log(requestParameter)

        setAllUserMessage((prevArrayUserMessages: any) => {
            const newArrayOfUserMessages: string[] = [...prevArrayUserMessages];
            newArrayOfUserMessages.push(requestParameter.value);
            console.log(newArrayOfUserMessages);
            return newArrayOfUserMessages;
        });
        /* 
        * Set Loading Spinner to True
        */
        setIsLoading(true)
        
    
    }

    return (
            <div className="chat-container">
                <div className="messages-container">
                    {allChatMessage.length == 0 && <ChatGptLogo/>}
                    <ChatContent allChatMessage={allChatMessage} />
                    <LoadingOverlay loader={Loader} visible={isLoading} />;
                </div>
                <div className="input-container">
                    <Input handleSubmit={handleSubmit} form={form} />
                </div>
            </div>
    )
}