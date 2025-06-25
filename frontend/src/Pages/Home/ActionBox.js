import React,{useState} from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";//to make UI more intutive we use this pencil icon for editing
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";//to make UI more intutive we use this delete icon for deleting
import "./home.css";
import { editTransactions } from "../../utils/ApiRequest";
import axios from "axios";
const ActionBox=(props)=>{//take props like id for making change
    const [index,setIndex]=useState();
    const handleEditClick=async(e)=>{
        e.preventDefault();
        setIndex(index);
    }
    const handleDeleteClick=async(e)=>{
        e.preventDefault();
    }
    return (
    <>
      <div className="icons-handle">
        <EditNoteIcon sx={{ cursor: "pointer" }} onClick={handleEditClick} />
        <DeleteForeverIcon
          sx={{ color: "red", cursor: "pointer" }}
          onClick={handleDeleteClick}
        />
      </div>
    </>
  );
};


export default ActionBox;