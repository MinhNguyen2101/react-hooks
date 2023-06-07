import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Pagination.propTypes = {
//     pagination: PropTypes.object,
//     onClickPage:  PropTypes.func,

// };

// Pagination.defaulProps = {
//     pagination: [],
//     onClickPage : null,
// }


function Pagination(props) {
    const { lastPage, currentPage, onClickPage } = props;


    function hancdleClickChangePage(newPage) {
        onClickPage(newPage);
    }

    return (
        <div>
            <button
                disabled={currentPage <= 1}
                onClick={() => hancdleClickChangePage(currentPage - 1)}>
                Pre
            </button>

            <button
                disabled={currentPage >= lastPage}
                onClick={() => hancdleClickChangePage(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;