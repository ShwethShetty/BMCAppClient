import React, {Fragment, useContext, useState} from 'react';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {getToken} from "../redux/user/user.selector";
import { getActiveHost } from '../redux/host/host.selector';
import {setActiveHost} from '../redux/host/host.actions'


const Host = ({hostname, activeHost,setActiveHost}) => {
  console.log("Host Rendered");

//   function useForceRerender() {
//     const [state, setState] = useState({ value: 10 });
  
//     function rerenderForcefully() {
//       setState((prev) => {
//         return { ...prev };
//       });
//     }
  
//     return rerenderForcefully;
//   }

//   const forceUpdate = useForceRerender()

  const handleSubmit = (e) => {
    const p = e.target.hostname
    console.log(e.target.hostname.value);
    // getActiveHost(e.target.hostname.value)
    // localStorage.setItem('activeHost', e.target.hostname.value)
    setActiveHost(e.target.hostname.value)
    // window.location.reload()
    e.preventDefault()
  }
  return (
    <form onSubmit={handleSubmit} class="bg-white p-6 rounded-lg ">
        <div class="relative bg-white p-6 rounded-lg shadow-lg">
            {/* <h2 class="text-2xl font-bold mb-2 text-gray-800">Card with no image</h2> */}
            <input id={hostname} name="hostname" value={hostname} className="text-base font-semibold leading-6 text-gray-900" />
            {/* <p class="text-gray-700">This is my cool new card!</p> */}
            
            {
                activeHost === hostname ?
                <button type="button" class="absolute text-green-500 font-semibold">Active</button>:
                // <p className="text-sm leading-6 text-gray-900">Active</p> :
                <button type='submit' className="absolute text-red-700 hover:text-green-600 hover:font-semibold">Make active</button>
            }
        </div>
    </form>
);
};

const mapStateToProps = createStructuredSelector({
  fetchedToken: getToken,
  activeHost: getActiveHost,
});

const mapDispatchToProps = (dispatch) => ({
  setActiveHost:(token)=>dispatch(setActiveHost(token))

});



export default connect(mapStateToProps,mapDispatchToProps)(Host);