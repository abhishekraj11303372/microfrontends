import {mount} from 'auth/AuthApp'
import React, {useRef, useEffect} from 'react'
import { useHistory } from 'react-router-dom'

export default() => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        const {onParentNavigate} = mount(ref.current,{
            intialPath: history.location.pathname,
            onNavigate: ({pathName: nextPathName}) => {
                const {pathName} = history.location;
                
                if(pathName !== nextPathName) {
                    history.push(nextPathName);
                }
            },
        });

        history.listen(onParentNavigate);
    },[]);

    return <div ref={ref} />;
};