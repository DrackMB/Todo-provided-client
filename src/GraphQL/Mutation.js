import {gql} from "@apollo/client";

export const UPDATE_TODO_STATUS_BY_ID = gql`
    mutation
    updateTodoStatusById($id:ID!, $isDone:Boolean!){
        updateTodoStatusById(id:$id,isDone:$isDone){
            id,
        }
    }
`;
