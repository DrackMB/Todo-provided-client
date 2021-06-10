import React, {useEffect, useState} from 'react';
import {useMutation, useLazyQuery, useQuery} from "@apollo/client";
import {UPDATE_TODO_STATUS_BY_ID} from "../GraphQL/Mutation";
import {LOAD_TODOS,LOAD_TODOS_WITH_ARG,LOAD_TODOS_WITH_ORDER} from "../GraphQL/Queries";
/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";

function AfficheTODO() {
    const [type, setType] = useState("");
    const [typeBusiness, setTypeBusiness] = useState();
    const [isDone, setIsDone] = useState();
    const [affectData,setAffectData]=useState({});
    // getAllTODO
    const {data: allTodo} = useQuery(LOAD_TODOS);
    //Upadate isDone
    const [changeIsDone, {error}] = useMutation(UPDATE_TODO_STATUS_BY_ID);
    // getTODOByDATE
    const [filterData, {data}] = useLazyQuery(LOAD_TODOS_WITH_ORDER);
/*
    const [filterDataIsDone, {data: datas}] = useLazyQuery(LOAD_TODOS_WITH_ARG);
    if (datas && datas.getTodoList) {
        console.log(datas.getTodoList);
    }
    const orderByIsDone = (val) => {
        filterDataIsDone({
            variables: {"filters": {"isDone": val}}
        });
        console.log(datas);
    }
*/
    const updatIsDone = (ID, isDone) => {
        changeIsDone({
            variables: {
                id: ID, isDone: isDone
            },
        });

        if (error) {
            console.log(error);
        }
    };
    const orderBydate = (val) => {
        filterData({
            variables: {"orderBy": val}
        });
        console.log(data);
    }
    //---------------Style-------------
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
      border: #cccccc 0.1px solid;
    `;
    const tr = css`
      text-align: left;
      border: #cccccc 0.5px solid;
      &:nth-of-type(even) {
        background-color: #f2f2f2;
      }
    `;
    const inputDate = css`
      text-decoration: none;
      list-style: none;
      display: inline-flex;
      margin: 3px;
      padding: 2px;
    `;
    //---------------------------------
    useEffect(()=>{
        if (data && data.getTodoList) {
           return setAffectData(data);
        }
        setAffectData(allTodo);
    });
    return (
        <div>
            <div css={css`margin: 15px;`}>
                <label htmlFor="Date"> Date:</label>
                <div css={inputDate}>
                    <div>croissante<input
                        type="radio"
                        placeholder="ID"
                        name="Date"
                        value="1"
                        onChange={(e) => {
                            if (e.target.value == 1){
                                orderBydate("DATE_ASC");
                            }
                        }}
                    /></div>
                    <div> decroissante<input
                        type="radio"
                        placeholder="ID"
                        name="Date"
                        value="0"
                        onChange={(e) => {
                            if (e.target.value == 0){
                                orderBydate("DATE_DESC")
                            }
                        }}
                    /></div>
                </div>
                <div> isDone: <br/><input
                    type="radio"
                    name="isDone"
                    value="2"
                    onChange={(e) => {
                        setIsDone(e.target.value);
                    }}
                /> true <br/>
                    <input
                        type="radio"
                        name="isDone"
                        value="1"
                        onChange={(e) => {
                            setIsDone(e.target.value);
                        }}
                    /> false
                </div>
                <div>Recherche Type: <input
                    type="text"
                    placeholder="Ecrire un type"
                    onChange={(e) => {
                        setType(e.target.value);
                    }}
                /></div>
                <div> uniquement les todo business<input
                    type="checkbox"
                    onClick={(e) => {
                        console.log(e.target.checked == true);
                        if (e.target.checked == true)
                            setTypeBusiness(1);
                        else setTypeBusiness(0);
                    }}
                /></div>
                <div><input type="button" value="Reinitialiser" onClick={()=>{
                    var inputs=document.getElementsByTagName('input');
                    for (var index = 0; index < inputs.length; ++index) {
                         inputs[index].checked=false;
                        setIsDone(0);
                        setTypeBusiness(5)
                    }
                }
                } /></div>
            </div>
            <div>
                <table css={table}>
                    <thead>
                    <tr css={thAndTd}>
                        <th css={thAndTd}>Titre</th>
                        <th css={thAndTd}>Type</th>
                        <th css={thAndTd}>isDone,</th>
                        <th css={thAndTd}>date de creation</th>
                    </tr>
                    </thead>
                    <tbody>
                    {affectData && affectData.getTodoList && affectData.getTodoList.filter((val) => {
                        if (isDone != null && isDone == 2) return (val.isDone == true && val.type.includes(type));
                        if (isDone != null && isDone == 1) return (val.isDone == false && val.type.includes(type));
                        if (typeBusiness == 1) return (val.type.includes("Marketing") || val.type.includes("Communication"));
                        return val.type.includes(type);
                    }).map(value => {
                        return <tr  css={tr}>
                            <td css={thAndTd}>{value.title}</td>
                            <td css={thAndTd}>{value.type}</td>
                            <td css={thAndTd}><select  onChange={(e) => {

                                if (e.target.value == "true"){
                                    updatIsDone(parseInt(value.id), true);
                                }

                                else updatIsDone(parseInt(value.id), false);
                            }
                            }>
                                <option value={value.isDone}>{value.isDone.toString()}</option>
                                <option value={!value.isDone}>{(!value.isDone).toString()}</option>
                            </select></td>
                            <td css={thAndTd}>{value.createdAt}</td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AfficheTODO;
