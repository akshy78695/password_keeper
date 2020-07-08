import React, { Fragment, useContext, useEffect } from "react";
import Password from "../password list/Password";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;
    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, []);
    return (
        <Fragment>
            <div className="mt-3">
                <Password />
            </div>
        </Fragment>
    );
};

export default Home;
