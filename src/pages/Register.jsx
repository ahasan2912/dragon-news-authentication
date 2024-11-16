import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const Register = () => {
    const {crateNewUser, setUser, updateUserProfile} = useContext(AuthContext);
    const [error, setError] = useState({});
    const navigate = useNavigate();
    const handdleSubmit = (e) =>{
        e.preventDefault();
        // const name = e.target.name.value;
        const form = new FormData(e.target);
        const name = form.get("name");
        if(name.length < 5){
            setError({...error, name:"Must be more then  5 charecter long"})
            return;
        }
        const email = form.get("email");
        const photo = form.get("photo");
        const password = form.get("password");
        // console.log(name ,email, photo, password);

        //create New User
        crateNewUser(email, password)
        .then(result => {
            // console.log(result.user)
            setUser(result.user)
            updateUserProfile({displayName:name, photoURL:photo})
            .then(()=>{
                navigate('/');
            })
            .catch((err)=>{
                // console.log(err)
            })
        })
        .catch(error => {
            // console.log(error.message)
        })
    }
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className="card bg-base-100 w-full max-w-lg shrink-0 p-10">
                <h2 className='text-2xl font-semibold text-center pt-6'>Register your account</h2>
                <form onSubmit={handdleSubmit} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="name" name='name' className="input input-bordered" required />
                    </div>
                    {
                        error?.name && (
                            <label className='text-xs text-rose-500'>{error.name}</label>
                        )
                    }
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input type="text" placeholder="photo URL" name='photo' className="input input-bordered" required />
                    </div>
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
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Register</button>
                    </div>
                </form>
                <p className='text-center font-semibold text-red-500'>Allready Have an account ? <Link to="/auth/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;