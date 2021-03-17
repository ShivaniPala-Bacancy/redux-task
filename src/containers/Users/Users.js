import React, {useEffect, useState} from 'react';
import styles from './Users.module.css'
import { Button, Table } from 'reactstrap';
import {connect} from 'react-redux'
import * as actions from '../../store/action/user'

const Users = props => {
    const [tableRows, setTableRows] = useState();
    const editUserHandler = (user) => {
        props.setFormInputs(user);
        props.showAddUser();
    }
    
    const deleteUserHandler = async (id) => {
        let result = window.confirm("Are you sure to delete??")
        if(result){
            props.deleteUser(id);
        }
        else{
            return;
        }
    }
    useEffect(() => {
        if(!props.users){
            return;
        }
        setTableRows(props.users.map((user, index) => {
            return(
                <tr key ={user.id}>
                    <td className={styles.Td}>{user.name}</td>
                    <td className={styles.Td}>{user.email}</td>
                    <td className={styles.Td}>{user.phone}</td>
                    <td className={styles.Td}>{user.address}</td>
                    <td className={styles.Td}>{user.website}</td>
                    <td className={styles.Td}>
                    <Button className="btn-icon btn-2" color="primary" type="button" onClick={() => deleteUserHandler(user.id)}>
                        DELETE
                    </Button>
                    </td>
                    <td className={styles.Td}>
                    <Button className="btn-icon btn-2" color="primary" onClick={() => editUserHandler(user)} type="button">
                        EDIT
                    </Button>
                    </td>
                </tr>
            )
        }
    )
        )
    }, [props.users]);

    return(
        
        <div className={styles.Table}>
            <center>
                <Button color="primary" onClick={props.showAddUser}>ADD User</Button>            
            </center>
            <table className={styles.TableUsers}>
                <thead className={styles.Thead}>
                    <tr className={styles.Tr}>
                        <td className={styles.Td}>Name</td>
                        <td className={styles.Td}>Email</td>
                        <td className={styles.Td}>Phone</td>
                        <td className={styles.Td}>Address</td>
                        <td className={styles.Td}>Website</td>
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        users: state.users.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showAddUser: () =>  dispatch({type: actions.TOGGLE_MODAL}),
        deleteUser: (userId) => dispatch({type: actions.DELETE_USER, userId: userId}),
        setFormInputs: (user) => dispatch({type: actions.SET_FORM_INPUTS, user: user})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);