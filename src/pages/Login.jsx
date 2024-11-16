import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { useContext, useState } from 'react';

const Login = () => {
    const { userLogin, setUser } = useContext(AuthContext)

    const [error, setError] = useState({});

    const location = useLocation(); //not understand
    const navigate = useNavigate(); //not understand
    const hadleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        userLogin(email, password)
            .then(result => {
                setUser(result.user);
                navigate(location?.state ? location.state : "/");
            })
            .catch(err => {
                setError({...error, login: err.code})
            })
    }
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className="card bg-base-100 w-full max-w-lg shrink-0 p-10">
                <h2 className='text-2xl font-semibold text-center pt-6'>Login your account</h2>
                <form onSubmit={hadleSubmit} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name='password' placeholder="password" className="input input-bordered" required />

                        {
                            error.login && (
                                <label className='label'>{error.login}</label>
                            )
                        }

                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
                <p className='text-center font-semibold text-red-500'>Dont't Have an account ? <Link to="/auth/register">Register</Link></p>
            </div>
        </div>
    );
};

export default Login;