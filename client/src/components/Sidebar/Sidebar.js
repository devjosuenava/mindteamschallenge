import "./sidebar.css";
import SidebarLink from "./SidebarLink";

// Material UI imports
import HomeIcon from "@material-ui/icons/Home";
import GroupIcon from '@mui/icons-material/Group';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { useNavigate } from 'react-router-dom'

function Sidebar() {
    let navigate = useNavigate()
    return (
        <div className="sidebar">
            <SidebarLink
                text="Dashboard"
                Icon={HomeIcon}
                onClick={ () => {navigate('/dashboard')}}
            />
            <SidebarLink
                text="Users"
                Icon={GroupIcon}
                onClick={ () => { navigate('/users')}}
            />
            <SidebarLink
                text="Accounts"
                Icon={AccountBalanceWalletIcon}
                onClick={ () => {
                    navigate('/accounts')
                }}
            />
            <SidebarLink
                text="Transfers"
                Icon={TransferWithinAStationIcon}
                onClick={ () => {
                    navigate('/transfers')
                }}
            />
            <SidebarLink
                text="Sign out"
                Icon={MeetingRoomIcon}
                onClick={ () => {
                    window.localStorage.removeItem("auth")
                    window.location.href = '/'
                }}
            />
        </div>
    );
}
export default Sidebar;