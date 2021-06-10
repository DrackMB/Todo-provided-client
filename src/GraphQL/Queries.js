import {gql} from "@apollo/client";

export const LOAD_TODOS = gql`
    query{
        getTodoList
        {
            id,
            createdAt,
            isDone,
            type,
            text,
            title,
        }
    }
`;
export const LOAD_TODOS_WITH_ARG = gql`
    query
    getTodoList($filters:TodoFiltersInput!){
        getTodoList(filters:$filters){
            id,
            createdAt,
            isDone,
            type,
            text,
            title
        }

    }
`;

export const LOAD_TODOS_WITH_ORDER = gql`
    query
    getTodoList($orderBy:Ordering!){
        getTodoList(orderBy:$orderBy){
            id,
            createdAt,
            isDone,
            type,
            text,
            title
        }

    }
`;

