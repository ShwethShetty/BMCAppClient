import '../landing-page/landing-page.css';
import FormInput from '../../components/forminput';
import { useState ,useEffect} from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';

function ListPage() {
    const {state} = useLocation();
    const { token } = state;
    console.log(token)
    useEffect(() => {
        
        
        try {
         async function fetchData(){
            const res = await axios.get('http://localhost:5000/api/entities/', 
          // values,
          {
            headers: {
              "Content-type": "application/json",
              "Authorization":token
            }
          }
          )
          
          console.log(res)
          if (res.data.status === 'failure') {
            
          } else {
            
          }}
          fetchData()
        }
        catch (err) {
          console.log(err);
        
        }
    },[]);
    
  
    return (
      <div>
  
        Display
      </div>  );
  }
  
  export default ListPage;
  