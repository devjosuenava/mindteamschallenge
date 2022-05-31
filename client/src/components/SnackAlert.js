import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

const SnackAlert = ({open, resultMessage, redirectionUrl}) => {
    const navigate = useNavigate()

    useEffect( () => {
        setTimeout( () => {
            if (resultMessage.status === 'success'){            
                navigate(redirectionUrl)        
            }        
        }, 3000)        
    })
    
    return (
        <Snackbar 
            open={open} 
            autoHideDuration={2000} 
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
            <Alert severity={resultMessage.status === 'success' ? 'success' : 'error'} sx={{ width: '100%' }}>
            { resultMessage.message }
            </Alert>
        </Snackbar>
    )
}

export default SnackAlert