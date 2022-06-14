import './App.scss';

import React, { useState } from 'react';
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
mutation insert_person {
  insert_people_one(object: {
    first_name: "Billy", 
    last_name: "Batson", 
    address_street: "123 Derelict Ct", 
    address_state: "MT", 
    address_city: "Bozeman", 
    address_zip: 17172, 
    birth_day: 10, 
    birth_month: 10, 
    birth_year: 1904}) {
    first_name
    last_name
    address_street
    address_city
    address_state
    address_zip
    birth_day
    birth_month
    birth_year
  }
}

`;

const ImportantPeople = (props) => {

  const { loading, error, data, networkStatus } = useQuery(
    QUERY_GET_PEOPLE, {
    notifyOnNetworkStatusChange: true,
  });

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
                onClick={() => props.setSelectedClient(data.people[ndx])}
              >
                <ListItemText primary={`${person.first_name} ${person.last_name}`} />
              </ListItemButton>
            </ListItem>
            {person.index < array.length && <Divider  component="li" />}
          </div> );         
        })}
      </List>
  );
};

export const App = () => {

  const [ selectedClient, setSelectedClient ] = useState(null);
  const [ newClient, setNewClient ] = useState({});
  const [ isVisible, setVisibility ] = useState(false);

  const handleClose = (value) => {
    setVisibility(false);
    setNewClient(value);
  };

  // onSubmit handles the mutation of the backend data
  const onSubmit = () => {

  }

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
            <ImportantPeople setSelectedClient={setSelectedClient}/>
          </CardContent>
        </Card>
      </Item>
        
      <Item sx={{ bgcolor: 'white'}}>
        <ClientDetails client={selectedClient}/>
      </Item>
    </Stack>
    <Button 
      variant="contained"
      onClick={() => {setVisibility(!isVisible)}}
      >Add Client
    </Button>
    <ClientDialog
        open={isVisible}
        onClose={handleClose}
        client={newClient}
        setClient={setNewClient}
        onSubmit={onSubmit}
      />    
    </Box>
  );
};

export default App;
