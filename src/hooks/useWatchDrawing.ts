import {DrawboardState} from './../contexts/DrawProvider';
import {useEffect, useState} from 'react';
import {useDrawContext} from '../contexts/DrawProvider';

export default function useWatchDrawing(cb: any) {
  const drawContext = useDrawContext();
  const [state, setState] = useState<any>(cb(drawContext.state));
  useEffect(() => {
    const unsubscribeDraw = drawContext.addListener(stateTmp => {
      // setSize(state.size);
      //   console.log(state);

      setState(cb(stateTmp));
    });
    return () => {
      unsubscribeDraw();
    };
  }, [drawContext]);
  return state;
}
