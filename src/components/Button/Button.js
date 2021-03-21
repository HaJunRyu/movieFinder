import React from 'react';

export default function Button({ className, children, ...restProps }) {
  return (
    <button className={className} {...restProps}>
      {children}
    </button>
  );
}
