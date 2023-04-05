// import {FC} from "react";
//
// import {useAppSelector} from "../../hook";
//
// const withEmptyList: FC = (Component) => {
//     const tickets = useAppSelector(state => state.tickets.tickets);
//     const component = tickets.length && <Component /> || <h1>Нет таких билетов</h1>
//     return <div>{component}</div>;
// };
//
// export default withEmptyList;