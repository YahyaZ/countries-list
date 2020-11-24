import React from 'react';

import './Spinner.css';

const Spinner = () => (
    <div className="c-page-spinner">
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
);

export {Spinner};
