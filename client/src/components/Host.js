import React, {Fragment, useContext} from 'react';


const Host = (props) => {
  console.log("Host Rendered");

  

  const handleSubmit = (e) => {
    const p = e.target.hostname
    console.log(e.target.hostname.value);

    e.preventDefault()
  }
  return (
    <form onSubmit={handleSubmit}>
        <div className="flex gap-x-4">
            <div className="min-w-0 flex-auto">
                <input id={props.hostname} name="hostname" value={props.hostname} className="text-sm font-semibold 

leading-6 text-gray-900" />
            </div>
        </div>
        <div className="hidden sm:flex sm:flex-col sm:items-end">
            {
                props.activeHost ? 
                <p className="text-sm leading-6 text-gray-900">Active</p> :
                <button type='submit' className="text-sm leading-6 text-gray-900">Make active</button>
            }
        </div>
    </form>
);
};

export default Host;