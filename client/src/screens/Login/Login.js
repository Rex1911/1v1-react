import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import auth from '../../helper/Auth';

export default (props) => {
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsError(false);
        let res = await fetch('/api/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({password: password})
        });
        let data = await res.json();
        if(!data.auth) return setIsError(true);
        
        auth.login(data.token);
        props.history.push('/admin')
    };

    return (
        <div style={{ marginTop: "15%" }}>
            <form onSubmit={handleLogin}>
                <Paper
                    style={{
                        width: "40%",
                        margin: "0 auto",
                        textAlign: "center"
                    }}
                >
                    <Typography style={{ paddingTop: 30 }} variant="h5">
                        Admin Login
                    </Typography>
                    <TextField
                        autoFocus
                        error={isError}
                        name="password"
                        label="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        variant="outlined"
                        style={{ margin: "20px 0px" }}
                        required
                    />
                    <br />
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginBottom: 20 }}
                        type="submit"
                    >
                        Submit
                    </Button>
                </Paper>
            </form>
        </div>
    );
};
