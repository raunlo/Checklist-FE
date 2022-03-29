import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import Alert, { EAlertClass } from "../../components/Alert";
import { AppContext } from "../../context/AppContext";
import { IdentityService } from "../../services/identity-service";

const Login = () => {
    const appState = useContext(AppContext);

    const [loginData, setLoginData] = useState({ email: "string@string.com", password: "String1." });
    const [alertMessage, setAlertMessage] = useState("");

    const logInClicked = async (e: Event) => {
        e.preventDefault();
        if (loginData.email === "" || loginData.password === "") {
            setAlertMessage("Empty email or password!");
        }
        setAlertMessage("");
        let response = await IdentityService.Login("Account/Login", loginData);
        if (!response.ok) {
            setAlertMessage(response.messages![0]);
        } else {
            setAlertMessage("");
            appState.setAuthInfo(response.data!.token, response.data!.firstName, response.data!.lastName);
        }
    };

    return (
        <>
            {appState.token !== null ? <Redirect to="/" /> : null}
            <form onSubmit={(e) => logInClicked(e.nativeEvent)}>
                <div className="row">
                    <div className="col-sm-1 col-md-3"></div>
                    <div className="col-sm-10 col-md-6">
                    <h4>Use a local account to log in</h4>
                        <section>
                            <hr />
                            <Alert show={alertMessage !== ""} message={alertMessage} alertClass={EAlertClass.Danger} />
                            <div className="form-group">
                                <label htmlFor="Input_Email">Email</label>
                                <input
                                    value={loginData.email}
                                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                    className="form-control"
                                    type="email"
                                    id="Input_Email"
                                    name="Input.Email"
                                    placeholder="user@example.com"
                                    autoComplete="username"
                                />
                            </div>
                            <br/>
                            <div className="form-group">
                                <label htmlFor="Input_Password">Password</label>
                                <input
                                    value={loginData.password}
                                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                    className="form-control"
                                    type="password"
                                    id="Input_Password"
                                    name="Input.Password"
                                    placeholder="Input your current password..."
                                    autoComplete="current-password"
                                />
                            </div>
                            <br/>
                            <div className="form-group">
                                <button
                                    onClick={(e) => logInClicked(e.nativeEvent)}
                                    type="submit"
                                    className="btn btn-dark"
                                >
                                    Log in
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Login;
