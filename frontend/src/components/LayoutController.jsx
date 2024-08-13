import React from 'react';
import {Header, Sidebar} from './index.js';

function LayoutController({authStatus, children, sidebar=true}) {
    return (
        <div>
            {authStatus && <Header />}
            {sidebar && authStatus ? (
                <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
                    <Sidebar />
                    {children}
                </div>
            ): (
          <>{children}</>
        )}
            
        </div>
        
    )
}

export default LayoutController;
