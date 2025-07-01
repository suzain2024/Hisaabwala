//this component basically shows the table of the transaction along with edit or delete option with backend api functionality which shows that 
//edit make changes in the amount,type,date etc using 'put' request and delete make changes using 'post' from backend
import React ,{useEffect,useState} from "react";
import {Button,Container,Modal,Form,Table} from "react-bootstrap";
import moment from "moment"; 
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "./home.css";
import { deleteTransactions, editTransactions } from "../../utils/ApiRequest.js";
import axios from "axios";

const TableData=(props)=>{
    const [show,setShow]=useState(false);
    const [transactions,setTransactions]=useState([]);
    //const [loading,setLoading]=use
    const [editingTransaction,setEditingTransaction]=useState(null);
    const [currId,setCurrId]=useState(null);
    const [refresh,setRefresh]=useState(false);
    const [user,setUser]=useState(null);
    const handleEditClick=(itemKey)=>{//check if transaction occurs then match with key
        console.log("Clicked button ID",itemKey);
        if(transactions.length>0){
            const editTran=props.data.filter((item)=>item._id===itemKey);
            setCurrId(itemKey);
            setEditingTransaction(editTran);
            handleShow();
        }
    };
    const handleEditSubmit=async(e)=>{
        const {data}=await axios.put(`${editTransactions}/${currId}`,{
            ...values,
        });
        if(data.success===true){
            await handleClose();
            await setRefresh(!refresh);
            window.location.reload();
        }
        else{
            console.log("error");
        }
    }
    const handleDeleteClick=async(itemkey)=>{
        console.log(user._id);
        console.log("Clicked Button ID",itemkey);
        setCurrId(itemkey);
        const {data}=await axios.post(`${deleteTransactions}/${itemkey}`,{
            userId:props.user._id,
        });
        if(data.success===true){
            await setRefresh(!refresh);
            window.location.reload();
        }
        else{
            console.log("error");
        }
    }
    const [values,setValues]=useState({
        title:"",
        amount:"",
        description:"",
        category:"",
        date:"",
        transactionType:"",
    });
    const handleChange=(e)=>{
        setValues({...values,[e.target.name]:e.target.value});//for making any chnages
    };
    const handleClose=(e)=>{
         e.preventDefault();
        setValues({...values,[e.target.name]:e.target.value});//for closing the transaction
    };
    const handleShow=()=>{
        setShow(true);//when transaction is displayed then convert it visible
    }
    useEffect(()=>{
        setUser(props.user);
        setTransactions(props.data);
    },[props.data,props.user,refresh]);
    return (
    <>
      <Container>
        <Table responsive="md" className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {props.data.map((item, index) => (
              <tr key={index}>
                <td>{moment(item.date).format("YYYY-MM-DD")}</td>
                <td>{item.title}</td>
                <td>{item.amount}</td>
                <td>{item.transactionType}</td>
                <td>{item.category}</td>
                <td>
                  <div className="icons-handle">
                    <EditNoteIcon
                      sx={{ cursor: "pointer" }}
                      key={item._id}
                      id={item._id}
                      onClick={() => handleEditClick(item._id)}
                    />

                    <DeleteForeverIcon
                      sx={{ color: "red", cursor: "pointer" }}
                      key={index}
                      id={item._id}
                      onClick={() => handleDeleteClick(item._id)}
                    />

                    {editingTransaction ? (
                      <>
                        <div>
                          <Modal show={show} onHide={handleClose} centered>
                            <Modal.Header closeButton>
                              <Modal.Title>
                                Update Transaction Details
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <Form onSubmit={handleEditSubmit}>
                                <Form.Group
                                  className="mb-3"
                                  controlId="formName"
                                >
                                  <Form.Label>Title</Form.Label>
                                  <Form.Control
                                    name="title"
                                    type="text"
                                    placeholder={editingTransaction[0].title}
                                    value={values.title}
                                    onChange={handleChange}
                                  />
                                </Form.Group>

                                <Form.Group
                                  className="mb-3"
                                  controlId="formAmount"
                                >
                                  <Form.Label>Amount</Form.Label>
                                  <Form.Control
                                    name="amount"
                                    type="number"
                                    placeholder={editingTransaction[0].amount}
                                    value={values.amount}
                                    onChange={handleChange}
                                  />
                                </Form.Group>

                                <Form.Group
                                  className="mb-3"
                                  controlId="formSelect"
                                >
                                  <Form.Label>Category</Form.Label>
                                  <Form.Select
                                    name="category"
                                    value={values.category}
                                    onChange={handleChange}
                                  >
                                    <option value="">{editingTransaction[0].category}</option>
                                    <option value="Groceries">Groceries</option>
                                    <option value="Rent">Rent</option>
                                    <option value="Salary">Salary</option>
                                    <option value="Tip">Tip</option>
                                    <option value="Food">Food</option>
                                    <option value="Medical">Medical</option>
                                    <option value="Utilities">Utilities</option>
                                    <option value="Entertainment">
                                      Entertainment
                                    </option>
                                    <option value="Transportation">
                                      Transportation
                                    </option>
                                    <option value="Other">Other</option>
                                  </Form.Select>
                                </Form.Group>

                                <Form.Group
                                  className="mb-3"
                                  controlId="formDescription"
                                >
                                  <Form.Label>Description</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="description"
                                    placeholder={editingTransaction[0].description}
                                    value={values.description}
                                    onChange={handleChange}
                                  />
                                </Form.Group>

                                <Form.Group
                                  className="mb-3"
                                  controlId="formSelect1"
                                >
                                  <Form.Label>Transaction Type</Form.Label>
                                  <Form.Select
                                    name="transactionType"
                                    value={values.transactionType}
                                    onChange={handleChange}
                                  >
                                    <option value={editingTransaction[0].transactionType}>{editingTransaction[0].transactionType}</option>
                                    <option value="Credit">Credit</option>
                                    <option value="Expense">Expense</option>
                                  </Form.Select>
                                </Form.Group>

                                <Form.Group
                                  className="mb-3"
                                  controlId="formDate"
                                >
                                  <Form.Label>Date</Form.Label>
                                  <Form.Control
                                    type="date"
                                    name="date"
                                    value={values.date}
                                    onChange={handleChange}
                                  />
                                </Form.Group>
                              </Form>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Close
                              </Button>
                              <Button variant="primary" type="submit" onClick={handleEditSubmit}>Submit</Button>
                            </Modal.Footer>
                          </Modal>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default TableData;
 