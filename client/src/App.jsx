import logo from './logo.svg';
import './App.css';
import FormInput from './components/forminput';
import { useState } from 'react';

function App() {
  const [values,setValues]= useState({
    username:"",
    password:"",
  });

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
    },

  ]

  const handleSubmit=(e)=>{
    e.preventDefault();

  }

  const onChange=(e)=>{
    setValues({...values,[e.target.name]: e.target.value});
  }
  
  console.log(values);

  return (
    <div className='app'>
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        {inputs.map((input)=>( 
        <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
        ))}
        <button>LOGIN</button>
      </form>
    </div>  );
}

export default App;
