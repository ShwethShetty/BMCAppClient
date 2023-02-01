import { useState ,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {getToken} from "../redux/user/user.selector";
// import FolderTree from 'react-folder-tree';
// import 'react-folder-tree/dist/style.css';
import { ListItem, ListContainer } from '../styles';
import {DragHandle} from '../partials/DragHandle';
import Loader from '../components/Loader';

const List = ({fetchedToken}) => {
    const navigate=useNavigate()
    console.log("fetched token in lsit component",fetchedToken)
    const [list,setList]=useState([]);
    const [loading,setLoading]=useState(true);
    document.body.style = 'background: white';

    // console.log(state);
    
    useEffect(() => {
      if(fetchedToken==='')
      {
        navigate('/')
      }

      try {
        async function fetchData(){
            // const res = await axios.get('http://localhost:5000/api/entities/getCompleteTree',
            
            const res = await axios.get('http://localhost:5000/api/entities/getCompleteList', 
          // values,
          {
            headers: {
              "Content-type": "application/json",
              "Authorization":fetchedToken
            }
          }
          )
          
          // console.log(res.data);
          // console.log(res.data);
          setList(res.data);

          if (res.data.status === 'failure') {
            
          } else {
            setLoading(false)
          }}
          console.log(loading)
          setLoading(true)
          fetchData()
          
          
          console.log(loading)
        }
        catch (err) {
          console.log(err);
        }
      // eslint-disable-next-line
    },[]);
    
    console.log("List:", list);

    // const entityTypesTreeArray = []
    
    // for (const entityType in list) {
    //   const instanceTreeArray = []
    //   list[entityType].forEach(instance => {
    //     instanceTreeArray.push({
    //       name: instance
    //     })
    //   })
    //   entityTypesTreeArray.push({
    //     name: entityType,
    //     isOpen: false,
    //     children: instanceTreeArray
    //   })
    // }

    // console.log('entityTypesTreeArray:', entityTypesTreeArray);

    // const treeState = {
    //   name: 'root',
    //   isOpen: true,   // this folder is opened, we can see it's children
    //   children: entityTypesTreeArray
    // };

    

    return (
        <div className={`basis-1/4 overflow-scroll`}>
            {console.log(loading)}
            {loading===true && (<Loader/>)}
            <ListContainer>
            {/* <h2>Entity Types</h2> */}
            {list.map((item) => (
                <ListItem>
                <DragHandle />
                <span>{item}</span>
                </ListItem>
            ))}
          </ListContainer>
          {/* <FolderTree
            data={ treeState }
            showCheckbox={ false }    // default: true
          /> */}
        </div> 
        

        // <DropdownTreeSelect data={data} onChange={onChange} onAction={onAction} onNodeToggle={onNodeToggle} />
      );
  }

  
        //     {/* {
        //         cliVerified ?
        //          :
        //         <h1>Please verify credentials for cli</h1>
        //     } */}
  //     <div className={`${styles.dashboard}`}>
  //       <Navbar />

  // <div className='attrValue'>
  //         <h2>Attribute Display</h2>
  //       </div>
        
  //     </div>  
  
    const mapStateToProps = createStructuredSelector({
      fetchedToken: getToken,
    });
    
  export default connect(mapStateToProps,null)(List);

  