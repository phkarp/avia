import { FC, FormEvent } from 'react';

import { useAppDispatch } from '../../hooks/hook';
import { handleSorting } from '../../store/aviaSlice';

import classes from './sorting.module.scss';

export const Sorting: FC = () => {
  const dispatch = useAppDispatch();
  const onClickRb = (e: FormEvent<HTMLInputElement>) => dispatch(handleSorting(e.currentTarget.id));

  type Sorting = {
    'rb-cheap': string;
    'rb-fast': string;
    'rb-optimal': string;
  };

  const objSorting: Sorting = {
    'rb-cheap': 'Самый дешевый',
    'rb-fast': 'Самый быстрый',
    'rb-optimal': 'Оптимальный',
  };

  const newArrSorting = Object.keys(objSorting).map((sorter: string, i) => {
    return (
      <label key={i}>
        <input type="radio" name="sorting" id={sorter} onClick={onClickRb} defaultChecked={!i && true} />
        <span>{objSorting[sorter as keyof Sorting]}</span>
      </label>
    );
  });

  return <div className={classes.sorting}>{newArrSorting}</div>;
};
