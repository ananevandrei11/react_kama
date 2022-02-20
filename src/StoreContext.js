import React from "react";
import store from "./Redux/reduxStore";

const StoreContext = React.createContext(store);

export const Provider = (props) => {
    return (
        <StoreContext.Provider value={props.store}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContext;