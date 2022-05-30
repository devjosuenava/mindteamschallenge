import { useState, useEffect } from "react"
import { TableContainer, tableIcons, SnackAlert } from '../../components'
import { useNavigate } from "react-router-dom";
import api from '../../api'

const ListAccounts = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)
    const [resultMessage, setResultMessage] = useState({ message: '', status: '' })

    const columns = [
        { title: 'Account', field: 'accountName' },
        { title: 'Client', field: 'clientName' },
        { title: 'Responsible', field: 'responsibleName' }
    ]

    const actions = [
        {
            icon: tableIcons.Edit,
            tooltip: 'Edit Account',
            // onClick: (event, rowData) => console.log(rowData)
            onClick: (event, rowData) => navigate('/accounts/edit', { state: { data: rowData } })
        },
        {
            icon: tableIcons.Delete,
            tooltip: 'Delete Account',
            onClick: (event, rowData) => api.deleteUser(rowData._id)
                .then(
                    result => {
                        setResultMessage({ message: result.data.message, status: result.data.status })
                        setOpen(true)
                        setTimeout(() => setOpen(false), 3000)
                        setData(data.filter(item => item._id !== rowData._id))
                    }
                )
        }
    ]

    const options = {
        actionsColumnIndex: -1
    }

    useEffect(() => {
        api.getAllAccounts()
            .then(response => setData(response.data))
            .catch(err => { })
    }, [])

    return (
        <>
            <h1>Users</h1>
            <TableContainer
                title="Accounts"
                columns={columns}
                actions={actions}
                data={data}
                options={options}
            />
            <SnackAlert open={open} resultMessage={resultMessage} redirectionUrl='/users' />
        </>
    )
}

export default ListAccounts