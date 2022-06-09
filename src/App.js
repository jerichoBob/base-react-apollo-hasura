import './App.scss';

import React, {  } from 'react';
import {
  ApolloClient,
  InMemoryCache, useQuery,
  gql,
  NetworkStatus
} from "@apollo/client";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import Paper from '@mui/material/Paper';

import { red } from '@mui/material/colors';
import Stack from '@mui/material/Stack';

import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
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
      people {index, first_name, last_name}
    }
`;

const ImportantPeople = () => {
  // let [clientList, setClientList] = useState([]);

  const { loading, error, data, networkStatus } = useQuery(
    QUERY_GET_PEOPLE, {
    notifyOnNetworkStatusChange: true,
  });
  if (networkStatus === NetworkStatus.refetch) return 'Refetching!';
  if (loading) return null;
  if (error) return `Error! ${error}`;
  // setClientList(data);

  return (
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      divider={<Divider  flexItem />}
      >
        {data.people.map((person,index, array) => {
          return(
          <div key={index}>
          <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary={`${index} :: ${person.first_name} ${person.last_name}`} />
          </ListItemButton>
        </ListItem>
        {person.index < array.length && <Divider  component="li" />}
        
        
          
        </div> );         
      })}
      </List>
      


  );
};

const ClientDetails = () => (

  <Card sx={{ width: 345 }}>

    <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="client-details">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
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

  return(
    <Box sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper', border: '1px dashed grey' }}>

    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      divider={<Divider orientation="vertical" flexItem />}

      spacing={{ xs: 1, sm: 2, md: 4 }}
    >
      <Item>
      {/* <CardHeader>
        <Typography variant="body2" color="text.secondary">
          Application 🚀
        </Typography>        
      </CardHeader>    

      <CardContent> */}
        <Card sx={{ width: 345 }}>
          <CardHeader>
            <Typography component="div" variant="h5">
              Clients
            </Typography>                    
          </CardHeader>        
          <CardContent>
            <ImportantPeople />
          </CardContent>
        </Card>
        </Item>
        
        <Item>
          <ClientDetails/>
        </Item>
      {/* </CardContent> */}
    </Stack>
    </Box>
  );
};

export default App;
