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
import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'
import './List.css'
import React  from 'react';
// let map;

const List = ({fetchedToken, getInstance}) => {
    const navigate=useNavigate()
    // console.log("fetched token in list component",fetchedToken)
    const [loading,setLoading]=useState(true);

    const [data,setData]=useState({});
    const [map, setMap] = useState({})
    
    useEffect(() => {
      if(fetchedToken==='')
      {
        navigate('/')
      }

      try {
        async function fetchData(){
          console.log("Complete Tree called")
            const res = await axios.get('http://localhost:5000/api/entities/getCompleteTree',
            {
              headers: {
                "Content-type": "application/json",
                "Authorization":fetchedToken
              }
            }
          )

          console.log("Complete Tree call complete")
          
          setData(res.data.tree);

          setMap(res.data.displayNameServerPathMap)

          // if (res.data.status === 'failure') {
            
          // } else {
          //   setLoading(false)
          // }
        }
          // console.log(loading)
          // setLoading(true)
          fetchData()
          
          
          // console.log(loading)
        }
        catch (err) {
          console.log("Error in List:", err);
        }
      // eslint-disable-next-line
    },[]);
    
    // console.log("Tree:", data);
    // console.log("Map:", map);

    
    const returnsTree = (obj) => {
      const ans=Object.entries(obj).map((e)=>{
        if(Object.keys(e[1]).length === 0){
          return ({
            label:e[0],
            value:e[0],
          })
        }
        else{
          return ({
            label:e[0],
            value:e[0],
            children: returnsTree(e[1])
          })
        }
      })
      // console.log("ans:", ans)
      return ans
    }
    

    // const res={
    //   "Windows Operating System": {
    //     "Logical Disks": {
    //       "_Total": {},
    //       "Logical Disk (C:)": {
    //         "Disk Quota Users": {}
    //       }
    //     }
    //   }
    // }
    let renderData = [{}]
    if (JSON.stringify(data) !== "{}") {
      renderData = returnsTree(data)
    }
    
    const onChange = (currentNode, selectedNodes) => {
      console.log('onChange::', currentNode, selectedNodes)
      
      getInstance(map[currentNode.label])
    }
    const onAction = (node, action) => {
      console.log('onAction::', action, node)
    }
    const onNodeToggle = currentNode => {
      console.log('onNodeToggle::', currentNode)
    }

    return (
        <div className={`basis-1/4 overflow-scroll`}>
            {/* {console.log(loading)} {loading===true && (<Loader/>)} */}
          <DropdownTreeSelect data={renderData} onChange={onChange} onAction={onAction} onNodeToggle={onNodeToggle} showDropdown={"always"}/>

        </div> 
        

      );
  }
  
    const mapStateToProps = createStructuredSelector({
      fetchedToken: getToken,
    });
    

  // export default connect(mapStateToProps,null)(List);
  export default React.memo(connect(mapStateToProps,null)(List),(prevProps, nextProps) => true);