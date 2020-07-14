import React, { Fragment, useContext, useEffect } from "react";
import Password from "../password list/Password";
import AuthContext from "../../context/auth/authContext";
import Loading from "../layout/Loading";
import { Redirect } from "react-router-dom";

const Home = () => {
    const authContext = useContext(AuthContext);
    const { loadUser, loading, isAuthenticated } = authContext;
    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, []);
    if (loading === true || loading === null) {
        return <Loading />;
    }
    if (isAuthenticated) {
        return (
            <Fragment>
                <div className="mt-3">
                    <Password />
                </div>
            </Fragment>
        );
    }
    if (isAuthenticated === false) {
        return <Redirect to="/login" />;
    }
    return null;
};

export default Home;
