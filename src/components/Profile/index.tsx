import { useAuth } from "../../hooks";

const Profile = () =>{
    const {account} = useAuth();

    return(
        <>
            <h1>Profile</h1>
            <p>Welcome {account.name}</p>
        </>
    );
}

export default Profile;