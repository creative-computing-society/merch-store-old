import React, { useEffect } from "react"

const AuthContext = React.createContext({
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
});

export const AuthContextProvider = (props) => {
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setUserIsLoggedIn(true)
        }
    }, []);

    const loginHandler = (token) => {
        localStorage.setItem("token", token)
        setUserIsLoggedIn(true);
    }

    const logoutHandler = () => {
        localStorage.removeItem("token");
        setUserIsLoggedIn(false);
    }

    const contextValue = {
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    }
}

return (
    <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
)

export default AuthContext;