import { useState, useEffect } from "react"
import { TableContainer, tableIcons, SnackAlert } from '../../components'
import { useNavigate } from "react-router-dom";
import api from '../../api'

const ListTransfers = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)
    const [resultMessage, setResultMessage] = useState({ message: '', status: '' })

    const columns = [
        { title: 'Account', field: 'account.accountName' },
        { title: 'User', field: 'user.fullName' },
        { title: 'Type', field: 'type' },
        { title: 'Date', field: 'date'}
    ]

    useEffect(() => {
        api.getAllTransfers()
            .then(response => setData(response.data))
            .catch(err => { })
    }, [])

    return (
        <>
            <h1>Transfers</h1>
            <TableContainer
                title="Transfers"
                columns={columns}
                data={data}
            />
            <SnackAlert open={open} resultMessage={resultMessage} redirectionUrl='/transfers' />
        </>
    )
}

export default ListTransfers