import React from "react";

const Table = ({attributeList, getAttribute}) => {
    const onClick = (e) => {
        getAttribute(e.target.innerText)
    }

    return (
        <div className="mt-16 basis-3/4 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">            
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Parameter Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Value
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Data Type
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {console.log("Attribute List in JSX:", attributeList)} */}
                        {
                           Object.keys(attributeList).map(key=>{
                            return (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <button onClick={onClick}>{key.toString()}</button>
                                        </th>
                                        <td className="px-6 py-4">
                                            {attributeList[key][1]}
                                        </td>
                                        <td className="px-6 py-4">
                                            {attributeList[key][2]}
                                        </td>
                                    </tr>
                              )
                            // console.log(`${key}: ${value}`);
                          }) 
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table

