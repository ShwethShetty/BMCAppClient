import React, {Fragment, useEffect, useState} from 'react';
import Host from './Host';
import Loader from './Loader';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {getToken,getId} from "../redux/user/user.selector";
import { getActiveHost,getHostList } from '../redux/host/host.selector';
import {setActiveHost,setHostList} from '../redux/host/host.actions'

import axios from 'axios';


const HostList = ({user, fetchedToken, activeHost,setHostList,hostList,id}) => {
 
  // const { isAuthenticated, loading } = authState;
  // const [hosts, setHosts] = useState([])

  console.log("user in hostlist component:", user);

  console.log("localStorage activeHost from console:", activeHost);

  useEffect(() => {
    async function getHosts() {
      try {
        const res = await axios.get(
            `http://localhost:5000/api/entities/hosts/${id}`,
            {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": fetchedToken
                }
            }
        )
        // setHosts(res.data.result)
        setHostList(res.data.result)
      } catch (error) {
        console.log(error)
      }
    }

    getHosts()
  }, [user])
  
  return (
    <Fragment>
      {hostList.map(host => {
        console.log(" in map:", host);
        // if(host.hostname === localStorage.getItem("activeHost")) {
        //   if(host.hostname===activeHost){
        //   return <Host hostname={host.hostname} isActiveHost={true} getActiveHost={getActiveHost}/>
        // }
        return <Host hostname={host.hostname}/>
      })}
    </Fragment>
    
  );
};

const mapStateToProps = createStructuredSelector({
    fetchedToken: getToken,
    activeHost: getActiveHost,
    hostList: getHostList,
    id:getId
});

const mapDispatchToProps = (dispatch) => ({
  setActiveHost:(token)=>dispatch(setActiveHost(token)),
  setHostList:(list)=>dispatch(setHostList(list))

});

export default connect(mapStateToProps,mapDispatchToProps)(HostList);