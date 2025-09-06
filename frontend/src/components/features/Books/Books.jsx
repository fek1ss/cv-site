import { useEffect, useState } from 'react';
import { getBooks } from '../../../api/bookApi';
import styles from './styles.module.scss';
import Carousel from 'react-bootstrap/Carousel';
import { motion } from 'framer-motion';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then(data => setBooks(data));
  }, []);

  return (
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
              <p>{book.description}</p>
              <p>
                {book.author.split(',').map((name, index) => (
                  <p key={index} className={styles.authors}>
                    {name.trim()}
                  </p>
                ))}
              </p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </motion.section>
  );
};

export default Books;
