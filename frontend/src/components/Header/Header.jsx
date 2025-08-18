import styles from './styles.module.scss';

const Header = () => {
  return (
    <header>
      <div className="decor"></div>
      <div className={styles.wrapper}>
        <h1 className={styles.header__logo}>Portfolio</h1>
        <nav>
          <ul className={styles.header__list}>
            <li><a className={styles.header__list_item} href="#about">About me</a></li>
            <li><a className={styles.header__list_item} href="#skills">Skills & Experience</a></li>
            <li><a className={styles.header__list_item} href="#articles">Articles</a></li>
            <li><a className={styles.header__list_item} href="#contacts">Contacts</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header;