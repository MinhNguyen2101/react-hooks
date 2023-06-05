import React, { useState } from 'react';
import PropTypes from 'prop-types';

Pagination.propTypes = {
    pagination: PropTypes.object,
    onClickPage:  PropTypes.func,

};

Pagination.defaulProps = {
    pagination: [],
    onClickPage : null,
}


function Pagination(props) {
    const {pagination,onClickPage} = props;
    const {page,lastPage} = pagination;


    function hancdleClickChangePage(newPage)
    {
            onClickPage(newPage);
    }

    return (
        <div>
            <button
            disabled = { page<=1 }
             onClick={()=>hancdleClickChangePage(page -1)}>
                Pre
            </button>

            <button
                disabled={ page >= lastPage}
                onClick = {() => hancdleClickChangePage(page +1)}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;