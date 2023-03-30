import logo from './logo.svg';
import classes from './logo.module.scss';

const Logo = () => {
  return (
    <span className={classes['logo-container']}>
      <img src={String(logo)} alt=""></img>
    </span>
  );
};

export default Logo;
