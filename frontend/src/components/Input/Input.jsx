import styles from './styles.module.scss';

const Input = ({ label, value, onChange, type, color }) => {
  return (
    <label className={styles.label}>
      <p className={styles.label__name} style={{ color }}>
        {label}
      </p>
      {type === 'text' && (
        <input
          style={{ color:color, borderBottom:`1px solid ${color}` }}
          className={styles.inputText}
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      )}
      {
        type === 'date' && (
          <input
            className={styles.inputFile}
            type="file"
            onChange={e => onChange(e.target.files[0])}
          />
        )
      }
      {
        type === 'number' && (
          <input
            className={styles.inputNumber}
            type="number"
            onChange={e => onChange(e.target.files[0])}
          />
        )
      }
    </label>
  );
};

export default Input;
