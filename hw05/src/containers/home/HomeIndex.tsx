import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const HomeIndex = () => {
    const appState = useContext(AppContext);

    return (
        <>
            {appState.token === null ? (
                <>
                    <h1>Hello!</h1>
                </>
            ) : (
                <>
                    <h1>
                        Hello, {appState.firstName  + " " +  appState.lastName }!
                    </h1>
                </>
            )}
        </>
    );
};

export default HomeIndex;
