import React from "react";

// reactstrap components
// import { Spinner } from "reactstrap";

// core components

export default function PageChange(props) {
  return (
    <div className="absolute  z-50 ">
        <div className="flex items-center justify-center h-screen  w-screen backdrop-blur-sm ">
        <div className="my-32 mx-auto w-[200px] text-center relative z-50 top-0">
          <div className="block mb-4">
      
            <img src="/has.png" alt="" className="mx-auto animate-bounce" />
          </div>
          <h4 className="text-lg font-medium text-black">
          {props.progress ?"Uploading ...":"Loading ..."}
          </h4>
          {props.progress ?
           <div className="w-full bg-gray-200 rounded-full mt-2 dark:bg-gray-700">
           <div className={`bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full `} style={{ width: props.progress*2 }}> {props.progress}%</div>
         </div>
          :
          null}
         
        </div>
      </div>
    </div>
    
  );
}
