import { UserContainer } from '../../components'
import { useLocation } from 'react-router-dom'

const EditUser = () => {
    const {state} = useLocation();
    const { data } = state
    return <UserContainer mode='edit' userData={data} />
}

export default EditUser