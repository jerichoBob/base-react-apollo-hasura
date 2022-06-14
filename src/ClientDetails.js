

// eslint-disable-next-line
import { palette } from '@mui/system';
// eslint-disable-next-line
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export const ClientDetails = (props) => {
    const clientDetails = props.client;
    return (
        <Box sx={{ width: 345, maxWidth: 500 }}>

        <Typography variant="h5" gutterBottom component="div">
          Client Details
        </Typography>
        <Typography variant="h6" gutterBottom component="div">
          Name
        </Typography>

        {clientDetails !== null &&
            <Typography variant="body1" gutterBottom component="div" style={{'marginLeft':25}}>
                {clientDetails.first_name} {clientDetails.last_name}
            </Typography>
        }
        <Typography variant="h6" gutterBottom component="div">
          Address
        </Typography>
        {clientDetails !== null &&
            <div style={{'marginLeft':25}}>
            {/* <div style={margin:(110,10,20,30)}> */}
                <Typography variant="body1" gutterBottom component="div">
                    {clientDetails.address_street}
                </Typography>
                <Typography variant="body1" gutterBottom component="div">
                    {clientDetails.address_city} {clientDetails.address_state} {clientDetails.address_zip}  
                </Typography>
            </div>

        }
        <Typography variant="h6" gutterBottom component="div">
          Date of Birth
        </Typography>
        {clientDetails !== null &&
            <Typography variant="body1" gutterBottom component="div" style={{'marginLeft':25}}>
                {clientDetails.birth_month}.{clientDetails.birth_day}.{clientDetails.birth_year}
            </Typography>
        }
    </Box>        
    );
}

