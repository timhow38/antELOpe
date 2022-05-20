import React from 'react';

const AppContext = React.createContext(
    {
        user: null,
        route: null
    }
);

export default AppContext;