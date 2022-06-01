import { useState, useEffect } from "react"
import { TableContainer } from '../../components'
import api from '../../api'

const ListTransfers = () => {
    const [data, setData] = useState([])

    const columns = [
        { title: 'Account', field: 'account.accountName' },
        { title: 'User', field: 'user.fullName' },
        { title: 'Type', field: 'type' },
        { title: 'Date', field: 'date'}
    ]

    useEffect(() => {
        api.getAllTransfers()
            .then(response => {
                response.data.forEach(transfer => {
                    transfer.date = transfer.date.split('T')[0]
                })
                setData(response.data)
            })
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
        </>
    )
}

export default ListTransfers