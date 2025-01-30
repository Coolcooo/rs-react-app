import { Component } from 'react';
import Spin from '../Spin/Spin.tsx';

type SpinProps = object;
type SpinState = object;
class Loader extends Component<SpinProps, SpinState> {
  render = () => {
    return (
      <div>
        <Spin />
      </div>
    );
  };
}

export default Loader;
