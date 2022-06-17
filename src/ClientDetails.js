import React from 'react';
import { Box, FormControl, Grid, TextField } from '@mui/material';

const handleChange = (e, client, setClient, setChanges, mykey) => {
    e.preventDefault();
    e.stopPropagation(); // Really this time.

    setClient({ ...client, [mykey]: e.target.value });
    setChanges(true);
}
/**
 * ProtectedTextField - just prevents NULL fields from screwing up TextField
 * Odd, but I had to move this function outside the ClientDetails component because it was 
 * trying to render after every keystroke and losing focus. Solution found in link below.
 * https://stackoverflow.com/questions/5581799/how-to-stretch-div-height-to-fill-parent-div-css
 */
const ProtectedTextField = (props) => {
    const myProps = {...props};
    if (myProps.value === null || myProps.value === undefined) {
        myProps.value = '-----';
    }
    return(<TextField {...myProps}  />);
};

export const ClientDetails = (props) => {
    const {client, setClient, setChanges } = props;
        
    if (client === null || client === undefined) return (<div/>);

    return (
        <Box sx={{ width: 500, maxWidth: 500 }}>
            <Box m={2} alignItems={"center"} >
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <FormControl fullWidth >
                            <ProtectedTextField
                                id="first-name"
                                label="First Name"
                                value={client.first_name}
                                onChange={(e) => {
                                    handleChange(e, client, setClient, setChanges, "first_name");
                                }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={7}>
                        <FormControl fullWidth >
                            <ProtectedTextField
                                id="last-name"
                                label="Last Name"
                                value={client.last_name}
                                onChange={(e) => {
                                    handleChange(e, client, setClient, setChanges, "last_name");
                                }}                                
                            />              
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth >
                            <ProtectedTextField
                                id="address-street"
                                label="Street"
                                value={client.address_street}
                                onChange={(e) => {
                                    handleChange(e, client, setClient, setChanges, "address_street");
                                }}
                            />            
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth >
                            <ProtectedTextField
                                id="address-city"
                                label="City"
                                value={client.address_city}
                                onChange={(e) => {
                                    handleChange(e, client, setClient, setChanges, "address_city");
                                }}                                
                            />            
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl fullWidth >
                            <ProtectedTextField
                                id="address-state"
                                label="State"
                                value={client.address_state}
                                onChange={(e) => {
                                    handleChange(e, client, setClient, setChanges, "address_state");
                                }}                                
                            />            
                        </FormControl>        
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth >
                            <ProtectedTextField
                                id="address-zip"
                                label="Zipcode"
                                value={client.address_zip}
                                onChange={(e) => {
                                    handleChange(e, client, setClient, setChanges, "address_zip");
                                }}                                
                            />                    
                        </FormControl>        
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl fullWidth >
                            <ProtectedTextField 
                                id="birth-month" 
                                label="Month" 
                                value={client.birth_month}
                                onChange={(e) => {
                                    handleChange(e, client, setClient, setChanges, "birth_month");
                                }}                                
                            />            
                        </FormControl>        
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl fullWidth >
                            <ProtectedTextField 
                                id="birth-day" 
                                label="Day" 
                                value={client.birth_day}
                                onChange={(e) => {
                                    handleChange(e, client, setClient, setChanges, "birth_day");
                                }}                                
                            />            
                        </FormControl>        
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth >
                            <ProtectedTextField 
                                id="birth-year" 
                                label="Year" 
                                value={client.birth_year}
                                onChange={(e) => {
                                    handleChange(e, client, setClient, setChanges, "birth_year");
                                }}                                
                            />                           
                        </FormControl>        
                    </Grid>                                
                </Grid>
            </Box>
        </Box>        
    );
}

