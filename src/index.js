import './index.scss';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider} from "@apollo/client";
import { client, App } from './App';
import { Configuration } from "@react-md/layout";


const container = document.getElementById('root');
const root = createRoot(container); 

root.render(
  <ApolloProvider client={client}>
    <Configuration>
      <App />
    </Configuration>
  </ApolloProvider>
);