import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import List from './List';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {getToken} from "../redux/user/user.selector";
import styles from '../styles/HostAdd.module.css'
import { render } from '@testing-library/react';
import Table from './Table';
import Graph from './Graph';

let myTimer;

const Console = ({fetchedToken}) => {

    const navigate = useNavigate();

    const [selectedInstance, setSelectedInstance] = useState([])
    const [attributeList, setAttributeList] = useState({});
    const [selectedAttribute, setSelectedAttribute] = useState({})

    console.log("token is",fetchedToken)
    

    useEffect(() => {

        if(fetchedToken === '') {
            navigate("/")
        }

        // if(firstRender.current) {
        //     firstRender.current = false
        // }

        clearInterval(myTimer)
        
        myTimer = setInterval(async () => {
            try {
                console.log("selectedInstance:", selectedInstance);
                const res = await axios.post(
                    "http://localhost:5000/api/entities/getAttributes",
                    {
                      instance: selectedInstance[1],
                      entity: selectedInstance[0]
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
                  console.log("Attribute List:", attributeList, "for instance:", selectedInstance);
            } catch (error) {
                console.log(error);
            }
        }, 5000);



        console.log("My timer in useEffect",myTimer)

    }, [selectedInstance])

    const getInstance = (instance) => {
        // console.log("Selected Instance:", instance);
        // console.log("My timer in getInstance:", myTimer)
        clearInterval(myTimer)
        setSelectedInstance(instance)
        // console.log("selectedInstance after set:", );
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
        />
        {
            Object.keys(selectedAttribute).length === 0 ?
            <Table attributeList={attributeList} getAttribute={getAttribute} /> :
            <Graph selectedAttribute={selectedAttribute} clearAttribute={clearAttribute} selectedInstance={selectedInstance}/>
        }

    </div>
    );
}


  
  const mapStateToProps = createStructuredSelector({
    fetchedToken: getToken,
  });
  
export default connect(mapStateToProps,null)(Console);
