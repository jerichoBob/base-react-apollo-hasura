import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';

import { ClientGrid } from './ClientGrid';
import { BasicGrid } from './BasicGrid';

export const ClientDetails = (props) => {
    const {client, setClient } = props;
    // console.log("ClientDetails.client",JSON.stringify(client));
        
    if (client === null || client === undefined) return (<div/>);
    
    return (
        <Box sx={{ width: 500, maxWidth: 500 }}>
            {/* <ClientGrid client={client} setClient={setClient}/> */}
            <BasicGrid client={client} setClient={setClient}/>
        </Box>        
    );
}

