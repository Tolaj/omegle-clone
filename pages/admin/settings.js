import React from "react";
import { isUserSignedIn, getTokenData } from "utils/auth";
import axios from "axios";

import Admin from "layouts/Admin.js";



export default function Settings(props) {

  const [userData, setUserData] = React.useState({
    email:"",
    name:"",
    password:""
  }); // Set userData to Array of Objects, one Object per Row


  React.useEffect(async () => {
    !isUserSignedIn() ? router.push('/') : null
    
    let token = localStorage.getItem('token')
    await axios.post(`${process.env.SERVER_API}api/users/profile`,{_id:getTokenData(token).id},{
        headers: {
          'Authorization': token
        },
      })
    .then((userData) => {
    setUserData(userData.data)
    })
}, [props.reloadChild]);

  return (
    <>
      <div className="flex flex-wrap gap-6 ">
       <div className="w-1/3 h-52 bg-white shadow-lg rounded-xl">
           <span className="text-black text-xl uppercase hidden p-6 ml-0 lg:inline-block font-bold">
              ACCOUNT
           </span>
           <span className="text-black text-xl uppercase hidden p-6 ml-0 lg:inline-block font-bold">
              {userData.email}
           </span>
       </div>
       <div className="w-1/3 h-52 bg-white shadow-lg rounded-xl flex flex-col">
           <span className="text-black text-xl uppercase hidden p-6 ml-0 lg:inline-block font-bold">
              PASSWORD
           </span>
           <span className="text-black text-3xl uppercase hidden p-6 ml-0 lg:inline-block font-bold">
              **********
           </span>
       </div>
       <div className="w-1/4 h-52 bg-white shadow-lg rounded-xl">
           <span className="text-black text-xl uppercase hidden p-6 ml-0 lg:inline-block font-bold">
              HELP
           </span>
           <span className="text-black text-base uppercase hidden p-6 ml-0 lg:inline-block font-semibold">
              Please contact super admin in case of an issue 
           </span>
       </div>
      </div>
    </>
  );
}

Settings.layout = Admin;
