import styles from "../styles/Category.module.css";

interface Category {
  category: string;
  cost: number;
  enabled: boolean;
  disabled: boolean;
  onClick: () => void;
}

export const NewCategory = ({
  category,
  cost,
  enabled,
  disabled,
  onClick,
}: Category) => {
  return (
    <div
      className={`${styles.category} ${enabled && styles.categoryEnabled} ${
        disabled && styles.disabled
      }`}
      onClick={onClick}
    >
      {category} - {cost}
    </div>
  );
};
