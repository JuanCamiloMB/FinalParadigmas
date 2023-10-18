import {signOut} from 'firebase/auth'
import {auth} from '../firebase'
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const navigate = useNavigate()

  const logout = async ()=>{
    await signOut(auth);
    navigate(0)
  }
  
    return (<>
    <h1>Profile</h1>
    <button onClick={logout}>LogOut</button>
    </>
    )
  };
  
export default Profile;