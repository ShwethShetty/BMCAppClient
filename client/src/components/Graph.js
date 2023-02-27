import React, {useEffect, useRef, useState} from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {getToken} from "../redux/user/user.selector";
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
            display:false
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
    maintainAspectRatio: false 
  };
  
//   const labels = ['1', '2', '3', '4', '5', '6', '7'];
  
//   const data = {
//     labels,
//     datasets: [
//         {
//             label: 'Dataset 1',
//             data: [2, 4, 6, 8, 10, 12, 14],
//             borderColor: 'rgb(53, 162, 235)',
//             backgroundColor: 'rgba(53, 162, 235, 0.5)',
//         },
//     ],
// };

const Graph = ({selectedAttribute, fetchedToken, clearAttribute, selectedInstance}) => {
    // let firstRender = true
    const isFirstRender = useRef(true)
    const [graphData, setGraphData] = useState({})

    console.log("selectedAttribute in Graph", selectedAttribute);

    useEffect(() => {
        console.log("Graph useEffect called");
        console.log("graphData above fetchHistory:", graphData);
        async function fetchHistory() {
            const res = await axios.post(
                'http://localhost:5000/api/entities/getAttributeHistory',
                {
                    "entity" : selectedInstance[0],
                    "instance" : selectedInstance[1],
                    "attribute" : selectedAttribute.attributeNameValue[0]
                },
                {
                    headers: {
                        "Authorization": fetchedToken
                    }
                }
            )
            console.log("res from graph, history:", res.data);
            let historyAttributes = res.data
            historyAttributes.shift()
            console.log("historyAttributes:", historyAttributes);

            let labels = []
            let data = []
            let d=new Date(0);// The 0 there is the key, which sets the date to the epoch
            

            for(let historyAttribute of historyAttributes) {
                console.log("historyAttribute:", historyAttribute);
                data.push(historyAttribute.split(" ")[0])
                d.setUTCSeconds(parseInt(historyAttribute.split(" ")[1]));
                
                labels.push(d.getHours().toString()+":"+d.getMinutes().toString())
            }
            options.plugins.title.text=selectedAttribute.attribute
            
            setGraphData({
                labels,
                datasets: [
                    {
                        label: selectedAttribute.attribute,//legend is disabled, options is being used to display
                        data: data,
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                ]
            }, () => {
                console.log("graphData, should be history:", graphData);
            })
        }

        fetchHistory()
    }, [])

    return (
        <div className="mt-16 basis-3/4 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">            
            {/* <div className="relative overflow-x-auto"> */}
            <div style={{height:"60vh",position:"relative",width: "80vh", marginBottom:"1%", padding:"1%"}}>
            {Object.keys(graphData).length !== 0 && <Line 
                className="h-60 w-96" 
                options={options} 
                data={graphData}
                // height="200px"
                // width="200px"
                // options={{  }} 
            />}
            <button onClick={clearAttribute} className="mt-4 group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Back
            </button>
            </div>
            
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    fetchedToken: getToken,
});

export default connect(mapStateToProps,null)(Graph);

// useEffect(() => {
    //     async function fetchHistory() {
    //         if(isFirstRender.current) {
    //             const res = await axios.get(
    //                 'http://localhost:5000/api/entities/getDummyAttributes',
    //                 {
    //                     headers: {
    //                         "Authorization": fetchedToken
    //                     }
    //                 }
    //             )
    //             console.log("res from graph, history:", res.data);
    //             setGraphData(res.data)
    //             console.log("graphData, should be history:", graphData);
    //             isFirstRender.current = false
    //         } else {
    //             let newGraphData = graphData.slice(0, -1)
    //             newGraphData.push(selectedAttribute.attributeNameValue[1])
    //             setGraphData(newGraphData)
    //         }
    //     }

    //     fetchHistory()

    //     return () => {
    //         setGraphData([])
    //     }
    //     // eslint-disable-next-line
    // }, [selectedAttribute])