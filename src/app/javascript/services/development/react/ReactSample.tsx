import React from 'react';

type Props = {
  name: string;
};

export default function ReactSample({ name }: Props) {
  return <h2>Hello React, {name}</h2>;
}
