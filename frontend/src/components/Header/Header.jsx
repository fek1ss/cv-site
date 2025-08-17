import styles from './styles.module.scss';

const Header = () => {
  return (
    <header>
      <h1 className={styles.header__logo}>Portfolio</h1>
      <nav>
        <ul className={styles.header__list}>
          <li className={styles.header__list_item}>About me</li>
          <li className={styles.header__list_item}>Skills & Experience</li>
          <li className={styles.header__list_item}>Articles</li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;