import BookCard from './BookCard';
import styles from './bookList.module.scss';
import Carousel from 'react-bootstrap/Carousel';

const BookList = ({ books, onSuccess }) => {
  return (
    <section className={styles.books} id="books">
      <h1>Books</h1>
      <Carousel className={styles.carousel}>
        {books.map(book => (
          <Carousel.Item key={book.id}>
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              description={book.description}
              link={book.link}
              authors={book.author}
              onSuccess={onSuccess}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default BookList;
