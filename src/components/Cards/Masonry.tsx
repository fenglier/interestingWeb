// src/App.jsx
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./Card.module.scss";
import Card from "./Card";
import data1 from "./data1.json";
import data2 from "./data2.json";
import debounce from "lodash/debounce";
import { rafThrottle } from "../../tool";

/* 只是使用data1和data2中的尺寸信息，图片用背景颜色替换 */

const getColumnsByWidth = (width: number) => {
  if (width >= 1200) return 5;
  if (width >= 992) return 4;
  if (width >= 768) return 3;
  return 2;
};

const getGapByWidth = (width: number) => {
  if (width >= 1200) return 10;
  if (width >= 992) return 10;
  if (width >= 768) return 10;
  return 10;
};
const getLeftRightPaddingByWidth = (width: number) => {
  if (width >= 1200) return 24;
  if (width >= 992) return 24;
  if (width >= 768) return 24;
  return 24;
};

const Masonry = () => {
  const [columns, setColumns] = useState(getColumnsByWidth(window.innerWidth));
  const [gap, setGap] = useState(getGapByWidth(window.innerWidth));
  const [leftRightPadding, setLeftRightPadding] = useState(
    getLeftRightPaddingByWidth(window.innerWidth)
  );
  const [cardWidth, setCardWidth] = useState(0);
  const [, setColumnHeights] = useState(Array(columns).fill(0));
  const [cardPositions, setCardPositions] = useState<CardPosition[]>([]);
  const [cards, setCards] = useState<
    {
      id: string;
      url: string;
      backgroundColor: string;
      width: number;
      height: number;
    }[]
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const page = useRef(1); // 记录是获取那一页的数据
  const [finish, setFinish] = useState(false);

  const handleResize = debounce(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.offsetWidth;
    const newColumns = getColumnsByWidth(width);
    const newGap = getGapByWidth(width);
    const newPadding = getLeftRightPaddingByWidth(width);
    const newCardWidth =
      (width - (newColumns - 1) * newGap - 2 * newPadding) / newColumns;

    // 判断是否有真正变化才 setState
    if (
      newColumns !== columns ||
      newGap !== gap ||
      newPadding !== leftRightPadding ||
      newCardWidth !== cardWidth
    ) {
      setColumns(newColumns);
      setGap(newGap);
      setLeftRightPadding(newPadding);
      setCardWidth(newCardWidth);
    }
  }, 200);

  const getData = async (source: number) => {
    if (source > 2) {
      return;
    }
    /* 模拟页面加载是获取数据 */
    const colorArr = ["#cdb4db", "#ffc8dd", "#ffafcc", "#bde0fe", "#a2d2ff"];
    let data = await Promise.resolve(source == 1 ? data1 : data2);
    let temp_data1 = data.data.items.map((i, index) => ({
      id: i.id,
      url: i.note_card.cover.url_pre,
      backgroundColor: colorArr[index % colorArr.length],
      width: i.note_card.cover.width,
      height: i.note_card.cover.height,
    }));
    return temp_data1;
  };

  /* 监听Card父容器的宽度，设置card的列数、card之间的gap、cardWidth以及父容器左右的padding */
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      handleResize();
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleScroll = rafThrottle(() => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const distanceToBottom = scrollHeight - clientHeight - scrollTop;
    if (distanceToBottom <= 50 && !finish) {
      const temp = async () => {
        let data = await getData(page.current++);
        if (data) {
          setCards((pre) => [...pre, ...data]);
        } else {
          setFinish(true);
        }
      };
      temp();
    }
  });

  /* 计算card的文章 */
  interface CardPosition {
    id: string;
    top: number;
    left: number;
    width: number;
    height: number;
  }

  const calculatePositions = (
    cards: {
      id: string;
      url: string;
      backgroundColor: string;
      width: number;
      height: number;
    }[],
    tempColumnHeight: number[]
  ): [CardPosition[], number[]] => {
    const positions: CardPosition[] = [];
    cards.forEach((card) => {
      // 找到当前高度最小的列
      const minHeight = Math.min(...tempColumnHeight);
      const columnIndex = tempColumnHeight.indexOf(minHeight);

      // 计算卡片放置的位置
      const left = columnIndex
        ? leftRightPadding + columnIndex * (cardWidth + gap)
        : leftRightPadding;
      const top = minHeight;

      //计算卡片高度
      const cardHeight = Math.floor((card.height * cardWidth) / card.width);

      // 更新卡片位置
      positions.push({
        id: card.id,
        top,
        left,
        width: cardWidth,
        height: cardHeight,
      });

      // 更新列高度
      tempColumnHeight[columnIndex] += cardHeight + gap;
    });
    return [positions, tempColumnHeight];
  };
  useEffect(() => {
    const temp = async () => {
      let data = await getData(page.current++);
      if (data) {
        setCards([...data]);
      } else {
        setFinish(true);
      }
    };
    temp();
    return () => {
      page.current = 1;
    };
  }, []);
  // Masonry 算法：动态调整卡片位置
  useLayoutEffect(() => {
    // 获取卡片位置
    const [cardPositions, tempColumnHeight] = calculatePositions(
      cards,
      Array(columns).fill(0)
    );
    setCardPositions([...cardPositions]);
    setColumnHeights([...tempColumnHeight]);
  }, [columns, cards, cardWidth]);
  return (
    <div className={styles.masonry} ref={containerRef} onScroll={handleScroll}>
      {cards.map((card) => {
        const position = cardPositions.find((pos) => pos.id === card.id);
        return position ? (
          <Card
            key={card.id}
            card={card}
            height={position.height}
            width={position.width}
            top={position.top}
            left={position.left}
          />
        ) : null;
      })}
    </div>
  );
};

export default Masonry;
