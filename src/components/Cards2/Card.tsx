/*
 * @Author: fengli
 * @Description:
 * @Date: 2025-05-01 20:20:08
 * @lastEditors: fengli
 * @lastEditTime:
 */
import styles from "./Card.module.scss";

interface CardProps {
  card: any;
  top: number;
  left: number;
  height: number;
  width: number;
  title: string;
  author: string;
  like: number;
}

const Card: React.FC<CardProps> = ({
  card,
  top,
  left,
  height,
  width,
  title,
  author,
  like,
}) => {
  return (
    <div
      className={styles.card}
      style={{
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
      }}
    >
      <div
        style={{
          height: `${height}px`,
          width: `${width}px`,
          backgroundColor: `${card.backgroundColor}`,
        }}
      ></div>
      <div className={styles.cardFooter}>
        <div className={styles.title}>{title}</div>
        <div className={styles.author}>
          <div className={styles.authorInfo}>
            {/* 如果是真实数据，把这个更改为图片 */}
            <div
              className={styles.avatar}
              style={{ backgroundColor: `${card.backgroundColor}` }}
            />
            {/* <img src={avatar} alt="" /> */}
            <span className={styles.name}>{author}</span>
          </div>
          {
            <svg width="16" height="16">
              <use href="#like"></use>
            </svg>
          }
          <div className="like">{like}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
