import MaterialTable from '@material-table/core'
import tableIcons from './MaterialTableIcons'

export default function TableContainer({ title, columns, actions, options, data }) {
  return (
    <MaterialTable
      title={title}
      icons={tableIcons}
      columns={columns}
      actions={actions}
      data={data}
      options={options}
    />
  )
}