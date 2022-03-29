import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import Alert, { EAlertClass } from "../../components/Alert";
import { AppContext } from "../../context/AppContext";
import { IdentityService } from "../../services/identity-service";

const Register = () => {
    const appState = useContext(AppContext);

    const [loginData, setLoginData] = useState({ email: "", password: "" , firstName: "", lastName: ""});
    const [alertMessage, setAlertMessage] = useState("");

    const registerClicked = async (e: Event) => {
        e.preventDefault();
        if (loginData.email === "" || loginData.password === "") {
            setAlertMessage("Empty email or password!");
        }
        setAlertMessage("");
        let response = await IdentityService.Login("Account/Register", loginData);
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
            <form onSubmit={(e) => registerClicked(e.nativeEvent)}>
                <div className="row">
                    <div className="col-sm-1 col-md-3"></div>
                    <div className="col-sm-10 col-md-6">
                    <h4>Create a new account</h4>
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
                                    placeholder="password"
                                />
                            </div>
                            <br/>
                            <div className="form-group">
                                <label htmlFor="Input_Firstname">Firstname</label>
                                <input
                                    value={loginData.firstName}
                                    onChange={(e) => setLoginData({ ...loginData, firstName: e.target.value })}
                                    className="form-control"
                                    type="firstname"
                                    id="Input_Firstname"
                                    name="Input.Firstname"
                                    placeholder="firstname"
                                />
                            </div>
                            <br/>
                            <div className="form-group">
                                <label htmlFor="Input_Lastname">Lastname</label>
                                <input
                                    value={loginData.lastName}
                                    onChange={(e) => setLoginData({ ...loginData, lastName: e.target.value })}
                                    className="form-control"
                                    type="lastname"
                                    id="Input_Lastname"
                                    name="Input.Lastname"
                                    placeholder="lastname"
                                />
                            </div>
                            <br/>
                            <div className="form-group">
                                <button
                                    onClick={(e) => registerClicked(e.nativeEvent)}
                                    type="submit"
                                    className="btn btn-dark"
                                >
                                    Register
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Register;
