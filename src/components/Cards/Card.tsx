/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-05-01 20:20:08
 * @lastEditors: fengli
 * @lastEditTime:
 */
import styles from "./Card.module.scss";

interface CardProps {
  card: { backgroundColor: string };
  top: number;
  left: number;
  height: number;
  width: number;
}

const Card: React.FC<CardProps> = ({ card, top, left, height, width }) => {
  return (
    <div
      className={styles.cardBox}
      style={{
        top: `${top}px`,
        left: `${left}px`,
        height: `${height}px`,
        width: `${width}px`,
        backgroundColor: `${card.backgroundColor}`,
      }}
    ></div>
  );
};

export default Card;
