// import '../landing-page/landing-page.css';
// import FormInput from '../../components/forminput';
// import { useState,useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';

//   function LandingPage(props) {
//       const [values,setValues]= useState({
//         username:"",
//         password:"",
//       });
//       const navigate = useNavigate();
//       const [error, setError] = useState(false);
//       document.body.style = 'background: cornflowerblue';
    
//       const inputs=[
//         {
//           id:1,
//           name: "username",
//           type: "text",
//           placeholder: "Username",
//           label: "Username",
//           errormsg: "Cannot be empty",
//           required: true
//         },
//         {
//           id:2,
//           name: "password",
//           type: "password",
//           placeholder: "Password",
//           label: "Password",
//           errormsg: "Must contain at least 1 char and 1 number",
//           required: true,
//           pattern: "^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$"
//         },
    
//       ]
    
//       const handleSubmit= async (e)=>{
//         e.preventDefault();
//         console.log(values);
//         try {
//           const res = await axios.post('http://localhost:5000/api/users/login/', 
//           values,
//           {
//             headers: {
//               "Content-type": "application/json",
//             }
//           }
//           )
//           console.log(res.data.status);
//           console.log(res.data)
//           if (res.data.status === 'failure') {
//             setError(true)
//           } else {
//             setError(false)
//             console.log(props)
//             navigate("/clicreds",{ state: { token:res.data.token, cliVerified: false }})
//           }
//         } catch (err) {
//           console.log(err);
//         }
//       }
    
//       const onChange=(e)=>{
//         setValues({...values,[e.target.name]: e.target.value});
//       }
    
//       return (
//         // <div className='landing'>
//         //   <div className='backDrop'>
//         //     <form onSubmit={handleSubmit}>
//         //       <h1>Sign In</h1>
//         //       {inputs.map((input)=>( 
//         //       <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
//         //       ))}
//         //       { error &&
//         //         <div className="invalidcred">
//         //         INCORRECT USERNAME OR PASSWORD
//         //       </div>
//         //       }
//         //       <button>LOGIN</button>
//         //     </form>
//         //   </div>
//         // </div>
//         <div className='h-screen flex items-center justify-center landing'>
//             {/* <form onSubmit={handleSubmit}>
//               <h1>Sign In</h1>
//               {inputs.map((input)=>( 
//                 <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
//               ))}
//               { error &&
//                 <div className="invalidcred">
//                 INCORRECT USERNAME OR PASSWORD
//               </div>
//               }
//               <button>LOGIN</button>
//             </form> */}
//         </div>  
//       );
//     }
  
//   export default LandingPage;
  