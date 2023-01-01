import axios from 'axios';
import React, { useEffect } from 'react';
import AppBarHome from "../components/appBar";
import { baseUrl } from "../config";
import { useSelector, useDispatch } from "react-redux";
import {addAuthTokenAndRole} from "../redux/auth";

const AnonymousUser = (props) => {
    const accessToken= useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        axios.post(baseUrl.live2 + "/anonymousUser/login").then((res) => {
            dispatch(addAuthTokenAndRole(res.data.data));
        })
    }, []);

    return (
        <div className="">
            <AppBarHome></AppBarHome>
            <h1>{accessToken}</h1>
        </div>
    );
};

export default AnonymousUser;



