/* eslint-disable react/require-default-props */
import '../styles.css';
import PropTypes from 'prop-types';

export function MenuButton({
  name,
  icon,
  index,
  hasSubItems,
  subMenuHeight,
  onClick,
}) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button onClick={() => (onClick ? onClick(index, subMenuHeight) : null)}>
      <span className="material-symbols-outlined">{icon || name}</span>
      {name}
      {hasSubItems && (
        <span className="chevron material-symbols-outlined">chevron_right</span>
      )}
    </button>
  );
}

MenuButton.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
  index: PropTypes.number,
  hasSubItems: PropTypes.bool,
  subMenuHeight: PropTypes.number,
  onClick: PropTypes.func,
};
