import * as actionTypes from '../action/user'

const initialState = {
    users: []
};
const Users = (state = initialState, action) => {
    if(action.type === actionTypes.ADD_USER){
        if(action.user.id !== ""){
            const updatedUsers = [...state.users];
                const index = updatedUsers.findIndex(user => user.id === action.user.id);
                updatedUsers[index] = action.user;
                return {
                    ...state,
                    users: updatedUsers
                };
        }
        const id = Math.random().toString(36).substr(2, 9);
        const user = action.user;
        user.id = id;
        const updatedUsers = [...state.users, user]
        return {
            ...state,
            users: updatedUsers
        }
    }
    if(action.type === actionTypes.DELETE_USER){
        const updatedUsers = state.users.filter(user => user.id !== action.userId);
        return {
            ...state,
            users: updatedUsers
        }
    }
    return state;
}

export default Users