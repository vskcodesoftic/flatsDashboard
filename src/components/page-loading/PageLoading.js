import React from 'react';
import classes from './PageLoading.module.scss';

const PageLoading = () => {
    return (
        <div className={classes.loading}>
            <span>F</span>
            <span>L</span>
            <span>A</span>
            <span>T</span>
            <span>S</span>
        </div>
    );
};

export default PageLoading;
