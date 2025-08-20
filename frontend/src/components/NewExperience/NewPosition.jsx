import styles from './styles.module.scss';

const NewPosition = () => {
  return (
    <div className={styles.newExp}>
      <h1>Specify the position in this company</h1>
      <form className={styles.newExp__container}>
        <label>
          Position 
        <input type="text" className={styles.newExp__name} />
      </label>
      </form>
    </div>
  )
}

export default NewPosition;