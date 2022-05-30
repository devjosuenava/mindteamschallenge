/* eslint-disable */
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from "@material-ui/core/IconButton"
import InputAdornment from "@material-ui/core/InputAdornment"
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SnackAlert } from '..'
import api from '../../api'

const theme = createTheme()

export default function AccountContainer({ mode, accountData }) {
    const [accountName, setAccountName] = accountData ? useState(accountData.accountName) : useState('')
    const [clientName, setClientName] = accountData ? useState(accountData.clientName) : useState('')
    const [emailError, setEmailError] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)

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
                    clientName: clientName
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
        if (accountName === "" || clientName === "" )
            return false
        return true
    }

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
                        <PersonAddAltIcon />
                    </Avatar>
                    <Typography component="h1" variant="h4">
                        {mode === 'create' ? 'Create a new Account' : 'Edit the Account'}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Full Name"
                            autoComplete="fullName"
                            autoFocus
                            value={fullName}
                            onChange={(event) => { setFullName(event.target.value) }}
                            error={fullName === "" && triedToSubmit ? true : false}
                            helperText={fullName === "" && triedToSubmit ? 'Please type a full name' : ''}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            value={email}
                            autoComplete="email"
                            onChange={(event) => handleValidateEmail(event)}
                            error={(emailError || email === "") && triedToSubmit ? true : false}
                            helperText={(emailError || email === "") && triedToSubmit ? 'Please type a valid email' : ''}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={passwordVisible ? 'text' : 'password'}
                            id="password"
                            autoComplete="current-password"
                            onChange={(event) => handleValidatePassword(event)}
                            error={(passwordError || password === "") && triedToSubmit ? true : false}
                            helperText={(passwordError || password === "") && triedToSubmit ? 'Password must be between 4 and 8 digits long and include at least one numeric digit.' : ''}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={togglePasswordVisibility}>
                                            {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        {/* <InputLabel id="roleLabel">Role</InputLabel>
                        <Select
                            displayEmpty
                            labelId="roleLabel"
                            id="role"
                            value={role}
                            label="Role"
                            // renderValue={(selected) => {
                            //   if (selected.length === 0) {
                            //     return <em>Select a role from the menu</em>;
                            //   }
                            //   return selected.join(', ');
                            // }}
                            onChange={handleRoleChange}
                            error={role === "" && triedToSubmit ? true : false}
                        >
                            <MenuItem disabled value="">
                                <em>Select a role</em>
                            </MenuItem>
                            {roles.map((role) => (
                                <MenuItem
                                    key={role}
                                    value={role}
                                >
                                    {role}
                                </MenuItem>
                            ))}
                        </Select> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {accountData ? 'Update' : 'Register'}
                        </Button>
                        <SnackAlert open={open} resultMessage={resultMessage} redirectionUrl='/users' />
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}