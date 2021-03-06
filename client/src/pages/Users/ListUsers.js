import { useState, useEffect } from "react"
import { TableContainer, tableIcons, SnackAlert, FormHeader } from '../../components'
import { useNavigate } from "react-router-dom";
import api from '../../api'

const ListUsers = ({auth}) => {
  const navigate = useNavigate();
  const [ data, setData ] = useState([])
  const [ open, setOpen ] = useState(false)
  const [ resultMessage, setResultMessage ] = useState({message: '', status:''})  

  const columns = [
    { title: 'Full Name', field: 'fullName' },
    { title: 'Email', field: 'email' },
    { title: 'Role', field: 'role.name' }
  ]

  const actions=[
    {
      icon: tableIcons.Edit,
      tooltip: 'Edit User',
      onClick: (event, rowData) => navigate('/users/edit', { state: { data: rowData }})
    },
    {
      icon: tableIcons.Delete,
      tooltip: 'Delete User',
      onClick: (event, rowData) => api.deleteUser(rowData._id)
        .then(
          result => {
            setResultMessage({message: result.data.message, status: result.data.status})
            setOpen(true)
            setTimeout(() => setOpen(false), 2000)
            setData( data.filter( item => item._id !== rowData._id ))
          }
        )
    }
  ]

  const options={
    actionsColumnIndex: -1
  }

  useEffect(() => {
    api.getAllUsers()
    .then( response => setData(response.data))
    .catch( err => {})
  }, [])

  return (
    <>
      <FormHeader
        header="List of Users"
        button={
          {
            text: "Create User",
            url:"/users/create"}
          }
      />
      <TableContainer
        title="Users"
        columns={columns}
        actions={actions}
        data={data}
        options={options}
      />
      <SnackAlert open={open} resultMessage={resultMessage} redirectionUrl='/users' />
    </>
  )
}

export default ListUsers