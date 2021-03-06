import './App.scss';

import React, { useState, useEffect, useRef } from 'react';
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
import scrollIntoView from 'scroll-into-view';
import { ExitToApp } from '@mui/icons-material';
import { display } from '@mui/system';


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
}`;

// mutation toggleTodo ($id: Int!, $isCompleted: Boolean!) {
//   update_todos(where: {id: {_eq: $id}}, _set: {is_completed: $isCompleted}) {
//     affected_rows
//   }
// }
const UPDATE_PERSON_BY_ID = gql`
  mutation updatePerson(
    $index: Int!,
    $first_name: String, 
    $last_name: String, 
    $address_street: String, 
    $address_state: String, 
    $address_city: String, 
    $address_zip: Int, 
    $birth_day: Int, 
    $birth_month: Int, 
    $birth_year: Int) {
      
    update_people(
      where: {index: {_eq: $index}}, 
      _set: {
        first_name: $first_name,
        last_name: $last_name,
        address_street: $address_street,
        address_city: $address_city,
        address_state: $address_state,
        address_zip: $address_zip,
        birth_day: $birth_day,
        birth_month: $birth_month,
        birth_year: $birth_year
      }) {
        affected_rows
      }
  }
`;
const DELETE_PERSON_BY_ID = gql`
  mutation Person($index: Int!) {
    delete_people(
      where: {index: {_eq: $index}}) {
    affected_rows
    returning {
      index,
      first_name,
      last_name,
      address_street,
      address_city,
      address_state,
      address_zip,
      birth_day,
      birth_month,
      birth_year
    }
  }    
  }
