import React from "react";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import Modal from "components/modal";
import AlumniTabBody from "../components/tabBody/alumniTabBody";
import DashboardTabBody from "../components/tabBody/dashboardTabBody";

import { useRouter } from "next/router"

export default function Admin({ children }) {

  const [sidebarToggle, setSidebarToggle] = React.useState(1);
  const [modalToggle, setModalToggle] = React.useState("");
  const [alumniTab, setAlumniTab] = React.useState(0);
  const [alumniData, setAlumniData] = React.useState(null);
  const [dashboardTab, setDashboardTab] = React.useState(0);

  const [reloadChild, setReloadChild] = React.useState(0);
  const [settingsEdit, setSettingsEdit] = React.useState(0);

  const router = useRouter()

  const handleReloadChild = () => {
    // No action needed here, only pass the handler function to the ChildComponent
  };

  return (
    <div className="bg-[#F9FAFE]">
      <div className="">
        <div className={`  ${sidebarToggle?`block`:`hidden`}  `}>
          <Sidebar  />
        </div>
        {/* <span onClick={()=>{setSidebarToggle(!sidebarToggle)}} className={`${sidebarToggle?`md:ml-60`:`md:ml-9`} z-50 w-9 rounded-full hover:bg-slate-100 h-7 mt-7 text-center items-center flex justify-center hover:cursor-pointer bg-white absolute `}>
        <i className="fas fa-thin fa-sort rotate-90 text-2xl "></i>
        </span> */}
      </div>
      <div className={`relative h-fit ${sidebarToggle?`md:ml-64`:`md:ml-0`} md:ml-64 bg-[#F9FAFE] `}>
        {/* admin header nav */}
        <AdminNavbar sidebarToggle = {sidebarToggle} setModalToggle = {setModalToggle} setAlumniTab = {setAlumniTab} alumniTab = {alumniTab} setDashboardTab = {setDashboardTab} dashboardTab = {dashboardTab}  setSettingsEdit ={setSettingsEdit} settingsEdit= {settingsEdit}/>
        {/* Header */}
        {/* <HeaderStats /> */}
        <div className=" md:px-10 mx-auto w-full h-screen flex flex-col items-stretch justify-between  ">
          <div className="mt-36 ">
            {/* admin body */}
            {/* {children} */}
            {React.Children.map(children, (child) => {
              return React.cloneElement(child, { reloadChild:reloadChild,setReloadChild:setReloadChild });
            })}
            {router.route == "/admin/alumniManagement" ? <AlumniTabBody alumniTab = {alumniTab} setModalToggle = {setModalToggle} setAlumniData={setAlumniData} reloadChild={reloadChild} setReloadChild={setReloadChild} /> : <></> }
            {router.route == "/admin/dashboard" ? <DashboardTabBody  dashboardTab = {dashboardTab}  reloadChild={reloadChild} setReloadChild={setReloadChild} />  : <></> }
         
            <Modal modalToggle = {modalToggle} setModalToggle = {setModalToggle}  alumniData ={alumniData} setAlumniData={setAlumniData} alumniTab = {alumniTab} dashboardTab = {dashboardTab}  setReloadChild={setReloadChild}  settingsEdit= {settingsEdit} setSettingsEdit ={setSettingsEdit}/>
          </div>
          <div className="mb-4">
              {/* admin footer */}
            <FooterAdmin />
          </div>
        </div>
      </div>
    </div>
  );
}
