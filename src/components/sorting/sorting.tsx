import classes from './sorting.module.scss';

const Sorting = () => {
  return (
    <div className={classes.sorting}>
      <label>
        <input type="radio" name="sorting" />
        <span>Самый дешевый</span>
      </label>
      <label>
        <input type="radio" name="sorting" />
        <span>Самый быстрый</span>
      </label>
      <label>
        <input type="radio" name="sorting" />
        <span>Оптимальный</span>
      </label>
    </div>
  );
};

export default Sorting;
