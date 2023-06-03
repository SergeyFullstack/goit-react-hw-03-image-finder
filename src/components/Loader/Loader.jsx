import { ThreeCircles } from 'react-loader-spinner';
import PropTypes from 'prop-types';

export const Loader = ({
  heightLoader,
  widthLoader,
  colorLoader = '#2b37a7',
}) => {
  return (
    <ThreeCircles
      height={heightLoader}
      width={widthLoader}
      color={colorLoader}
      wrapperStyle={{}}
      wrapperClass="three-wrapper"
      visible={true}
      ariaLabel="three-circles-rotating"
    />
  );
};

Loader.propTypes = {
  heightLoader: PropTypes.string.isRequired,
  widthLoader: PropTypes.string.isRequired,
  colorLoader: PropTypes.string,
};
