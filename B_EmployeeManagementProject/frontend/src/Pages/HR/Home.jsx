import { useSelector } from "react-redux";

function Home() {
    const user = useSelector((state) => state.auth.user);

    return (
        <div style={{marginTop: "150px", marginLeft: "20px"}}>HR Home Page for {user.username}</div>
    )
}

export default Home;