import '../landing-page/landing-page.css';
import FormInput from '../../components/forminput';
import { useState,useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

  function  CliCredsPage(props) {
      const [values,setValues]= useState({
        username:"",
        password:"",
      });
      const navigate = useNavigate();
      const {state} = useLocation();
      const { token } = state;
      // console.log(token);
      const [error, setError] = useState(false);
      document.body.style = 'background: cornflowerblue';
      
      // console.log(state);

    
      const inputs=[
        {
          id:1,
          name: "username",
          type: "text",
          placeholder: "Username",
          label: "Username",
          errormsg: "Cannot be empty",
          required: true
        },
        {
          id:2,
          name: "password",
          type: "password",
          placeholder: "Password",
          label: "Password",
          errormsg: "Must contain at least 1 char and 1 number",
          required: true,
          pattern: "^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$"
        }
    
      ]
    
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
              "Authorization": token
            }
          }
          )
          console.log(res.data.result);
          console.log(res.data)
          if (res.data.result !== 'Success') {
            setError(true)
          } else {
            setError(false)
            console.log(props)
            navigate("/list",{ state: { token:res.data.token, cliVerified: true }})
          }
        } catch (err) {
          console.log(err);
        }
      }
    
      const onChange=(e)=>{
        setValues({...values,[e.target.name]: e.target.value});
      }
    
      return (
        <div className='landing'>
    
          <form onSubmit={handleSubmit}>
            <h1>CLI Credentials Validation</h1>
            {inputs.map((input)=>( 
            <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
            ))}
            { error &&
              <div className="invalidcred">
              INCORRECT USERNAME OR PASSWORD
            </div>
            }
            <button>Verify</button>
          </form>
        </div>  );
    }
  
  export default CliCredsPage;
  