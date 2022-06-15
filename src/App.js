import './App.scss';

import React, { useState, useEffect } from 'react';
import {
  ApolloClient,
  InMemoryCache, 
  useQuery, 
  useMutation,
  gql,
  NetworkStatus
} from "@apollo/client";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { ClientDetails } from './ClientDetails';
import { ClientDialog } from './ClientDialog';

import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import { faker } from '@faker-js/faker';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: 'center',
  color: theme.palette.text.secondary,
}));


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
      people {
        index
        first_name
        last_name
        address_street
        address_city
        address_state
        address_zip
        birth_month
        birth_day
        birth_year
      }
    }
`;
const MUTATION_ADD_PERSON = gql`
  mutation insert_person (
    $first_name: String!, 
    $last_name: String!, 
    $address_street: String, 
    $address_state: String, 
    $address_city: String, 
    $address_zip: Int, 
    $birth_day: Int, 
    $birth_month: Int, 
    $birth_year: Int) {
  insert_people_one(object: {
    first_name: $first_name,
    last_name: $last_name
    address_street: $address_street,
    address_city: $address_city,
    address_state: $address_state,
    address_zip: $address_zip,
    birth_day: $birth_day,
    birth_month: $birth_month,
    birth_year: $birth_year
  }) {
      index
  }
}

`;

const ClientList = (props) => {
  const {setClientIndex, clientList, setClientList} = props;
  const { loading, error, data, networkStatus } = useQuery(
    QUERY_GET_PEOPLE, {
    notifyOnNetworkStatusChange: true,
  });
  const [selectedListIndex, setSelectedListIndex] = useState(1);

  useEffect(() => {
    if (data !== undefined && data.people !== undefined) {
      // console.log("ClientList: useEffect: data: " + JSON.stringify(data));
      setClientIndex(data.people[0].index);
      setClientList(data.people);
    }
  }, [ setClientList, setClientIndex, data ]);
  
  if (networkStatus === NetworkStatus.refetch) return 'Refetching!';
  if (loading) return null;
  if (error) return `Error! ${error}`;


  return (
      <List 
        sx={{
          width: '100%',
          maxWidth: 360,
          maxHeight: 200,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          '& ul': { padding: 0 },
        }}
        subheader={<li />}
        divider={<Divider  flexItem />}
      >
        {data.people.map((person, ndx, array) => {
          return(
          <div key={person.index}>
            <ListItem disablePadding>
              <ListItemButton
                // onClick={(event) => handleClientSelection(data.people, ndx)}
                onClick={() => {
                  // console.log("ClientList: onClick: " + JSON.stringify(person));
                  // console.log(JSON.stringify(person.index));
                  props.setClientIndex(person.index)
                  setSelectedListIndex(person.index);
                }}
                selected={selectedListIndex === person.index}
              >
                <ListItemText primary={`${person.first_name} ${person.last_name}`} />
              </ListItemButton>
            </ListItem>
            {person.index < array.length && <Divider component="li" />}
          </div> );         
        })}
      </List>
  );
};

const handleNewClientButtonClick = (event, createClient, setClientIndex) => {
  // console.log('handleNewClientButtonClick');

  const index = createClient({ variables: {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    // address_street: "", 
    // address_state: "", 
    // address_city: "", 
    // address_zip: 17172, 
    // birth_day: 10, 
    // birth_month: 10, 
    // birth_year: 1904
  //  })}.then(result => {  
  //   console.log(result);
  // } 
  }});
  // console.log("handleNewClientButtonClick: index: " + index);
  setClientIndex(index);

}

const onSubmit = (event, createClient) => {}

export const App = () => {

  const [ clientIndex, setClientIndex ] = useState(0); 
  const [ clientList, setClientList ] = useState([]);
  const [ displayedClient, setDisplayedClient ] = useState({
    first_name: "",
    last_name: "",
    address_street: "",
    address_city: "",
    address_state: "",
  });

  const [ createClient, { data, loading, error }] = useMutation(MUTATION_ADD_PERSON);


  useEffect(() => {
    const person = clientList.find(thisClient => thisClient.index === clientIndex);
    console.log("=== App: useEffect: person: " + JSON.stringify(person));
    setDisplayedClient(person);
  }, [ clientIndex, clientList ]);

  return(
    <Box sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper', border: '1px dashed grey' }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        divider={<Divider orientation="vertical" flexItem />}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
      <Item>
        <Card sx={{ width: 345 }} >
          <CardHeader title="Clients" />
          <CardContent>
            <ClientList 
              setClientIndex={setClientIndex} 
              clientList={clientList} 
              setClientList={setClientList}/>
            <Button 
              variant="contained"
              onClick={(e) => {handleNewClientButtonClick(e, createClient, setClientIndex)}}
              >New Client
            </Button>              
          </CardContent>
        </Card>
      </Item>
        
      <Item>
        <ClientDetails 
          client={displayedClient}
          setClient={setDisplayedClient}
        />
      </Item>
    </Stack>
    </Box>
  );
};

export default App;
