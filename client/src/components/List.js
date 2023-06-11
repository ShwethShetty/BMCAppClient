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
import { getActiveHost } from '../redux/host/host.selector';
import React  from 'react';
// import Tree from "react-animated-tree-v2";

// let map;

const List = ({fetchedToken, getInstance,activeHost}) => {
  // activeHost
    const navigate=useNavigate()
    // console.log("fetched token in list component",fetchedToken)
    const [loading,setLoading]=useState(true);

    const [data,setData]=useState({});
    const [map, setMap] = useState({})

    console.log("activeHost in Tree:", activeHost);
    
    useEffect(() => {
      if(fetchedToken==='')
      {
        navigate('/')
      }

      try {
        async function fetchData(){
          console.log("Complete Tree called")
            const res = await axios.post('http://localhost:5000/api/entities/getCompleteTree',
            {
              "hostname": activeHost
              // hostname: localStorage.getItem('activeHost')
            },
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

          // if (res.data.status !== 'failure') {
            setLoading(false)
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
    // activeHost
    
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

    const treeStyles = {
      // left: 40,
      width: "75%",
      
    };

    // const renderTree = (obj) => {

    //   const ans=Object.entries(obj).map((e)=>{
    //     if(Object.keys(e[1]).length === 0){
    //       return (
    //         <CustomizedIconTree content={e[0]} key={e[0]}>
    //           {/* {item.children && renderTree(item.children)} */}
    //         </CustomizedIconTree>
    //       )
    //     }
    //     else{
    //       return (
    //         <CustomizedIconTree content={e[0]} key={e[0]}>
    //           {renderTree(e[1])}
    //         </CustomizedIconTree>
    //       )
    //     }
    //   })
      // console.log("ans:", ans)
      // return ans
    // };

    // const CustomizedIconTree = (props) => (
    //   <Tree
    //     // icons={{ plusIcon: plus, minusIcon: minus, closeIcon: close }}
    //     {...props}
    //     onItemClick={console.log("Item clicked")}
    //     style={treeStyles}
    //   />
    // );
    

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
        <div className={`basis-1/4 overflow-y-scroll`}>
         {/* <div className={`basis-1/4`}> */}
        
            {console.log(loading)} 
            {loading===true ? <Loader/> : <DropdownTreeSelect data={renderData} onChange={onChange} onAction={onAction} onNodeToggle={onNodeToggle} showDropdown={"always"}/>}
          {/* {renderTree(data)} */}
        </div> 
        

      );
  }
  
    const mapStateToProps = createStructuredSelector({
      fetchedToken: getToken,
      activeHost: getActiveHost
    });
    

  // export default connect(mapStateToProps,null)(List);
  export default React.memo(connect(mapStateToProps,null)(List),(prevProps, nextProps) => true);