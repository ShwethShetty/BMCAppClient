import { useEffect, useState, Fragment} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import List from './List';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {getToken} from "../redux/user/user.selector";
import { getActiveHost } from '../redux/host/host.selector';
import styles from '../styles/HostAdd.module.css'
import { render } from '@testing-library/react';
import Table from './Table';
import Graph from './Graph';
import Loader from './Loader';
// import useStateWithCallback from 'use-state-with-callback';
// import { useStateCallback } from "use-state-callback";


let myTimer;

const Console = ({fetchedToken,activeHost}) => {
  // activeHost

    // console.log("localStorage activeHost from console:", localStorage.getItem("activeHost"));

    const navigate = useNavigate();

    const [selectedInstance, setSelectedInstance] = useState([])
    const [attributeList, setAttributeList] = useState({});
    const [selectedAttribute, setSelectedAttribute] = useState({});

    const [loading, setLoading] = useState(false);

    // console.log("token is",fetchedToken)
    // console.log("activeHost is:", activeHost);
    

    useEffect(() => {

        if(fetchedToken === '') {
            navigate("/")
        }

        // if(firstRender.current) {
        //     firstRender.current = false
        // }

        clearInterval(myTimer)
        // let counter = 0

        const fetchAttributes = async () => {
          try {
                // console.log("selectedInstance:", selectedInstance);
                // console.log("loading:", loading);
                const res = await axios.post(
                    "http://localhost:5000/api/entities/getAttributes",
                    {
                      instance: selectedInstance[1],
                      entity: selectedInstance[0],
                      // hostname: activeHost
                      hostname: activeHost
                    },
                    {
                      headers: {
                        "Content-type": "application/json",
                        "Authorization":fetchedToken
                      }
                    }
                  )
                  console.log(res.data)
                  setAttributeList(res.data)
                  
                  // console.log("Attribute List:", attributeList, "for instance:", selectedInstance);
            } catch (error) {
                console.log(error);
            }
        }

        fetchAttributes().then(() => {
          setLoading(false)
        })
        
        myTimer = setInterval(async () => {
            await fetchAttributes()
        }, 5000);

        


        // console.log("My timer in useEffect",myTimer)

    }, [selectedInstance])
    // activeHost

    const getInstance = (instance) => {
        console.log("getInstance called");
        // console.log("My timer in getInstance:", myTimer)
        clearInterval(myTimer)
        setSelectedInstance(instance)
        setLoading(true)
        // setLoading(false)
    }


    const getAttribute = async (attribute) => {
        let attributeNameValue = attributeList[attribute]
        // console.log("In get attribute ", attributeList[attribute])

        setSelectedAttribute({
            attribute,
            attributeNameValue,
        })
        // console.log("Attribute after setSelectedAttribute in Console:", selectedAttribute);
    }

    const clearAttribute = () => {
      setSelectedAttribute({})
      // console.log("My timer in clearAttribute", myTimer)
      // clearInterval(myTimer)
    }

    // useState = attribute, setAttribute
    // attribute = ""
    // Click -> setAttribute(LDldDiskQueueLength)
    // Graph -> props = attribute
    // Render if attribute !== ""
    // console.log("selectedAttribute before click:", selectedAttribute);

    return (
    <div className={`flex ${styles.host_add_div} overflow-y-scroll`}>
        <List
            getInstance = {getInstance}
            // activeHost={activeHost}
        />
        {
            Object.keys(selectedAttribute).length === 0 ?
            <Fragment>
              {
                selectedInstance.length === 0 ?
                <div className='flex items-center justify-center w-full'>
                  <h2>Select an instance to view it's attributes</h2>
                </div> :
                <Fragment>
                  {
                    loading ? 
                    <div className='flex items-center justify-center w-full'>
                      <Loader />
                    </div>
                     :
                    <Table
                      attributeList={attributeList} 
                      getAttribute={getAttribute}
                      // activeHost={activeHost}
                    />
                  }
                </Fragment>
                
              }
            </Fragment>
             :
            <Graph 
              selectedAttribute={selectedAttribute} 
              clearAttribute={clearAttribute} 
              selectedInstance={selectedInstance}
              // activeHost={activeHost}
            />
        }

    </div>
    );
}


  
  const mapStateToProps = createStructuredSelector({
    fetchedToken: getToken,
    activeHost: getActiveHost
  });
  
export default connect(mapStateToProps,null)(Console);
