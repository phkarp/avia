import {FC} from "react";

import {useAppDispatch, useAppSelector} from "../../hook";
import {handleFilter} from "../../store/aviaSlice";

import classes from './filter.module.scss';


const Filter: FC = () => {

    const filters = useAppSelector(state => state.tickets.filters);
    const dispatch = useAppDispatch();
  return (
    <div className={classes.filter}>
      <p className={classes.text}>Количество пересадок</p>
      <label className={classes.label}>
        <input type="checkbox" name="filter" className={classes.checkbox} onChange={() => dispatch(handleFilter('Все'))} checked={filters.includes('Все')}/>
        <span>Все</span>
      </label>
      <label className={classes.label}>
        <input type="checkbox" name="filter" className={classes.checkbox} onChange={() => dispatch(handleFilter('Без пересадок'))} checked={filters.includes('Без пересадок')}/>
        <span>Без пересадок</span>
      </label>
      <label className={classes.label}>
        <input type="checkbox" name="filter" className={classes.checkbox} onChange={() => dispatch(handleFilter('1 пересадка'))} checked={filters.includes('1 пересадка')}/>
        <span>1 пересадка</span>
      </label>
      <label className={classes.label}>
        <input type="checkbox" name="filter" className={classes.checkbox} onChange={() => dispatch(handleFilter('2 пересадки'))} checked={filters.includes('2 пересадки')}/>
        <span>2 пересадки</span>
      </label>
      <label className={classes.label}>
        <input type="checkbox" name="filter" className={classes.checkbox} onChange={() => dispatch(handleFilter('3 пересадки'))} checked={filters.includes('3 пересадки')}/>
        <span>3 пересадки</span>
      </label>
    </div>
  );
};

export default Filter;
