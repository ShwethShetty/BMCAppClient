import styles from '../styles/List.module.css'
import { useState ,useEffect} from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { ListContainer, ListItem } from "../styles";
import { DragHandle } from "../patials/DragHandle";

const List = () => {
    const {state} = useLocation();
    const { token, cliVerified } = state;
    console.log(token)
    const [list,setList]=useState([]);
    document.body.style = 'background: white';

    // console.log(state);
    
    useEffect(() => {
        
      // if (cliVerified) {
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
           
           // console.log(res.data);
           // console.log(res.data);
           setList(res.data.result);
           if (res.data.status === 'failure') {
             
           } else {
             
           }}
           fetchData()
         }
         catch (err) {
           console.log(err);
         
         }
      // }
    },[]);
    
    console.log(list);

    
  
    return (
        <div className={`${styles.list} basis-1/4`}>
          <ListContainer>
            {/* <h2>Entity Types</h2> */}
            {list.map((item) => (
                <ListItem>
                <DragHandle />
                <span>{item}</span>
                </ListItem>
            ))}
          </ListContainer>
            {/* {
                cliVerified ?
                 :
                <h1>Please verify credentials for cli</h1>
            } */}
        </div> 
      );
  }

  
    //   <div className={`${styles.dashboard}`}>
    //     <Navbar />

  // <div className='attrValue'>
        //   <h2>Attribute Display</h2>
        // </div>
        
    //   </div>  
  
  export default List;
  