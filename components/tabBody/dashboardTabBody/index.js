import React from "react";
import ContactList from "./contactList";
import AdmissionEnquiry from "./admissionEnquiry";
import NewsLetters from "./newsLetters";
// components



// layout for page


export default function DashboardTabBody(props) {
   
    switch(props.dashboardTab){
        case 0 :return (
            <>
    
  

            <ContactList reloadChild = {props.reloadChild}  setReloadChild ={props.setReloadChild} />
               
            </>
          );
          case 1 :return (
            <>
    
            <AdmissionEnquiry reloadChild = {props.reloadChild}  setReloadChild ={props.setReloadChild} />
               
            </>
          );
          case 2 :return (
            <>
    
           <NewsLetters reloadChild = {props.reloadChild}  setReloadChild ={props.setReloadChild} />
               
            </>
          );
        default: return(<>asd</>)
    }
  
}



