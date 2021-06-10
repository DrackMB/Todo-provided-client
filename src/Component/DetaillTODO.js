import React from 'react';
import {useQuery} from "@apollo/client";
import {LOAD_TODOS} from "../GraphQL/Queries";
/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";

function DetaillTODO() {
    const {data} = useQuery(LOAD_TODOS);
    //------------------Style---------
    const table = css`
      border-collapse: collapse;
      border-spacing: 0;
      width: auto;
      border: 1px solid #ddd;
      margin: 15px;

    `;
    const thAndTd = css`
      text-align: left;
      padding: 16px;
      border: #cccccc 0.1px solid ;
    `;
    const tr = css`
      text-align: left;
      border: #cccccc 0.5px solid ;
      &:nth-child(even) {
        background-color: #f2f2f2;
      }
    `;
    //-------------------------------
    return (
        <div>
            <table css={table}>
                <thead>
                <tr css={thAndTd}>
                    <th css={thAndTd}>Titre</th>
                    <th css={thAndTd}>Type</th>
                    <th css={thAndTd}>isDone,</th>
                    <th css={thAndTd}>text</th>
                    <th css={thAndTd}>date de creation</th>
                </tr>
                </thead>
                <tbody>
                {data&&data&&data.getTodoList.map(value => {
                    return <tr css={tr}>
                        <td css={thAndTd}>{value.title}</td>
                        <td css={thAndTd}>{value.type}</td>
                        <td css={thAndTd}>{value.isDone.toString()}</td>
                        <td css={thAndTd}>{value.text}</td>
                        <td css={thAndTd}>{value.createdAt}</td>
                    </tr>
                })}
                </tbody>
            </table>

        </div>);


}

export default DetaillTODO;
