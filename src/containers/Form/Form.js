import { Modal, ModalBody, ModalHeader, Input, Button,Label,  FormFeedback } from "reactstrap";
import { connect } from "react-redux";
import * as actions from '../../store/action/user'
import {useEffect} from 'react'

const RegistrationForm  = props => {
    useEffect(() => {
    }, [props.formInputs])
    const submitFormHandlerMethod = () => {
        props.submitFormHandler(props.formInputs);
        props.toggleModal();
    }
    const closeModalHandler = () => {
        props.setFormInputs();
    }
    return(
        
        <Modal toggle={props.toggleModal} onClosed={() => closeModalHandler()} isOpen={props.showModal}>
        <ModalHeader toggle={props.toggleModal}>Login Form</ModalHeader>
        <ModalBody>
            <Label>NAME</Label>
            <Input invalid={!props.error.name.valid && props.error.name.touched} type="text" name="name" placeholder="NAME" value={props.formInputs.name} onChange={(event) => props.inputChangedHandler(event.target.value, "name")} />
            <span style={{color: "red"}}>{props.error.name.errorMessage}</span>
            <br/>
            <Label>EMAIL</Label>
            <Input invalid={!props.error.email.valid && props.error.email.touched}  type="email" name="email" placeholder="EMAIL" value={props.formInputs.email} onChange={(event) => props.inputChangedHandler(event.target.value, "email")} />
            <span style={{color: "red"}}>{props.error.email.errorMessage}</span>
            <br/>
            <Label>ADDRESS</Label>
            <Input invalid={!props.error.address.valid && props.error.address.touched}  type="text" name="address" placeholder="ADDRESS" value={props.formInputs.address} onChange={(event) => props.inputChangedHandler(event.target.value, "address")} />
            <span style={{color: "red"}}>{props.error.address.errorMessage}</span>
            <br/>
            <Label>MOBILE NO.</Label>
            <Input invalid={!props.error.phone.valid && props.error.phone.touched}  type="text" name="phone" placeholder="PHONE" value={props.formInputs.phone} onChange={(event) => props.inputChangedHandler(event.target.value, "phone")} />
            <span style={{color: "red"}}>{props.error.phone.errorMessage}</span>
            <br/>
            <Label>WEBSITE</Label>
            <Input invalid={!props.error.website.valid && props.error.website.touched}  type="text" name="website" placeholder="WEBSITE" value={props.formInputs.website} onChange={(event) => props.inputChangedHandler(event.target.value, "website")} />
            <span style={{color: "red"}}>{props.error.website.errorMessage}</span>
            <br/>
            <center>
                <Button color="primary" onClick={submitFormHandlerMethod} disabled={!props.formIsValid}>SUBMIT</Button>
            </center>
         
        </ModalBody>
            </Modal>
      
    )
}

const mapStateToProps = state => {
    return{
        showModal : state.user.showModal,
        formInputs: state.user.formInputs,
        formIsValid: state.user.formIsValid,
        error: state.user.error
    }
}

const mapDispatchToProps = dispatch => {
    return{
        toggleModal : () => dispatch({type: actions.TOGGLE_MODAL}),
        inputChangedHandler: (value, field) => dispatch({type: actions.INPUT_CHANGE_HANDLER, value: value, field: field}),
        submitFormHandler : (user) => dispatch({type: actions.ADD_USER, user: user}),
        editUser: (userId, user) => dispatch({type: actions.EDIT_USER, userId: userId, user: user}),
        setFormInputs: () => dispatch({type: actions.SET_FORM_INPUTS})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);