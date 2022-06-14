import * as React from 'react';
import PropTypes from 'prop-types';

import { Button, Dialog, DialogTitle } from '@mui/material';
import { ClientGrid }   from './ClientGrid';


export const ClientDialog = (props) => {
    const { onClose, open, client, setClient, onSubmit } = props;

    const handleClose = () => {
      onClose(client);
    };
  
    const handleListItemClick = (value) => {
      onClose(value);
    };
  
    return (
        <Dialog onClose={handleClose} open={open} maxWidth={'md'}>
            <DialogTitle>Create New Client</DialogTitle>

            <ClientGrid client={client} setClient={setClient}/>
            <Button 
              variant="contained"
              sx={{ xs: 12, sm: 12, m: 1, width: '25%' }}

              onClick={() => {onSubmit(client)}}
              >
                Add Client
            </Button>
        </Dialog>
    );
};

ClientDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    client: PropTypes.object.isRequired,
    setClient: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};
  