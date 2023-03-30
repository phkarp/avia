import classes from './sorting.module.scss';

const Sorting = () => {
  return (
    <div className={classes.sorting}>
      <label>
        <input type="radio" name="sorting" />
        <span>САМЫЙ ДЕШЕВЫЙ</span>
      </label>
      <label>
        <input type="radio" name="sorting" />
        <span>САМЫЙ БЫСТРЫЙ</span>
      </label>
      <label>
        <input type="radio" name="sorting" />
        <span>ОПТИМАЛЬНЫЙ</span>
      </label>
    </div>
  );
};

export default Sorting;
