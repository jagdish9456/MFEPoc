import React, { Suspense } from 'react';

// Lazily import the components from the remote module
const ProductList = React.lazy(() => import('reactMfeModule/ProductList'));
const UserProfile = React.lazy(() => import('reactMfeModule/UserProfile'));
const ReactMFE = React.lazy(() => import('reactMfeModule/ReactMFE'));

export function ReactMFEPage() {
  return (
    <div>
      <h1>Host Application</h1>
      <p>This application consumes components from a remote module federation setup.</p>
      
      <hr />

      {/* Use Suspense to provide a fallback while the remote component is loading */}
      <Suspense fallback={<div>Loading User Profile...</div>}>
        <UserProfile />
      </Suspense>
      
     
    </div>
  );
};
