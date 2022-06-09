import './index.scss';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider} from "@apollo/client";
import { client, App } from './App';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';



const container = document.getElementById('root');
const root = createRoot(container); 

root.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </ApolloProvider>
);