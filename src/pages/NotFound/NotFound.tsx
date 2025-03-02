import styles from './NotFound.module.css';
import { NavLink } from "react-router";
const NotFoundPage = () => {
    return (
        <div className={styles['not-found']}>
            <h1>Page not found</h1>
            <p>Sorry, page not existing</p>
            <NavLink className={styles['link']} to='/'>Go to back</NavLink>
        </div>
    );
}

export default NotFoundPage;