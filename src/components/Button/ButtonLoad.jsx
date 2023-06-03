import PropTypes from 'prop-types';

import { Loader } from 'components/Loader/Loader';
import { ButtonLoad } from './ButtonLoad.styled';

export const Button = ({ clickLoadMore, toggleLoader }) => {
  return (
    <ButtonLoad type="button" disabled={toggleLoader} onClick={clickLoadMore}>
      Load more
      {toggleLoader && (
        <Loader widthLoader={'25'} heightLoader={'25'} colorLoader={'#fff'} />
      )}
    </ButtonLoad>
  );
};

Button.propTypes = {
  clickLoadMore: PropTypes.func.isRequired,
  toggleLoader: PropTypes.bool.isRequired,
};
