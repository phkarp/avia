import classes from './filter.module.scss';

const Filter = (props: { a: number }) => {
  console.log(props);

  return (
    <div className={classes.filter}>
      <p className={classes.text}>Количество пересадок</p>
      <label className={classes.label}>
        <input type="checkbox" name="filter" className={classes.checkbox} />
        <span>Все</span>
      </label>
      <label className={classes.label}>
        <input type="checkbox" name="filter" className={classes.checkbox} />
        <span>Без пересадок</span>
      </label>
      <label className={classes.label}>
        <input type="checkbox" name="filter" className={classes.checkbox} />
        <span>1 пересадка</span>
      </label>
      <label className={classes.label}>
        <input type="checkbox" name="filter" className={classes.checkbox} />
        <span>2 пересадки</span>
      </label>
      <label className={classes.label}>
        <input type="checkbox" name="filter" className={classes.checkbox} />
        <span>3 пересадки</span>
      </label>
    </div>
  );
};

export default Filter;
