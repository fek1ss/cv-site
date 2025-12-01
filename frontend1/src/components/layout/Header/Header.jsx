import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { motion } from 'framer-motion';
import { Sling as Hamburger } from 'hamburger-react';
import { useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="decor"></div>
      <div className={styles.wrapper}>
        <h1
          className={styles.header__logo}
          onClick={() => navigate('/admin')}
        >
          Portfolio
        </h1>
        <div className={styles.hamburgerWrapper}>
          <Hamburger toggled={isOpen} toggle={setOpen} color="#fff" />
        </div>
        <nav className={`${styles.header__nav} ${isOpen ? styles.header__open : styles.header__close}`}>
          <ul className={styles.header__list}>
            <li>
              <a className={styles.header__list_item} href="#about">
                About me
              </a>
            </li>
            <li>
              <a
                className={styles.header__list_item}
                href="#education"
              >
                Education
              </a>
            </li>
            <li>
              <a className={styles.header__list_item} href="#skills">
                Skills & Experience
              </a>
            </li>
            <li>
              <a
                className={styles.header__list_item}
                href="#projects"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                className={styles.header__list_item}
                href="#articles"
              >
                Articles
              </a>
            </li>
            <li>
              <a className={styles.header__list_item} href="#books">
                Books
              </a>
            </li>
            <li>
              <a
                className={styles.header__list_item}
                href="#contacts"
              >
                Contacts
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
