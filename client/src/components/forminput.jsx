import "./forminput.css"
import {useState} from "react";

const FormInput = (props) =>{
    const [focused, setFocused]= useState(false);

    const {label,onChange, id,errormsg, ...inputProps}=props;

    const handleFocus = (e) =>{
        setFocused(true);
    }
    return(
        <div className="FormInput">
            {/* <label>Username</label> */}
            <label>{label}</label>
            <input {...inputProps} onChange={onChange} onBlur={handleFocus} focused={focused.toString()} />
            <span>{errormsg}</span>
        </div>
    )
}

export default FormInput