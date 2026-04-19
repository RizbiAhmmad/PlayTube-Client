import { getUserInfo } from "@/services/auth.services";
import Navbar from "./Navbar";

const Header = async () => {
    const userInfo = await getUserInfo();

    return (
        <Navbar userInfo={userInfo} />
    );
};

export default Header;
