import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';

export default function useTest() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const i = setInterval(() => {
      setCount(count => 3);
    }, 100);
  }, []);

  return count;
}
