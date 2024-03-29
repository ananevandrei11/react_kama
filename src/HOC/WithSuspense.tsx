import React from 'react';

export function withSuspense<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  return (props: WCP) => {
    return (
      <React.Suspense fallback={<div>Loading ... </div>}>
        {/* @ts-ignore */}
        <WrappedComponent {...props} />
      </React.Suspense>
    );
  };
}
