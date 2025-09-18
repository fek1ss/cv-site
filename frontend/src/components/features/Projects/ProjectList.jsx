import { useState } from 'react';
import styles from './projectlist.module.scss';
import { normalizeDate } from '../../../utils/normalizeDate';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';
import ProjectCard from './ProjectCard';

const ProjectList = ({ onSuccess, projects, isAdmin }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // фильтрация по запросу
  const filteredProjects = projects.filter(
    prj =>
      prj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prj.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  // количество проектов на одной странице
  const itemsPerPage = 5;

  // индексы начала и конца
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // количество проектов на текущей странице
  const currentProjects = filteredProjects.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  // количество страниц всего 1,2,3,4 Если проектов 20 и itemsPerPage = 5, то totalPages = 4
  const totalPages = Math.ceil(
    filteredProjects.length / itemsPerPage,
  );

  // массив номеров страниц
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, i) => i + 1,
  );

  return (
    <section className={styles.project}>
      <div className={styles.project__search}>
        {/* Поисковик */}
        <input
          className={styles.project__inp}
          type="text"
          placeholder="find a project..."
          value={searchQuery}
          onChange={e => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
        <FaSearch />
      </div>

      <div className={styles.project__list}>
        {isAdmin ? (
          <div>
            {currentProjects.length > 0 ? (
              currentProjects.map(prj => (
                <ProjectCard
                  key={prj.id}
                  prj={prj}
                  name={prj.name}
                  description={prj.description}
                  dateStart={prj.dateStart}
                  dateEnd={prj.dateEnd}
                  link={prj.link}
                  img={prj.imageUrl}
                  onSuccess={()=> onSuccess()}
                />
              ))
            ) : (
              <p>Not found...</p>
            )}
          </div>
        ) : (
          <div>
            {currentProjects.length > 0 ? (
              currentProjects.map(prj => (
                <div className={styles.project__item} key={prj.id}>
                  <h1 className={styles.project__name}>{prj.name}</h1>
                  <p className={styles.project__desc}>
                    {prj.description}
                  </p>
                  <p className={styles.project__date}>
                    Date: {normalizeDate(prj.dateStart)} -{' '}
                    {normalizeDate(prj.dateEnd)}
                  </p>
                  <a className={styles.project__link}>{prj.link}</a>
                </div>
              ))
            ) : (
              <p>Not found...</p>
            )}
          </div>
        )}
      </div>
      <div className={styles.project__pagination}>
        <IoIosArrowBack
          className={styles.project__arrow}
          onClick={() =>
            setCurrentPage(prev => Math.max(prev - 1, 1))
          }
        />
        {pageNumbers.map(num => (
          <div
            key={num}
            className={`${styles.project__number} ${currentPage === num ? styles.project__active : ''}`}
            onClick={() => setCurrentPage(num)}
          >
            {num}
          </div>
        ))}

        <IoIosArrowForward
          className={styles.project__arrow}
          onClick={() =>
            setCurrentPage(prev => Math.min(prev + 1, totalPages))
          }
        />
      </div>
    </section>
  );
};

export default ProjectList;
