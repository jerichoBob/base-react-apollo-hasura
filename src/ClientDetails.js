

// eslint-disable-next-line
import { palette } from '@mui/system';
// eslint-disable-next-line
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export const ClientDetails = (props) => {
    return (
        <Box sx={{ width: 345, maxWidth: 500 }}>

        <Typography variant="h5" gutterBottom component="div">
          Client Details
        </Typography>
        <Typography variant="h6" gutterBottom component="div">
          Name
        </Typography>

        {props.client !== null &&
            <Typography variant="body1" gutterBottom component="div" style={{'margin-left':25}}>
                {props.client.first_name} {props.client.last_name}
            </Typography>
        }
        <Typography variant="h6" gutterBottom component="div">
          Address
        </Typography>
        {props.client !== null &&
            <div style={{'margin-left':25}}>
            {/* <div style={margin:(110,10,20,30)}> */}
                <Typography variant="body1" gutterBottom component="div">
                    {props.client.address_street_number}  {props.client.address_street_name}
                </Typography>
                <Typography variant="body1" gutterBottom component="div">
                    {props.client.address_city} {props.client.address_state} {props.client.address_zip}  
                </Typography>
            </div>

        }
        <Typography variant="h6" gutterBottom component="div">
          Date of Birth
        </Typography>
        {props.client !== null &&
            <Typography variant="body1" gutterBottom component="div" style={{'margin-left':25}}>
                {props.client.birth_month}.{props.client.birth_day}.{props.client.birth_year}
            </Typography>
        }
    </Box>        
    );
}

