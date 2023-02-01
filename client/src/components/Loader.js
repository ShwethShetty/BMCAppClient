import { Oval } from  'react-loader-spinner';

function Loader(){
    
    return(
        // <div className="loaderStyling">
            <Oval
            height={50}
            width={50}
            color="#FFA500"
            wrapperStyle={{"justify-content":"center"}}
            wrapperClass="styling"
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#FFA500"
            strokeWidth={2}
            strokeWidthSecondary={2}/>
        // </div>
            )
    
}

export default Loader;
