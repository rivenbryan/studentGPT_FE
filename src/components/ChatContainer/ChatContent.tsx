import React from 'react'
import { BsRobot } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import ChatMessage from './ChatMessage';

type ChatMessageProps = {
    allChatMessage: string[]
}

export default function ChatContent({ allChatMessage }: ChatMessageProps) {

    return (
        <>
            {allChatMessage.map((chatMessage, index) => {
                let style: React.CSSProperties = {
                    minHeight: "100px", padding: "20px"
                }
                /* Render User Messages */
                if (index % 2 == 0) {
                    style = {...style, background: "#444654"}
                    return <ChatMessage style={style} index={index} chatMessage={chatMessage} logo={<BiUserCircle />}/>
                } else {
                /* Render Bot Messages */
                return <ChatMessage style={style} index={index} chatMessage={chatMessage} logo={<BsRobot />}/>
                }
            
            })}

        </>
    )
}