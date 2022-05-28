import MaterialTable from 'material-table'
import tableIcons from './MaterialTableIcons'

export default function TableContainer({ title, columns, data }) {
 return (
    <MaterialTable title={title} icons={tableIcons} columns={columns} data={data}/>
  )
}