/* eslint-disable */
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'; import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SnackAlert } from '../../components'
import { useLocation, useNavigate } from "react-router-dom";
import api from '../../api'

const theme = createTheme()

export default function AccountAssociateContainer() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const { account } = state

    console.log(state)

    const [newAccountAssociate, setNewAccountAssociate] = useState({})
    const [usersAvailable, setUsersAvailable] = useState([])

    const [open, setOpen] = useState(false)
    const [resultMessage, setResultMessage] = useState({ message: '', status: '' })
    const [triedToSubmit, setTriedToSubmit] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        setTriedToSubmit(true)
        if (validateForm()) {
            api.createAssociate({
                account: account._id,
                user: newAccountAssociate._id,
                responsible: false
            })
            .then(result => {
                setResultMessage({ message: result.data.message, status: result.data.status })
                setOpen(true)
                setTimeout(() => {
                    navigate('/accounts/team', { state: { account: account } })
                }, 2000)
            })
            .catch(error => { })
        }
    };

    const validateForm = () => {
        if (Object.keys(newAccountAssociate).length === 0)
            return false
        return true
    }

    useEffect(() => {
        api.getAvailableUsers()
            .then(response => {
                setUsersAvailable(response.data)
            })
            .catch(err => { })
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'gray' }}>
                        <AssignmentIndIcon />
                    </Avatar>
                    <Typography component="h1" variant="h4">
                        Create a new Account Associate
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <InputLabel id="newAccountAssociateLabel">New Account Associate*</InputLabel>
                        <Select
                            displayEmpty
                            defaultValue={""}
                            label="New Account Associate"
                            onChange={(event => setNewAccountAssociate(event.target.value))}
                            error={Object.keys(newAccountAssociate).length === 0 && triedToSubmit ? true : false}
                        >
                            <MenuItem disabled value="">
                                <em>{
                                    usersAvailable.length !== 0 ?
                                        'Select a new Account Associate from the list'
                                        : 'There are no available users to assign as Account Associates for the account'
                                }</em>
                            </MenuItem>
                            {usersAvailable.map(user => (
                                <MenuItem key={user._id} value={user}>
                                    {user.fullName}
                                </MenuItem>
                            ))
                            }
                        </Select>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Set New Account Associate
                        </Button>
                        <SnackAlert open={open} resultMessage={resultMessage} redirect={false} redirectionUrl='/accounts/team' />
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}