import SearchIcon from '@material-ui/icons/Search';
import styles from './SearchInput.module.css'

const SearchInput = ({ ...rest }) => {
    return (
        <div className={styles.wrapper}>
            <SearchIcon color='inherit' />
            <input className={styles.input}  {...rest} />
        </div>

    )
}

export default SearchInput 
