import React from 'react';

export default function Heading({ level, children, ...restProps }) {
  return React.createElement(`h${level}`, restProps, children);
}
