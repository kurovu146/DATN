import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { authApi } from '../../api';

function Verify() {
    const navigate = useNavigate();
    const [isVerify, setIsVerify] = useState(false);

    useEffect(() => {
        const href = window.location.href;
        const urlSplit = href.split("&");
        if (urlSplit.length > 1) {
            const email = urlSplit[0].split("=")[1];
            const code = urlSplit[1].split("=")[1];
            handleVerify(email, code);
        }
    }, []);

    const handleVerify = (email: string, code: string) => {
        authApi.postApiVerify({ email, code })
            .then(res => {
                toast.success(res?.data?.message);
                setIsVerify(true);
                setTimeout(() => navigate("/login"), 5000);
            })
            .catch(err => {
                console.log(err);
                toast.error(err?.response?.data?.message);
            })
    };

    return (
        <div className='container d-flex align-items-center flex-column mx-auto text-center'>
            <h1 className='m-5'>Verify your account</h1>
            {isVerify &&
                <div>
                    <p>You have successfully verified account.!</p>
                    <p>You will be redirected Login page after 5 seconds</p>
                    <button className="btn btn-primary" type="button" onClick={() => navigate("/login")}>Go To Login</button>
                </div>
            }
            <ToastContainer />
        </div>
    )
};

export default Verify;
