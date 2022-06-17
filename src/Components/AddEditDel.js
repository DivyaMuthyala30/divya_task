import React, { useEffect, useState } from "react";
import { Table, Modal, Col, Form, Button, Row, InputGroup } from "react-bootstrap";
import Axios from "axios";

const AddEditDel = () => {
    const [userlist, setUserlist] = useState(
        {
            data: []
        }
    )
    useEffect(() => {
        console.log("useEffect")
        Axios.get('https://reqres.in/api/users?page=1')
            .then(function (response) {
                console.log(response);
                setUserlist(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setAddmodal({
            ...addmodal, first_name: '',
            last_name: '',
            email: ''
        })
        setIsAdd(true)
        setShow(true)

    }
    // **************PROFILE*********
    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file && file.name) {
    //         console.log(file)
    //         console.log(URL.createObjectURL(file))
    //         setAddmodal({ ...addmodal, profilePic: file, profilePicUrl: URL.createObjectURL(file) })
    //     }
    //     console.log(file)
    // }
    // const handleRemoveProfile = () => {
    //     setAddmodal({ ...addmodal, profilePic: '', profilePicUrl: '' })
    // }

    // const handleUpload = () => {
    //     document.getElementById("profile-pic").click();
    // }
    
    // ************/ edit functionality*********************
    const [isAdd, setIsAdd] = useState(false)
    const edituser = (user) => {
        console.log('user', user);
        setAddmodal(user);
        setShow(true)
        setIsAdd(false)
    }
    //************/ add  functionality*********************
    const [addmodal, setAddmodal] = useState({
        first_name: '',
        last_name: '',
        email: ''
    })
    const handleInputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setAddmodal({ ...addmodal, [name]: value })
    }
    const addBtn = (e) => {
        if (handleSubmit(e)) {
            if (isAdd) {
                console.log("add th users")
                const { data } = userlist;
                data.push(addmodal)
                setUserlist({ ...userlist, data: data });
                handleClose();

            }
            else {
                const getEdit = data.findIndex((eachedit) => eachedit.id === addmodal.id)
                console.log("getEdit", getEdit)
                data[getEdit] = addmodal
                setUserlist({ ...userlist, data: data })
                handleClose();
            }

        }
    }
    //************/ del functionality*********************
    const [DeleteUser, setDeleteUser] = useState({});
    const [deleted, setDeleted] = useState(false);
    const handleClosedelete = () => setDeleted(false);

    const { data } = userlist
    const deletedata = (user) => {
        setDeleted(true)
        setDeleteUser(user)

    }
    const deleteFn = () => {
        const getIndex = data.indexOf(DeleteUser);
        data.splice(getIndex, 1)


        setUserlist({ ...userlist, data: data });
        handleClosedelete();
    }
    // ******************Profile****************************
    const handlePictureChange = (e) => {
        // const {file} = e.target;
        const { files } = e.target;
        const localImageUrl = window.URL.createObjectURL(files[0]);
        console.log("url", localImageUrl)
        setAddmodal({ ...addmodal, avatar: localImageUrl })
    }
    console.log("url", addmodal.avatar);

    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        console.log('validations');
        if (!addmodal.first_name && !addmodal.last_name && !addmodal.email) {
            const form = event.currentTarget;
            if (form.checkValidity()=== false) {
                event.preventDefault();
                event.stopPropagation();
            } 
            setValidated(true)
            return false
        }
        else {
            return true

        }
    }

    return (
        <div className="mt-5">
            <Button variant="primary" onClick={handleShow}>
                ADD USER
            </Button>
            <Table striped bordered hover >
                <thead className="text-center">
                    <tr>

                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Profile Pic</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="text-center">

                    {
                        userlist.data.map((each, index) => {
                            return (

                                <tr key={index}>
                                    <td>{each.first_name}</td>
                                    <td>{each.last_name}</td>
                                    <td><img src={each.avatar} alt="image" width="90" height="90" /></td>
                                    <td>{each.email}</td>
                                    <td><Button variant="primary" onClick={() => edituser(each)}>Edit</Button></td>
                                    <td> <Button variant="danger" onClick={() => deletedata(each)}>Delete</Button>

                                    </td>
                                </tr>
                            )
                        })
                    }


                </tbody>
            </Table>
            {/* ******Add modal***** */}

            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{
                            isAdd ? "Add New User" : "Edit User"}Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate validated={validated}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12" controlId="validationCustom01">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text" name='first_name'
                                        placeholder="Enter the First Name" value={addmodal.first_name} onChange={handleInputChange}

                                    />
                                    <Form.Control.Feedback type="invalid">
                                        filed is required
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="12" controlId="validationCustom02">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text" name='last_name'
                                        placeholder="Enter the Last Name" value={addmodal.last_name} onChange={handleInputChange}

                                    />
                                    <Form.Control.Feedback type="invalid">
                                        filed is required
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} md="12" controlId="validationCusomUsername">
                                    <Form.Label>Email</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            type="text" name="email"
                                            placeholder="name@example" value={addmodal.email} onChange={handleInputChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            please enter valid email*
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={Col} md="12" controlId="validationCustom02">
                                    <Form.Label >Profile Pic </Form.Label>
                                    <Form.Control
                                        required
                                        type="file"
                                        onChange={handlePictureChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        this filed is required*
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                {/* 
                                <Form.Group as={Col} md="12">

                                    <Form.Label>Upload Profile</Form.Label>
                                    {
                                        Modal.profilePicUrl ?
                                            <div>
                                                <img src={Modal.profilePicUrl} height="100" />
                                                <Button variant="secondary" onClick={handleRemoveProfile}>Remove</Button>
                                            </div>
                                            :
                                            <div onClick={handleUpload}>Upload new image</div>
                                    }
                                    <Form.Control required type="file" hidden name="profilePic" id="profile-pic" onChange={handleFileChange} />
                                </Form.Group> */}
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" onClick={addBtn}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>


                {/* modal for delete */}s

                <Modal
                    show={deleted} onHide={handleClosedelete}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        Are you sure to delete
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={deleteFn}>Delete</Button>
                    </Modal.Footer>
                </Modal>


            </div>




        </div >
    )
}
export default AddEditDel;