import { MantineProvider, Grid } from '@mantine/core';
import SideBar from "./components/SideBar/SideBar"
import ChatContainer from './components/ChatContainer/ChatContainer';
import { useState, useRef } from 'react';
import { ChatMessageContext } from './contexts/ChatMessageContext';
import { useMediaQuery } from '@mantine/hooks';
import { ToastContainer } from 'react-toastify';
export default function App() {
  /* allChatMessage contains ALL chat message between User and ChatGPT */
  const [allChatMessage, setAllChatMessage] = useState<string[]>([]);

  /* allUserMessage contains ALL chat message from User */
  const [allUserMessage, setAllUserMessage] = useState<string[]>([]);

  /* isLoading is to check if message is sent/received from backend */
  const [isLoading, setIsLoading] = useState<boolean>(false)

  /* apiTriggerFlag is used as a flag to set API to be used or not to be used */
  const apiTriggerFlag = useRef(false);

  const largeScreen = useMediaQuery('(min-width: 500px)');
  console.log(largeScreen)

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark',
        fontSizes: {
          xs: '0.6rem',
          sm: '0.8rem',
          md: '1rem',
          lg: '1rem',
          xl: '1.2rem',
        },
      }}>
      <ChatMessageContext.Provider
        value={{ apiTriggerFlag, allChatMessage, setAllChatMessage, allUserMessage, setAllUserMessage, isLoading, setIsLoading }}
      >
      <ToastContainer
      />
        <Grid gutter={0} grow>
          {largeScreen && <Grid.Col span={2}><SideBar /></Grid.Col>}
          <Grid.Col span={10}> <ChatContainer /></Grid.Col>
        </Grid>
      </ChatMessageContext.Provider>
    </MantineProvider>
  )
}