import { useEffect, useState } from 'react';
import { getBooks } from '../../../api/bookApi';
import styles from './styles.module.scss';
import Carousel from 'react-bootstrap/Carousel';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { me } from '../../../api/userApi';
import BookList from './BookList';
import { MdArrowBack } from 'react-icons/md';
import NewBook from './NewBooks';

const Books = ({ isAdmin = false }) => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      me()
        .then(() => setStatus(true))
        .catch(() => navigate('/login'));
    }
    loadBooks();
  }, [isAdmin]);

  const loadBooks = () => {
    getBooks().then(data => setBooks(data));
  };

  if (isAdmin && !status) return <p>loading...</p>;

  return (
    <>
      {isAdmin ? (
        <div className="adm">
          <MdArrowBack
            className="back"
            onClick={() => navigate(-1)}
          />
          <div className="wrapper">
            <h1>New Book</h1>
            <NewBook onSuccess={() => loadBooks()} />
            <BookList books={books} onSuccess={() => loadBooks()} />
          </div>
        </div>
      ) : (
        <motion.section
          className={styles.books}
          id="books"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h1>Books</h1>
          <Carousel className={styles.carousel}>
            {books.map(book => (
              <Carousel.Item key={book.id}>
                <div className={styles.slideContent}>
                  <h1>{book.title}</h1>
                  <p className={styles.slideContent__desc}>{book.description}</p>
                  <div className={styles.slideContent__authors}>
                    {book.author.split(',').map((name, index) => (
                      <p key={index} className={styles.slideContent__author}>
                        {name.trim()}
                      </p>
                    ))}
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </motion.section>
      )}
    </>
  );
};

export default Books;
