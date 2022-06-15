import * as React from 'react';
import { Box, Grid, TextField } from '@mui/material';
  
export const ClientGrid = (props) => {
    const { client, setClient } = props;
    // console.log("ClientGrid:client",JSON.stringify(client));
    console.log("ClientGrid:client.first_name:",client.first_name);

    return (
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap' ,   
        '& .MuiTextField-root': { m: 1, width: '30ch' }
      }}
      >
        <Grid container >
          <Grid item >
            <TextField 
              required
              sx={{ width: '10%' }}
              id="first-name"
              label="First Name"
              value={client.first_name}
              onChange={(e) => setClient({ ...client, first_name: e.target.value })}
            />
          </Grid>
          <Grid item >
            <TextField
              id="last-name"
              required
              label="Last Name"
              value={client.last_name}
              onChange={(e) => setClient({ ...client, last_name: e.target.value })}
            />
          </Grid>
      </Grid>
      <Grid container>
        <Grid item >
          <TextField
            fullWidth={true}
            size='small'
            id="address-street"
            label="Street"
            value={client.address_street}
            onChange={(e) => setClient({ ...client, address_street: e.target.value })}
          />
        </Grid>
      </Grid>
      <Grid container >
        <Grid item>
          <TextField
            id="address-city"
            label="City"
            value={client.address_city}
            onChange={(e) => setClient({ ...client, address_city: e.target.value })}
          />
        </Grid>
        <Grid item>        
          <TextField
            id="address-state"
            label="State"
            value={client.address_state}
            onChange={(e) => setClient({ ...client, address_state: e.target.value })}            
          />
        </Grid>
        <Grid item>        
          <TextField
            id="address-zip"
            label="Zipcode"
            value={client.address_zip}
            onChange={(e) => setClient({ ...client, address_zip: e.target.value })}
          />        
        </Grid> 
      </Grid>
      <Grid container >
        <Grid item >                
          <TextField 
            id="birth-month" 
            label="Month" 
            value={client.birth_month}
            onChange={(e) => setClient({ ...client, birth_month: e.target.value })}
          />
        </Grid>
        <Grid item>        
          <TextField 
            id="birth-day" 
            label="Day" 
            value={client.birth_day}
            onChange={(e) => setClient({ ...client, birth_day: e.target.value })}
          />
        </Grid>
        <Grid item>        
          <TextField 
            id="birth-year" 
            label="Year" 
            value={client.birth_year}
            onChange={(e) => setClient({ ...client, birth_year: e.target.value })}
          />                
        </Grid>
      </Grid>
    </Box>
    );
  }

ClientGrid.propTypes = {
    // onClose: PropTypes.func.isRequired,
    // open: PropTypes.bool.isRequired,
    // selectedValue: PropTypes.string.isRequired,
};
