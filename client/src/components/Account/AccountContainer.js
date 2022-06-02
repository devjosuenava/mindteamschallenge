/* eslint-disable */
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'; import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react'
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { SnackAlert } from '..'
import api from '../../api'

const theme = createTheme()

export default function AccountContainer({ mode, accountData }) {
    const [accountName, setAccountName] = accountData ? useState(accountData.accountName) : useState('')
    const [clientName, setClientName] = accountData ? useState(accountData.clientName) : useState('')
    const [userResponsible, setUserResponsible] = accountData ? useState(accountData.userResponsible) : useState({})
    const [usersAvailable, setUsersAvailable] = useState([])

    const [open, setOpen] = useState(false)
    const [resultMessage, setResultMessage] = useState({ message: '', status: '' })
    const [triedToSubmit, setTriedToSubmit] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        setTriedToSubmit(true)
        if (validateForm()) {
            if (mode === 'create') {
                api.createAccount({
                    accountName: accountName,
                    clientName: clientName,
                    userResponsible: userResponsible
                })
                    .then(result => {
                        setResultMessage({ message: result.data.message, status: result.data.status })
                        setOpen(true)
                        setTimeout(() => setOpen(false), 3000)
                    })
                    .catch(error => { })
            } else {
                api.updateAccount(accountData._id, {
                    accountName: accountName,
                    clientName: clientName,
                    userResponsible: userResponsible
                })
                    .then(result => {
                        setResultMessage({ message: result.data.message, status: result.data.status })
                        setOpen(true)
                        setTimeout(() => setOpen(false), 3000)
                    })
            }
        }
    };

    const validateForm = () => {
        if (accountName === "" || clientName === "")
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
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#3A393E' }}>
                        <AssignmentIndIcon />
                    </Avatar>
                    <h1>
                        {mode === 'create' ? 'Create a new Account' : 'Edit the Account'}
                    </h1>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Account Name"
                            autoComplete="accountName"
                            autoFocus                            
                            value={accountName}
                            onChange={(event) => { setAccountName(event.target.value) }}
                            error={accountName === "" && triedToSubmit ? true : false}
                            helperText={accountName === "" && triedToSubmit ? 'Please type the account name' : ''}                            
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Client Name"
                            autoComplete="Client Name"
                            value={clientName}
                            onChange={(event) => { setClientName(event.target.value) }}
                            error={clientName === "" && triedToSubmit ? true : false}
                            helperText={clientName === undefined && triedToSubmit ? 'Please type the client name' : ''}
                        />
                        <InputLabel id="userResponsibleLabel">User Responsible*</InputLabel>
                        <Select
                            displayEmpty
                            defaultValue={""}
                            label="User Responsible"
                            onChange={(event => setUserResponsible(event.target.value))}
                            error={userResponsible === null && triedToSubmit ? true : false}
                        >
                            {
                                mode === 'create' ?
                                <MenuItem disabled value="">
                                    <em>{
                                        usersAvailable.length !== 0 ?
                                            'Select a User Responsible from the list'
                                            : 'There are no available users to assign as responsible for the account'
                                    }</em>
                                </MenuItem>
                                :
                                <MenuItem disabled value="">
                                    <em>{
                                        userResponsible ?
                                            "The User assigned as responsible for this Account is: " +  userResponsible.fullName
                                            : usersAvailable.length === 0 ?
                                                "There are no available users to assign as responsible for the account."
                                                : 'Select a User Responsible from the list'
                                    }</em>
                                </MenuItem>
                            }
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
                            sx={{ 
                                mt: 3, 
                                mb: 2, 
                                bgcolor: '#3A393E',
                                ':hover': {
                                    bgcolor: '#75737a', // theme.palette.primary.main
                                    color: 'white',
                                }, 
                            }}
                        >
                            {accountData ? 'Update Account' : 'Register account'}
                        </Button>
                        <SnackAlert open={open} resultMessage={resultMessage} redirect={true} redirectionUrl='/accounts' />
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}