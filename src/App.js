import './App.scss';

import React, {useState} from 'react';
import {
  ApolloClient,
  InMemoryCache, useQuery,
  gql,
  NetworkStatus
} from "@apollo/client";
import { Button } from "@react-md/button";
import { Card, CardHeader, CardTitle,  CardContent, CardActions } from "@react-md/card"
import { Avatar } from "@react-md/avatar";
import { Typography } from "@react-md/typography"

export const client = new ApolloClient({
  uri: 'https://exciting-mammal-78.hasura.app/v1/graphql',
  headers: {
    // Authorization: `Bearer ${authToken}`
    'content-type': 'application/json',
    'x-hasura-admin-secret': 'YXkp1fr9epMJxwlJrnqHb5uVBCVTAS8Zhq3b1lBegr2ObZnAoY6zE8x7bOwMomSg'
  },
  cache: new InMemoryCache()
});

const QUERY_GET_PEOPLE = gql`
    query MyQuery {
      people {index, first_name, last_name}
    }
`;
/**
 * 
 * @returns 
 */
const getClients = () => {

}

const ImportantPeople = () => {
  const { loading, error, data, networkStatus } = useQuery(
    QUERY_GET_PEOPLE, {
    notifyOnNetworkStatusChange: true,
  });
  if (networkStatus === NetworkStatus.refetch) return 'Refetching!';
  if (loading) return null;
  if (error) return `Error! ${error}`;


  return data.people.map((person) => (
    <div key={person.index}>
      <Button>
        Name[{person.index}]: {person.first_name} {person.last_name}
      </Button>
    </div>
  ));
};

const ClientDetails = () => (
  <Card>
    <CardHeader beforeChildren={<Avatar>A</Avatar>}>
      <CardTitle>Client Details</CardTitle>
    </CardHeader>
    <CardContent>
      <Typography> Here is some text to display in the card. It is assumed this sentence will end.</Typography>
    </CardContent>
    <CardActions>
      <Button>Action 1</Button>
      <Button>Action 2</Button>
    </CardActions>
  </Card>
);

export const App = () => {
  let [clientList, setClientList] = useState([]);

  return(
    <Card>
      <CardHeader>
        <CardTitle>Application 🚀</CardTitle>
      </CardHeader>    
      <CardContent>
        <Card>
          <CardHeader>
            <CardTitle>Clients</CardTitle>
          </CardHeader>        
          <CardContent>
            <ImportantPeople />
          </CardContent>
        </Card>

        <ClientDetails/>
      </CardContent>
    </Card>
    );
};

export default App;
