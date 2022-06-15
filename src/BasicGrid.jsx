import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, FormControl, Paper, Grid, TextField } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const BasicGrid = (props) => {
  const { client, setClient } = props;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={5}>
            <FormControl fullWidth >
              <TextField
                  required
                  id="first-name"
                  label="First Name"
                  value={client.first_name}
                  onChange={(e) => setClient({ ...client, first_name: e.target.value })}
              />
            </FormControl>
        </Grid>
        <Grid item xs={7}>
            <FormControl fullWidth >
              <TextField
                id="last-name"
                required
                label="Last Name"
                value={client.last_name}
                onChange={(e) => setClient({ ...client, last_name: e.target.value })}
              />              
            </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth >
            <TextField
              id="address-street"
              label="Street"
              value={client.address_street}
              onChange={(e) => setClient({ ...client, address_street: e.target.value })}
            />            
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth >
            <TextField
              id="address-city"
              label="City"
              value={client.address_city}
              onChange={(e) => setClient({ ...client, address_city: e.target.value })}
            />            
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth >
            <TextField
              id="address-state"
              label="State"
              value={client.address_state}
              onChange={(e) => setClient({ ...client, address_state: e.target.value })}            
            />            
          </FormControl>        
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth >
            <TextField
              id="address-zip"
              label="Zipcode"
              value={client.address_zip}
              onChange={(e) => setClient({ ...client, address_zip: e.target.value })}
            />                    
          </FormControl>        
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth >
            <TextField 
              id="birth-month" 
              label="Month" 
              value={client.birth_month}
              onChange={(e) => setClient({ ...client, birth_month: e.target.value })}
            />            
          </FormControl>        
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth >
            <TextField 
              id="birth-day" 
              label="Day" 
              value={client.birth_day}
              onChange={(e) => setClient({ ...client, birth_day: e.target.value })}
            />            
          </FormControl>        
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth >
            <TextField 
              id="birth-year" 
              label="Year" 
              value={client.birth_year}
              onChange={(e) => setClient({ ...client, birth_year: e.target.value })}
            />                           
          </FormControl>        
        </Grid>                                
      </Grid>
    </Box>
  );
}