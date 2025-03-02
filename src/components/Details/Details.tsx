import Button from "../Button/Button";
import styles from './Details.module.css';

const Details = ({films}) => {
    return (
        <div className={styles['details']}>
            <div>
                <Button>X</Button>
            </div>
            <ol>
                {films.map((e) => <li>{e}</li>)}
            </ol>
        </div>

    );
}

export default Details;