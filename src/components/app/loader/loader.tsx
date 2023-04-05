import {FC} from "react";

import classes from './loader.module.scss'

const Loader: FC = () => {
    return <div className={classes.loader}><div className={classes['lds-ring']}><div></div><div></div><div></div><div></div></div> Загружаются билеты...</div>;
}

export default Loader;