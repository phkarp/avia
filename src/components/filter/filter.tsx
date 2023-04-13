import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../hook';
import { handleFilter } from '../../store/aviaSlice';

import classes from './filter.module.scss';

export const Filter: FC = () => {
  const filters = useAppSelector(state => state.tickets.filters);
  const dispatch = useAppDispatch();
  const arrFilters = ['Все', 'Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'];
  const newArrFilters = arrFilters.map((filter, i) => {
    return (
      <label className={classes.label} key={i}>
        <input
          type="checkbox"
          name="filter"
          className={classes.checkbox}
          onChange={() => dispatch(handleFilter(filter))}
          checked={filters.includes(filter)}
        />
        <span>{filter}</span>
      </label>
    );
  });
  return (
    <div className={classes.filter}>
      <p className={classes.text}>Количество пересадок</p>
      {newArrFilters}
    </div>
  );
};
