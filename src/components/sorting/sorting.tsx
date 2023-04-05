import {FC, FormEvent} from "react";

import {useAppDispatch} from "../../hook";
import {handleSorting} from "../../store/aviaSlice";

import classes from './sorting.module.scss';

const Sorting: FC = () => {

    const dispatch = useAppDispatch();
    const onClickRb = (e: FormEvent<HTMLInputElement>) => dispatch(handleSorting(e.currentTarget.id));

  return (
    <div className={classes.sorting}>
      <label>
        <input type="radio" name="sorting" id="rb-cheap" onClick={onClickRb} defaultChecked={true} />
        <span>Самый дешевый</span>
      </label>
      <label>
        <input type="radio" name="sorting" id ="rb-fast" onClick={onClickRb} />
        <span>Самый быстрый</span>
      </label>
      <label>
        <input type="radio" name="sorting" id="rb-optimal" onClick={onClickRb} />
        <span>Оптимальный</span>
      </label>
    </div>
  );
};

export default Sorting;
