import React from "react";

import AlumniListModal from "./alumniListModal"
import AlumniActivitiesModal from "./alumniActivitiesModal"
import AlumniAchievementsModal from "./alumniAchivementsModal"
import AlumniGalleryModal from "./alumniGalleryModal"
import SettingModal from "./settingModal"

export default function Modal(props) {
  const [showModal, setShowModal] = React.useState(true);
  switch(props.modalToggle){

    case "/admin/alumniManagement" : 
              if(props.alumniTab == 0){
                return(<AlumniListModal alumniData = {props.alumniData} setAlumniData={props.setAlumniData} setModalToggle ={ props.setModalToggle} setReloadChild={props.setReloadChild} />);
              } else if(props.alumniTab == 1) {
                return(<AlumniActivitiesModal alumniData = {props.alumniData} setAlumniData={props.setAlumniData} setModalToggle ={ props.setModalToggle} setReloadChild={props.setReloadChild} />);
              } else if(props.alumniTab == 2){
                return(<AlumniAchievementsModal alumniData = {props.alumniData} setAlumniData={props.setAlumniData} setModalToggle ={ props.setModalToggle}  setReloadChild={props.setReloadChild}/>);
              } else {
                return(<AlumniGalleryModal setModalToggle ={ props.setModalToggle} setReloadChild={props.setReloadChild} />);
              }

    case "/admin/settings" : 
              if(props.settingsEdit == 1){
                return(<SettingModal  setModalToggle ={ props.setModalToggle} setReloadChild={props.setReloadChild} />);
              } else{
                return null
              }
        
    default: return null;
  }
 
}