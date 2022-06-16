import React from 'react';
import { Box, FormControl, Grid, TextField } from '@mui/material';

const handleChange = (client, setClient, setChanges, mykey, value) => {
    setClient({ ...client, [mykey]: value });
    setChanges(true);
}

export const ClientDetails = (props) => {
    const {client, setClient, setChanges } = props;
        
    if (client === null || client === undefined) return (<div/>);
    
    return (
        <Box sx={{ width: 500, maxWidth: 500 }}>
            <Box m={2} alignItems={"center"} >
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <FormControl fullWidth >
                            <TextField
                                id="first-name"
                                label="First Name"
                                value={client.first_name}
                                onChange={(e) => {
                                    handleChange(client, setClient, setChanges, "first_name", e.target.value);
                                }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={7}>
                        <FormControl fullWidth >
                            <TextField
                                id="last-name"
                                label="Last Name"
                                value={client.last_name}
                                onChange={(e) => {
                                    handleChange(client, setClient, setChanges, "last_name", e.target.value);
                                }}                                
                            />              
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth >
                            <TextField
                                id="address-street"
                                label="Street"
                                value={client.address_street}
                                onChange={(e) => {
                                    handleChange(client, setClient, setChanges, "address_street", e.target.value);
                                }}
                            />            
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth >
                            <TextField
                                id="address-city"
                                label="City"
                                value={client.address_city}
                                onChange={(e) => {
                                    handleChange(client, setClient, setChanges, "address_city", e.target.value);
                                }}                                
                            />            
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl fullWidth >
                            <TextField
                                id="address-state"
                                label="State"
                                value={client.address_state}
                                onChange={(e) => {
                                    handleChange(client, setClient, setChanges, "address_state", e.target.value);
                                }}                                
                            />            
                        </FormControl>        
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth >
                            <TextField
                                id="address-zip"
                                label="Zipcode"
                                value={client.address_zip}
                                onChange={(e) => {
                                    handleChange(client, setClient, setChanges, "address_zip", e.target.value);
                                }}                                
                            />                    
                        </FormControl>        
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl fullWidth >
                            <TextField 
                                id="birth-month" 
                                label="Month" 
                                value={client.birth_month}
                                onChange={(e) => {
                                    handleChange(client, setClient, setChanges, "birth_month", e.target.value);
                                }}                                
                            />            
                        </FormControl>        
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl fullWidth >
                            <TextField 
                                id="birth-day" 
                                label="Day" 
                                value={client.birth_day}
                                onChange={(e) => {
                                    handleChange(client, setClient, setChanges, "birth_day", e.target.value);
                                }}                                
                            />            
                        </FormControl>        
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth >
                            <TextField 
                                id="birth-year" 
                                label="Year" 
                                value={client.birth_year}
                                onChange={(e) => {
                                    handleChange(client, setClient, setChanges, "birth_year", e.target.value);
                                }}                                
                            />                           
                        </FormControl>        
                    </Grid>                                
                </Grid>
            </Box>
        </Box>        
    );
}

