import { AccountContainer } from '../../components'
import { useLocation } from 'react-router-dom'

const EditAccount = () => {
    const { state } = useLocation();
    const { data } = state
    return <AccountContainer mode='edit' accountData={data} />
}

export default EditAccount