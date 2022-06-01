import '../../styles/FormHeader.css'
import { useNavigate } from 'react-router-dom'

const FormHeader = ({ header, button }) => {
    let navigate = useNavigate()
    console.log(button)
    return (
        <div className="header">
            {header}
            <input
                type="button"
                value={button.text}
                className="btn"
                onClick={() => navigate(button.url, button.state.account)}
            />
        </div>
    )
}

export default FormHeader