`;

const ClientList = (props) => {
  const {clientIndex, setClientIndex, clientList } = props;

  return (
      <List 
        sx={{
          width: '100%',
          maxWidth: 360,
          maxHeight: 350,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          '& ul': { padding: 0 },
        }}
        subheader={<li />}
        divider={<Divider  flexItem />}
        dense={false}
      >
        {clientList.map((person) => {
          return(
            <div key={person.index}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    setClientIndex(person.index)
                    // setSelectedListIndex(person.index);
                  }}
                  selected={clientIndex === person.index}
                  ref={(node) => {
                    if (clientIndex === person.index) {
                      scrollIntoView(node);
                    }
                  }}

                >
                  <ListItemText primary={`(${person.index}) ${person.first_name} ${person.last_name}`} />
                </ListItemButton>
              </ListItem>
              <Divider component="li" />
              {person.index < ClientList.length && <Divider component="li" />}
            </div> 
          );         
        })}
      </List>
  );
};

const handleSaveAsNewClient = async (currClient, createClient,  setClientIndex) => {

  let newIndex = 0;
  await createClient({ variables: {
    first_name: currClient.first_name,
    last_name: currClient.last_name,
    address_street: currClient.address_street,
    address_city: currClient.address_city,
    address_state: currClient.address_state,
    address_zip: currClient.address_zip,
    birth_day: currClient.birth_day,
    birth_month: currClient.birth_month,
    birth_year: currClient.birth_year
  }}).then((result)=> {
    newIndex = result.data.insert_people_one.index;

    console.log("response from graphql mutate: " + JSON.stringify(result.data.insert_people_one.index));
    console.dir(result);
  });

  // setClientIndex(newIndex);
  return newIndex;
  // const newIndex = Math.random().toFixed(4) * 10000;
  // const newClient = {
  //   index: newIndex,
  //   first_name: displayedClient.first_name,
  //   last_name: displayedClient.last_name,
  //   address_street: displayedClient.address_street,
  //   address_city: displayedClient.address_city,
  //   address_state: displayedClient.address_state,
  //   address_zip: displayedClient.address_zip,
  //   birth_day: displayedClient.birth_day,
  //   birth_month: displayedClient.birth_month,
  //   birth_year: displayedClient.birth_year
  // };
  // setClientList([...clientList, newClient])

}

// next and prev depend complete on the sort order of clientList 
//  - so if that changes, then the next and prev functions will need to change also
const getNextIndex = (currIndex, clientList) => {
  let index = 0;
  if (clientList !== undefined && clientList.length > 0) {
    for (let i = 0; i<=clientList.length - 1; i++) {
      index = clientList[i].index;
      if (clientList[i].index > currIndex) break;
    }
  }
  return index;
}
const getPrevIndex = (currIndex, clientList) => {
  let index = 0;
  if (clientList !== undefined && clientList.length > 0) {
    for (let i = clientList.length - 1; i >= 0; i--) {
      index = clientList[i].index;
      if (clientList[i].index < currIndex) break;
    }
  }
  return index;
}

export const App = () => {

  const [ clientIndex, setClientIndex ] = useState(1); 
  const [ clientList, setClientList ] = useState([]);
  const [ displayedClient, setDisplayedClient ] = useState({
    first_name: "",
    last_name: "",
    address_street: "",
    address_city: "",
    address_state: "",
  });

  const { loading, error, data, refetch, networkStatus } = useQuery(
    QUERY_GET_PEOPLE, {
    notifyOnNetworkStatusChange: true,
  });

  const [ createClient ] = useMutation(MUTATION_ADD_PERSON);
  const [ updateClient ] = useMutation(UPDATE_PERSON_BY_ID);
  const [ deleteClient ] = useMutation(DELETE_PERSON_BY_ID);

  const [ changes, setChanges ] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (data !== undefined && data.people !== undefined) {
      // the other choice (if you don't want to sort here), is to have a "Sort by..." button in the UI
      // That way the user can sort how and when they want, but only if they care.
      let sortedList = [...data.people].sort((a, b) => a.index - b.index);
      console.log("ClientList: useEffect: sortedList: " + JSON.stringify(sortedList));
      if (data.people.length > 0) {
        if (isFirstRender.current) setClientIndex(sortedList[0].index);
        isFirstRender.current = false;
      }

      setClientList(sortedList);  
    }
  },  [ data ] );

  useEffect(() => {
    console.log(`clientIndex: ${clientIndex}`);
    if (clientIndex !== undefined && clientList !== undefined && clientList.length>0) {
      console.log("=== App: useEffect: clientList: " + JSON.stringify(clientList));    
      const person = clientList.find(thisClient => thisClient.index === clientIndex);
      console.log("=== App: useEffect: person: " + JSON.stringify(person));

      if (person !== undefined) setDisplayedClient(person);
    }
  }, [ clientIndex, clientList ]);

  // if (networkStatus === NetworkStatus.refetch) return 'Refetching!';
  // if (loading) return null;
  if (error) return `Error! ${error}`;

  return(
    <Box sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper', border: '1px dashed grey' }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        divider={<Divider orientation="vertical" flexItem />}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
      <Item>
        <Card sx={{ width: 345 }} >
          <CardHeader title="Client List" />
          <CardContent>
            <ClientList 
              clientIndex={clientIndex}
              setClientIndex={setClientIndex} 
              clientList={clientList} 
              />
          </CardContent>
        </Card>
        <Button
          style={{ marginLeft: '10px' }}
          variant="contained"
          onClick={(e) => {
            refetch(); // gimme data
          }}
        >Refresh List</Button>        
        <Button
          style={{ marginLeft: '10px' }}
          variant="contained"
          onClick={async(e) => {            
            console.log(`Deleting client: ${displayedClient.index}`);
            await deleteClient({variables: {index: displayedClient.index}});
            await refetch(); // gimme data
            await setClientIndex(clientList[0].index);
          }}
        >Delete Client</Button>           
      </Item>
        
      <Item>
        <Card >
            <CardHeader title="Client Details" />
            <CardContent>
              <ClientDetails 
                client={displayedClient}
                setClient={setDisplayedClient}
                setChanges={setChanges}
              />
            </CardContent>
          </Card>
        <Button 
          variant="contained" disabled={!changes} 
          onClick={(e) => {
            updateClient({ variables: {
              index: displayedClient.index, 
              first_name: displayedClient.first_name,
              last_name: displayedClient.last_name,
              address_street: displayedClient.address_street,
              address_city: displayedClient.address_city,
              address_state: displayedClient.address_state,
              address_zip: displayedClient.address_zip,
              birth_day: displayedClient.birth_day,
              birth_month: displayedClient.birth_month,
              birth_year: displayedClient.birth_year
            }});

            // update clientList to include the above changes 
            const newClientList = clientList.map(thisClient => {
              if (thisClient.index === displayedClient.index) {
                return displayedClient;
              } else {
                return thisClient;
              }
            });
            setClientList(newClientList);
            setChanges(false);
          }}
          >Save Changes
        </Button>             
        <Button 
          variant="contained" disabled={!changes} 
          style={{ marginLeft: '10px' }}
          onClick={ async(e) => {
            console.log("--- starting handleSaveAsNewClient---")
            const newIndex = await handleSaveAsNewClient(displayedClient, createClient, setClientIndex);

            console.log("refetching");
            await refetch(); // gimme data       

            // const newIndex = clientList[clientList.length-1].index;
            console.log(`refetching done. setting client index to ${newIndex}`);
            setClientIndex(newIndex);
            console.log("--- finishing handleSaveAsNewClient---")
          }}
        >Save Changes As New Client
        </Button>             
      </Item>
    </Stack>
    <Button 
      variant="contained"
      style={{ marginLeft: '10px' }}
      onClick={(e) => {
        const firstIndex = clientList[0].index;
        setClientIndex(firstIndex);
        console.log(`clientIndex: ${firstIndex}`);
      }}
    >First
    </Button>   
    <Button 
      variant="contained"
      style={{ marginLeft: '10px' }}
      onClick={(e) => {
        const newIndex = getPrevIndex(clientIndex, clientList);
        setClientIndex(newIndex);
        console.log(`clientIndex: ${newIndex}`);
      }}
    >Prev
    </Button>   
    <Button 
      variant="contained"
      style={{ marginLeft: '10px' }}
      onClick={(e) => {
        const nextIndex = getNextIndex(clientIndex, clientList);
        setClientIndex(nextIndex);
        console.log(`nextIndex: ${nextIndex}`);
      }}
    >Next
    </Button>   
    <Button 
      variant="contained"
      style={{ marginLeft: '10px' }}
      onClick={(e) => {
        const lastIndex = clientList[clientList.length-1].index;
        setClientIndex(lastIndex);
        console.log(`nextIndex: ${lastIndex}`);
      }}
    >Last
    </Button>       
    </Box>
  );
};

export default App;
