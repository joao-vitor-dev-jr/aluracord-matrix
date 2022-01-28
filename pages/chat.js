import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React,{useEffect, useState} from 'react';
import appConfig from '../config.json';
import {createClient} from '@supabase/supabase-js';


const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMwOTg3MiwiZXhwIjoxOTU4ODg1ODcyfQ.HB_VSw2eY3rLPcBCcHsoe6H09x7v8I6AgeCAkzituQw';
const SUPABASE_URL = 'https://rrekpkgtpaviqhedukgd.supabase.co';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);



export default function ChatPage(){

  const [mensage, setMensage] = useState('');
  const [chat, setChat] = useState([]);
    
  useEffect(()=>{
    const msg = supabase
    .from('mensagens')
    .select('*')
    .order('id',{ascending: false}) //supabase .order inverte o chat
    .then(({data})=>{
      console.log('dados da consulta:', data);
      setChat(data);
  });
  },[]);


  function novaMensagem(newMensage){
    const mensagem = {
      //id: chat.length + 1,
      de: 'joao-vitor-dev-jr',
      texto: newMensage,
       
    };
    supabase.from('mensagens')
    .insert([mensagem])
    .then(({data})=>{
        console.log('criando mensagem:', data);
        setChat([
         data[0],...chat, 
        ]);
    });

    setMensage('');
  }

  return(
    <>
      <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/blue-screen-of-death-in-windows-xp-1536x864.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    border: 'solid',
                    borderColor: '#00C3DA',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        border: 'solid',
                        borderColor: '#00A0FA',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    
                    <MessageList mensagens={chat} />
                    {/*{chat.map((valor)=>{
                      return(
                        <li key={valor.id}>
                          {valor.de} : {valor.texto}
                        </li>
                      )
                    })}*/}
                    

                    <Box
                        as="form"
                        onSubmit={(event)=>{
                          event.preventDefault();
                          novaMensagem(mensage);
                        }}
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensage}
                            onChange={(event)=>{
                              const valor = event.target.value;
                              setMensage(valor);
                            }}
                            onKeyPress={(event)=>{
                              if(event.key === 'Enter'){
                                event.preventDefault();
                                novaMensagem(mensage);
                              }

                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Button
                        type='submit'
                        styleSheet={{
                        color:'#00E6EB',
                        top: '-4px', 
                        backgroundColor: appConfig.theme.colors.neutrals[500],
                        alignItems: 'center', 
                        justifyContent: 'center',
                        hover:{color: '#ffff', backgroundColor: '#00E6EB'}
                    }}
                    colorVariant='neutral'
                    label='Enviar'
                />
                    </Box>
                </Box>
            </Box>
        </Box>
      </>  
    )
}

function Header() {

    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    styleSheet={{color: appConfig.theme.colors.primary[900], 
                    backgroundColor: appConfig.theme.colors.neutrals[500], 
                    hover:{color: '#ffff', 
                    backgroundColor: '#006FFF'} }}
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}


function MessageList(props) {
    console.log(props);
    
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflowY: 'scroll'|'hidden',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
          {props.mensagens.map((mensagem)=>{
            return(

            
            <Text
                key={mensagem.id}
                tag="li"
                styleSheet={{
                    borderRadius: '5px',
                    padding: '6px',
                    marginBottom: '12px',
                    hover: {
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }
                }}
            >
                <Box
                    styleSheet={{
                        marginBottom: '8px',
                    }}
                >
                    <Image
                        styleSheet={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginRight: '8px',
                        }}
                        src={`https://github.com/${mensagem.de}.png`}
                    />
                    <Text tag="strong" styleSheet={{fontSize: '18px'}}>
                        {mensagem.de}
                    </Text>
                    <Text
                        styleSheet={{
                            fontSize: '12px',
                            marginLeft: '8px',
                            color: appConfig.theme.colors.primary[600],
                        }}
                        tag="span"
                    >
                        {(new Date().toLocaleDateString())}
                    </Text>
                </Box>
                {mensagem.texto}
            </Text>
            );
          })}
        </Box>
    
  )
}