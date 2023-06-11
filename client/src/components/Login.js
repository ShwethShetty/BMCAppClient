// import '../landing-page/landing-page.css';
// import FormInput from '../../components/forminput';
// import FormInput from './forminput';
import { useState, Fragment } from 'react';
import { useNavigate } from "react-router-dom";
// import styles from '../styles/Login.module.css'
import axios from 'axios';
// import Navbar from './Navbar'
import{  setToken,setId } from "../redux/user/user.actions";
import { connect } from "react-redux";

const Login = ({setToken,setId}) => {
    const [values,setValues]= useState({
        username:"",
        password:"",
    });
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const handleSubmit = async (e)=>{
    e.preventDefault();
    console.log(values);
    try {
        const res = await axios.post('http://localhost:5000/api/users/login/', 
        values,
        {
        headers: {
            "Content-type": "application/json",
        }
        }
        )
        console.log(res.data.status);
        console.log(res.data)
        if (res.data.status === 'failure') {
        setError(true)
        } else {
        setError(false)
        // console.log(props)
        console.log("settint token")
        setToken(res.data.token)
        setId(res.data.id)
        navigate("/hosts")
        // navigate("/addhost",{ state: { token:res.data.token, cliVerified: false }})
        }
    } catch (err) {
        console.log(err);
    }
    }

    const onChange=(e)=>{
        setValues({...values,[e.target.name]: e.target.value});
    }

    return (
    <Fragment>
        <div className={`mt-16 flex flex-auto items-center justify-center py-12 px-4 sm:px-6 lg:px-8`}>
            <div className={`w-full max-w-md space-y-8 shadow-xl p-4 rounded`}>
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Login</h2>
                </div>
                <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="sr-only">Username</label>
                        <input onChange={onChange} id="username" name="username" type="text" autoComplete="email" required className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Username" />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input onChange={onChange} id="password" name="password" type="password" autoComplete="current-password" required className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" />
                    </div>
                    { error &&
                        <div className="invalidcred">
                            INCORRECT USERNAME OR PASSWORD
                        </div>
                    }
                    <div>
                        <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </Fragment>
    );
}

const mapDispatchToProps = (dispatch) => ({
    setToken:(token)=>dispatch(setToken(token)),
    setId:(id)=>dispatch(setId(id))
  
  });
  
  
  
export default connect(null,mapDispatchToProps)(Login);

// export default Login;
