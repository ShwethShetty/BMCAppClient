import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import List from './List';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {getToken} from "../redux/user/user.selector";

const HostAdd = ({fetchedToken}) => {
    const [values,setValues]= useState({
        username:"",
        password:"",
    });
    const navigate = useNavigate();
    // const {state} = useLocation();
    // const { token } = state;
    // const token=getToken();
    console.log("token is",fetchedToken)
    const [error, setError] = useState(false);

    const handleSubmit= async (e)=>{
        e.preventDefault();
        console.log(values.username,values.password);
        console.log(values)
        try {
            const res = await axios.post('http://localhost:5000/api/entities/auth', 
            {username:values.username,password:values.password},
            {
                headers: {
                "Content-type": "application/json",
                "Authorization": fetchedToken
                }
            }
            )
            console.log(res.data.result);
            console.log(res.data)
            if (res.data.result !== 'Success') {
                setError(true)
            } else {
                setError(false)
                // console.log(props)
                navigate("/list")
            }
        } catch (err) {
            console.log(err);
        }
    }

    const onChange=(e)=>{
    setValues({...values,[e.target.name]: e.target.value});
    }

    return (
    <div className="flex">
        <List />
        <div className={`mt-16 basis-3/4 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8`}>
            <div className={`w-full max-w-md space-y-8 shadow-xl p-4 rounded`}>
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Add Host</h2>
                </div>
                <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="hostname" className="sr-only">Hostname</label>
                        <input onChange={onChange} id="hostname" name="hostname" type="text" required className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Hostname" />
                    </div>
                    <div>
                        <label htmlFor="username" className="sr-only">Username</label>
                        <input onChange={onChange} id="username" name="username" type="text" required className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Username" />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input onChange={onChange} id="password" name="password" type="password" required className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" pattern="^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$" />
                    </div>
                    { error &&
                        <div className="invalidcred">
                            INCORRECT USERNAME OR PASSWORD
                        </div>
                    }
                    <div>
                        <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Add Host
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
}


  
  const mapStateToProps = createStructuredSelector({
    fetchedToken: getToken,
  });
  
export default connect(mapStateToProps,null)(HostAdd);


