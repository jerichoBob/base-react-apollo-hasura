import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Grid, TextField } from '@mui/material';

const StyledTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  // textAlign: 'center',
  color: theme.palette.text.secondary,
}));
  
  export const ClientGrid = (props) => {
    const { client, setClient } = props;
    return (
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap' ,   
        '& .MuiTextField-root': { m: 1, width: '30ch' }
      }}
        // component="form"
        // sx={{
        //   '& .MuiTextField-root': { m: 1, width: '30ch' },
        // }}
        // noValidate
        // autoComplete="off"
      >
        <Grid container >
          <Grid item >
            <TextField 
              required
              id="first-name"
              label="First Name"
              defaultValue={client.firstName}
              onChange={(e) => setClient({ ...client, firstName: e.target.value })}
            />
          </Grid>
          <Grid item >
            <TextField
              id="last-name"
              required
              label="Last Name"
              defaultValue={client.lastName}
              onChange={(e) => setClient({ ...client, lastName: e.target.value })}
            />
          </Grid>
      </Grid>
      <Grid container>
        <Grid item >
          <TextField
            fullWidth={true}
            // sx={{ m: 1, width: '100%' }}
            size='medium'
            id="address-street"
            label="Street"
            defaultValue={client.address_street}
            onChange={(e) => setClient({ ...client, address_street: e.target.value })}
          />
        </Grid>
      </Grid>
      <Grid container >
        <Grid item>
          <TextField
            id="address-city"
            label="City"
            defaultValue={client.address_city}
            onChange={(e) => setClient({ ...client, address_city: e.target.value })}
          />
        </Grid>
        <Grid item>        
          <TextField
            id="address-state"
            label="State"
            defaultValue={client.address_state}
            onChange={(e) => setClient({ ...client, address_state: e.target.value })}            
          />
        </Grid>
        <Grid item>        
          <TextField
            id="address-zip"
            label="Zipcode"
            defaultValue={client.address_zip}
            onChange={(e) => setClient({ ...client, address_zip: e.target.value })}
          />        
        </Grid> 
      </Grid>
      <Grid container >
        <Grid item >                
          <TextField 
            id="birth-month" 
            label="Month" 
            defaultValue={client.birth_month}
            onChange={(e) => setClient({ ...client, birth_month: e.target.value })}
          />
        </Grid>
        <Grid item>        
          <TextField 
            id="birth-day" 
            label="Day" 
            defaultValue={client.birth_day}
            onChange={(e) => setClient({ ...client, birth_day: e.target.value })}
          />
        </Grid>
        <Grid item>        
          <TextField 
            id="birth-year" 
            label="Year" 
            defaultValue={client.birth_year}
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
