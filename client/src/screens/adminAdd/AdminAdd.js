import React, {Fragment} from 'react';
import AddQuestion from '../../components/AddQuestion';
import AppBar from '../../components/AppBar';

export default () => {
    return (
        <Fragment>
            <AppBar currentActive={2}/>
            <AddQuestion question={{ question: {} }} mode="add" />
        </Fragment>
    );
}