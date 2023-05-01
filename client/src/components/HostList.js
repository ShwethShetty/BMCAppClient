import React, {Fragment, useEffect} from 'react';
import Host from './Host';
import Loader from './Loader';


const HostList = ({user, fetchedToken}) => {
 
  // const { isAuthenticated, loading } = authState;

  useEffect(() => {
    async function setHosts() {
      try {
        if(user) {
          await getHosts(user.id)
          console.log("hosts after getHosts:", hostContext);
        }
        // setLoadingFalse()
        // console.log("loading after loadUser and setLoadingFalse:", loading);
      } catch (error) {
        console.log(error)
      }
    }

    setHosts()
  }, [])

  if (loading) {
    return <Loader />
  }
  
  return (
    <Fragment>
      {hosts.map(host => {
        console.log(" in map:", host);
        if(host.hostname === active_host) {
          return <Host hostname={host.hostname} activeHost={true} />
        }
        return <Host hostname={host.hostname} activeHost={false} />
      })}
    </Fragment>
    
  );
};

export default HostList;