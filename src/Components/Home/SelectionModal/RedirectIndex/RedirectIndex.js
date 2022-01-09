import React, {forwardRef, useEffect} from 'react';
import {useHistory} from "react-router";

const RedirectIndex = forwardRef((props, ref) => {
    const history = useHistory();

    const redirectToHomePage = () => {
        history.push('/index');
    }

    return (
        <button style={{display: 'none'}} ref={ref} onClick={redirectToHomePage}>Click</button>
    );
})

export default RedirectIndex;