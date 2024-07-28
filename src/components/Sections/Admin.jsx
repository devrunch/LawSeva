import Login from './admin/Login'
import UploadForm from './admin/UploaderForm'
import Infographics from './admin/Infographics'
import {useEffect,useState} from 'react'
const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const isAuth = async (token) => {
        const response = await fetch('https://utility.caclouddesk.com/api/infographics/auth/admin', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (data.auth === true) {
            return true;
        }
        else {
            return false;
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            isAuth(token).then((auth) => {
                if (auth) {
                    setIsAuthenticated(true);
                }
            });
        }
    }
        , [])
    return (
        <>
            {isAuthenticated ?
                (<><UploadForm /><Infographics /></>)
                :
                (<Login auth={setIsAuthenticated} />)
            }
        </>
    )
}

export default Admin
