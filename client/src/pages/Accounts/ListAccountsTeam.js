import { useState, useEffect } from "react"
import { TableContainer, tableIcons, SnackAlert } from '../../components'
import { useLocation, useNavigate } from "react-router-dom";
import '../../styles/FormHeader.css'
import api from '../../api'

const ListAccountsTeam = () => {
    const navigate = useNavigate()
    const { state } = useLocation()
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
            icon: tableIcons.GroupRemoveIcon,
            tooltip: 'Remove Account Associate',
            onClick: (event, rowData) => api.deleteAssociate(rowData._id)
                .then(
                    result => {
                        setResultMessage({ message: result.data.message, status: result.data.status })
                        setOpen(true)
                        setTimeout(() => setOpen(false), 1000)
                        setData(data.filter(item => item._id !== rowData._id))
                    }
                )
        }
    ]

    const options = {
        actionsColumnIndex: -1
    }

    useEffect(() => {
        if (!state) navigate('/accounts')
        api.getAccountAssociates({ id: account._id })
            .then(response => {
                response.data.forEach(associate => associate.responsible ? associate.responsible = 'Yes' : associate.responsible = 'No')
                setData(response.data)
            })
            .catch(err => { })
    })

    return (
        <>
            <div className="header">
            {`List of Account Associates for ${account.accountName}`}
            <input
                type="button"
                value='Add Account Associate'
                className="btn"
                onClick={() => {navigate('/accounts/team/create', { state: { account: account } })}}
            />
            </div>
            <TableContainer
                title={`${account.accountName}`}
                columns={columns}
                actions={actions}
                data={data}
                options={options}
            />
            <SnackAlert open={open} resultMessage={resultMessage} redirect={false} redirectionUrl='/accounts/team' />
        </>
    )
}

export default ListAccountsTeam