import React from 'react';
import { list } from './List.module.scss';

export default function List({ className, children }) {
  return <ul className={`${className} ${list}`}>{children}</ul>;
}

List.Item = function Item({ className, children }) {
  return <li className={className}>{children}</li>;
};
