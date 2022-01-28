import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMwOTg3MiwiZXhwIjoxOTU4ODg1ODcyfQ.HB_VSw2eY3rLPcBCcHsoe6H09x7v8I6AgeCAkzituQw';
const SUPABASE_URL = 'https://rrekpkgtpaviqhedukgd.supabase.co';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function Titulo(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.neutrals['000']};
                font-size: 24px;
                font-weight: 600;
            }
            `}</style>
    </>
  );
}

//Componente React
// function HomePage() {
//
//     return (
//         <div>
//             <GlobalStyle />
//             <Titulo tag="h2">Boas vindas de volta!</Titulo>
//             <h2>Discord - Alura Matrix</h2>
//         </div>
//     )
// }
// export default HomePage

export default function PaginaInicial() {
  const [users, setUsers] = useState('');
  const [username, setUsername] = useState([]);
  const roteamento = useRouter();



 async  function newUser(novoNome) {
    const user = {
      nome: novoNome
    };
    const validation = await supabase
      .from('users')
      .select('*')
      .then(({ data }) => {
          console.log('dados da consulta:', data);
          setUsername(data);

          if(user == setUsername(data))
            roteamento.push('/chat');
          else{
            supabase.from('users')
          .insert([user])
          .then(({ data }) => {
            console.log('usuario: ', data);
            setUsername([
            data[0],
            ]);
            roteamento.push('/chat');
          });
          }  

      });
      
}
  

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/blue-screen-of-death-in-windows-xp-1536x864.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              console.log('alguem submeteu o form');
              newUser(users)
              //roteamento.push('/chat');
              //window.location.href='/chat';
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>
            {/*<input 
            type={"text"}
            value={username}
            onChange={function (event){
             console.log('usuario digitou', event.target.value)
             //onde ta o valor?
             const valor = event.target.value;
             //trocar o valor da variaveil
             //atraves do React e avise quem precisa
             setUsername(valor);
            }}
          />*/}

            <TextField
              value={users}
              onChange={function (event) {
                console.log('usuario digitou', event.target.value)
                //onde ta o valor?
                const valor = event.target.value;
                //trocar o valor da variaveil
                //atraves do React e avise quem precisa
                setUsers(valor);
                
              }}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  newUser(users);
                }

              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[600],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />

            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[800],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={`https://github.com/${users}.png`}
            />
            <Text
              
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {users}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
