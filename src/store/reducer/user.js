import * as actionTypes from '../action/user'
const initialState = {
    error : {
        name: {
            touched: false,
            valid: false,
            errorMessage: ""
        },
        email: {
            touched: false,
            valid: false,
            errorMessage: ""
        },
        address: {
            touched: false,
            valid: false,
            errorMessage: ""
        },
        phone: {
            touched: false,
            valid: false,
            errorMessage: ""
        },
        website: {
            touched: false,
            valid: true,
            errorMessage: ""
        },
    },
    formIsValid: false,
    formInputs: {
        id: '',
        name: '',
        email: '',
        address: '',
        phone: '',
        website: ''
    },
    showModal: false
};

const User = (state = initialState, action) => {
    if(action.type === actionTypes.TOGGLE_MODAL){
        const currentShowModal = state.showModal;
        return {
            ...state,
            showModal: !currentShowModal
            
        }
    }
    if(action.type === actionTypes.INPUT_CHANGE_HANDLER){
        const updatedFormInputs = {...state.formInputs};
        updatedFormInputs[action.field] = action.value;
        let updatedError = {
            ...state.error
        }
        let updatedErrorElement = {
            ...state.error[action.field]
        }
        updatedErrorElement.touched= true;
        switch(action.field){
            case("name"):
                if(action.value === ""){
                    updatedErrorElement.valid = false;
                    updatedErrorElement.errorMessage = "Name is Required"
                }
                else{  
                    updatedErrorElement.valid = true;
                    updatedErrorElement.errorMessage = ''
                }
                break;
            case("email"):
                let emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
                if(action.value === ""){
                    updatedErrorElement.valid = false;
                    updatedErrorElement.errorMessage = "Email is Required"
                }
                else if(!emailRegex.test(action.value)){
                    updatedErrorElement.valid = false;
                    updatedErrorElement.errorMessage= "Incorrect Email Format";
                }
                else{  
                    updatedErrorElement.valid = true;
                    updatedErrorElement.errorMessage = ''
                }
                break;
            case("address"):
                if(action.value === ""){
                    updatedErrorElement.valid = false;
                    updatedErrorElement.errorMessage = "Address is Required"
                }
                else{  
                    updatedErrorElement.valid = true;
                    updatedErrorElement.errorMessage = ''
                }
                break;
            case("phone"):
                let phoneRegex = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
                if(action.value === ""){
                    updatedErrorElement.valid = false;
                    updatedErrorElement.errorMessage = "Phone number is Required"
                }
                else if(!phoneRegex.test(action.value)){
                    updatedErrorElement.valid = false;
                    updatedErrorElement.errorMessage = "Incorrect Mobile No. Format"
                }
                else{  
                    updatedErrorElement.valid = true;
                    updatedErrorElement.errorMessage = ''
                }
                break;
            
            default:
                break;
    }    
        updatedError[action.field] = updatedErrorElement;
        let setFormIsValid = true;
        for(let key in updatedError){
            setFormIsValid = setFormIsValid && updatedError[key].valid;
        };
        return {
            ...state,
            formInputs: updatedFormInputs,
            error: updatedError,
            formIsValid: setFormIsValid
        };
    }
    if(action.type === actionTypes.SET_FORM_INPUTS){
        let editUser;
        let error;
        let formIsValid;
        if(!action.user){
            editUser= initialState.formInputs;
            error= initialState.error;
            formIsValid= initialState.formIsValid;
        }
        else{
            editUser = {
                ...action.user
            }
            formIsValid= true;
            error= {
                name: {
                    touched: false,
                    valid: true,
                    errorMessage: ""
                },
                email: {
                    touched: false,
                    valid: true,
                    errorMessage: ""
                },
                address: {
                    touched: false,
                    valid: true,
                    errorMessage: ""
                },
                phone: {
                    touched: false,
                    valid: true,
                    errorMessage: ""
                },
                website: {
                    touched: false,
                    valid: true,
                    errorMessage: ""
                }
            }
        }
        
        return {
            ...state,
            formInputs: {
                name: editUser.name,
                id: editUser.id,
                address: editUser.address,
                phone: editUser.phone,
                email: editUser.email,
                website: editUser.website
            },
            error: error,
            formIsValid: formIsValid
        }
    }
    return state;
}

export default User