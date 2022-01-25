import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React,{useState} from 'react';
import {useRouter} from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import appConfig from '../config.json';



export default function ChatPage(){

  const router = useRouter();

  return(
    <>
      <Box
        styleSheet={{
            alignItems: 'center', justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.neutrals[500],
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',

          }}
          >
      <Box
        styleSheet={{
          flex: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%', maxWidth: '700px', padding: '40px',
          height: '100px',
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          backgroundColor: appConfig.theme.colors.neutrals[700],
          border: 'solid',
          borderWidth: '1',
          borderColor: appConfig.theme.colors.primary[600],
        }}
      >
        <a
        styleSheet={{backgroundColor: '#27E9C1',
        mainColor: '#00A0FA',
        width: '40px',
        height: '40px',
        justifyContent: 'center',
        marginTop: '-10px',
        paddingTop: '20px'
        }}>
          <FontAwesomeIcon styleSheet={{height: '10px', color: '#00E6EB'}} icon={faArrowLeft}/>
        </a>

        <Text styleSheet={{
        fontSize: '24px', 
        fontWeight: '900px',
        color: '#FFFFFF',
        }}>
          Pagina de Chat
        </Text>
      </Box>


      </Box>
    </>
  )
}