import { useState, useEffect } from "react"
import { TableContainer, tableIcons, SnackAlert } from '../../components'
import { useNavigate } from "react-router-dom";
import api from '../../api'
import { useLocation } from 'react-router-dom'

const TeamAccount = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { account } = state

    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)
    const [resultMessage, setResultMessage] = useState({ message: '', status: '' })

    const columns = [
        { title: 'User', field: 'user.fullName' },
        { title: 'Responsible', field: 'responsible' }
    ]
    const actions = [
        {
            icon: tableIcons.Edit,
            tooltip: 'Edit Account',
            onClick: (event, rowData) => console.log(rowData)
            // onClick: (event, rowData) => navigate('/accounts/edit', { state: { data: rowData } })
        },
        // {
        //     icon: tableIcons.GroupsIcon,
        //     tooltip: 'Account Team',
        //     onClick: (event, rowData) => navigate('/accounts/team', { state: { account: rowData } })
        // },
        // {
        //     icon: tableIcons.Delete,
        //     tooltip: 'Delete Account',
        //     onClick: (event, rowData) => api.deleteAccount(rowData._id)
        //         .then(
        //             result => {
        //                 setResultMessage({ message: result.data.message, status: result.data.status })
        //                 setOpen(true)
        //                 setTimeout(() => setOpen(false), 3000)
        //                 setData(data.filter(item => item._id !== rowData._id))
        //             }
        //         )
        // }
    ]

    const options = {
        actionsColumnIndex: -1
    }

    useEffect(() => {
        if (!state) navigate('/accounts')
        api.getAccountAssociates({ id: account._id })
            .then(response => {
                response.data.forEach( associate => associate.responsible ? associate.responsible = 'Yes' : 'No')
                setData(response.data)
                })
            .catch(err => { })
    }, [])

    return <TableContainer title={`${account.accountName} - Team`} columns={columns} actions={actions} data={data} options={options} />
}

export default TeamAccount