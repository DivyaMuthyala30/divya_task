import React, { useEffect, useState } from "react";
import { Table, Modal, Form, Row, Col} from "react-bootstrap";
import Axios from "axios";
import { Button } from 'react-bootstrap';
const Login = () => {
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


    const DelFn = (user) => {
        const newarr = userlist.data.filter((each) => each.id !== user.id)
        alert ("Are you sure to delete");
        console.log(newarr);
        setUserlist({ ...userlist, data: newarr })


    }
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);

    // const handleShow = () => setShow(true);


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.name) {
            console.log(file)
            console.log(URL.createObjectURL(file))
            setUserlist({ ...userlist, profilePic: file, profilePicUrl: URL.createObjectURL(file) })
        }
        console.log(file)
    }

    const handleRemoveProfile = () => {
        setUserlist({ ...userlist, profilePic: '', profilePicUrl: '' })
    }

    const handleUpload = () => {
        document.getElementById("profile-pic").click();
    }

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };
   const handleAdduser=()=>{

   }




    return (
        <div className="mt-5">
            <Button variant="success" onClick={handleAdduser}>
                Adduser
            </Button>
           


            <Table striped bordered hover >
                <thead>
                    <tr>

                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Profile Pic</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userlist.data.map((each, index) => {
                            return (

                                <tr key={index}>
                                    <td>{each.first_name}</td>
                                    <td>{each.last_name}</td>
                                    <td><img src={each.avatar} alt="avatar" /></td>
                                    <td>{each.email}</td>
                                    <td><Button variant="primary">Edit</Button></td>
                                    <td> <Button variant="danger" onClick={() => DelFn(each)}>Delete</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }


                </tbody>
            </Table>
            <div>

<Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
        <Modal.Title>ADD DETAILS</Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter the First Name"

                    />

                </Form.Group>
                <Form.Group as={Col} md="12" controlId="validationCustom02">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter the Last Name"

                    />

                </Form.Group>
                <Form.Group as={Col} md="12" controlId="validationCustom03">
                    <Form.Label>Email</Form.Label>

                    <Form.Control
                        type="text"
                        placeholder="abc@gmail.com"
                        defaultvalue=''

                    />



                    <Form.Label>Profile Pic </Form.Label>
                    {
                        userlist.profilePicUrl ?
                            <div>
                                <img src={userlist.profilePicUrl} alt="image" width="90"  height="100" />
                                <div onClick={handleUpload}>Upload new image</div>
                                <button onClick={handleRemoveProfile}>Remove</button>
                            </div>
                            :
                            <div onClick={handleUpload}>Upload new image</div>
                    }
                    <Form.Control type="file" hidden name="profilePic" id="profile-pic" onChange={handleFileChange} />

                </Form.Group>

             </Row>

            <Button type="submit">Submit form</Button>
        </Form>

    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
            Save Changes
        </Button>
    </Modal.Footer>
</Modal>
</div>

        </div>
    )
}
export default Login;