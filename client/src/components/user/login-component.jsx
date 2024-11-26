import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import userStore from '../../store/user-store.js';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const { isLoading, loginRequest } = userStore();
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        loginRequest(email).then((data) => {
            if (data.status === 'success') {
                sessionStorage.setItem('email', email);
                toast.success(data.message);
                navigate('/verify', { replace: true });
            } else if (data.status === 'fail') {
                toast.error(data.message);
            }
        });
    };

    return (
        <div>
            <div className="container section">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-5">
                        <form onSubmit={onSubmit}>
                            <div className="card p-5">
                                <h4>Enter Your Email</h4>
                                <p>A verification code will be sent to the email address you provide.</p>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email Address"
                                    type="email"
                                    className="form-control"
                                    required
                                />
                                <Button
                                    type="submit"
                                    className="mt-3"
                                    variant="success"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Loading...' : 'Next'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
