import Carousel from 'react-bootstrap/Carousel';
import styles from './projectcarousel.module.scss';
import { useEffect, useState } from 'react';
import { getProject } from '../../../api/projectApi';
import { normalizeDate } from '../../../utils/normalizeDate';

const ProjectCarousel = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProject().then(data => {
      setProjects(data);
    });
  });

  return (
    <Carousel className={styles.carousel}>
      {projects.map(prj => (
        <Carousel.Item key={prj.id}>
          <div className={styles.slideContent}>
            <h1>{prj.name}</h1>
            <p>{prj.description}</p>
            <div className={styles.slideContent__date}>
              Date: {normalizeDate(prj.dateStart)} –{' '}
              {normalizeDate(prj.dateEnd)}
            </div>
            <div className={styles.slideContent__darkImage}>
              <a href={prj.link}>Link</a>
              <img src={prj.imageUrl} alt="Project preview" />
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProjectCarousel;
