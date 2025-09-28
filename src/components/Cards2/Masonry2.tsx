// src/App.jsx
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./Card.module.scss";
import Card from "./Card";
import debounce from "lodash/debounce";
import { rafThrottle } from "../../tool";

let count = 0;

interface CardType {
  auhtor: string;
  title: string;
  id: string;
  width: number;
  height: number;
  left: number;
  top: number;
  like: number;
}

interface CardPostion {
  width: number;
  height: number;
  left: number;
  top: number;
  id: string;
}

interface InputCard {
  id: string;
  width: number;
  height: number;
}

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

const useContainer = (getData: {
  (page: number): Promise<CardType[]>;
  (arg0: number): any;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const columns = useRef(getColumnsByWidth(window.innerWidth));
  const gap = useRef(getGapByWidth(window.innerWidth));
  const leftRightPadding = useRef(
    getLeftRightPaddingByWidth(window.innerWidth)
  );
  const cardWidth = useRef(0);
  const columnHeights = useRef(Array(columns.current).fill(0));

  const [initCardPositions, setInitCardPositions] = useState<CardPostion[]>([]);
  const [cardPositions, setCardPositions] = useState<
    { id: string; width: number; height: number; left: number; top: number }[]
  >([]);
  const [cards, setCards] = useState<CardType[]>([]);

  const [containerWidth, setContainerWidth] = useState(window.innerWidth);

  const page = useRef(1); // 记录是获取那一页的数据
  const finish = useRef(false);

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
      newColumns !== columns.current ||
      newGap !== gap.current ||
      newPadding !== leftRightPadding.current ||
      newCardWidth !== cardWidth.current
    ) {
      columns.current = newColumns;
      gap.current = newGap;
      leftRightPadding.current = newPadding;
      cardWidth.current = newCardWidth;
      setContainerWidth(width);
    }
  }, 200);
  const handleScroll: React.UIEventHandler<HTMLDivElement> = rafThrottle(() => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const distanceToBottom = scrollHeight - clientHeight - scrollTop;
    if (distanceToBottom <= 50 && !finish.current) {
      const temp = async () => {
        let data = await getData(page.current++);
        if (data) {
          setCards((pre) => [
            ...pre,
            ...data.map((card) => ({
              ...card,
              like: Number(card.like),
            })),
          ]);
        } else {
          finish.current = true;
        }
      };
      temp();
    }
  });

  /* 计算card的位置 */

  const calculateInitCardPositions = (
    cards: InputCard[],
    cardWidth: number
  ): CardType[] => {
    let positions: CardType[] = [];
    /* 计算图片高度 */
    cards.forEach((card) => {
      //计算卡片高度
      const cardHeight = Math.floor((card.height * cardWidth) / card.width);
      // 更新卡片位置
      positions.push({
        id: card.id,
        width: cardWidth,
        height: cardHeight,
        left: 0,
        top: 0,
        auhtor: "",
        title: "",
        like: 0,
      });
    });
    /* 计算每个card的left和right  */
    return positions;
  };

  /* 根据已经渲染出来的dom，计算card的，从而移动card */

  const calculatePositions2 = (
    columnHeight: number[],
    containerRef: React.RefObject<HTMLDivElement | null>,
    leftRightPadding: number,
    cardWidth: number,
    gap: number,
    initCardPositions: CardPostion[]
  ): [CardPostion[], number[]] => {
    const positions: CardPostion[] = [];
    const children = containerRef.current!.children;
    Array.from(children).forEach((dom, index) => {
      // 找到当前高度最小的列
      const minHeight = Math.min(...columnHeight);
      const columnIndex = columnHeight.indexOf(minHeight);

      // 计算卡片放置的位置
      const left = columnIndex
        ? leftRightPadding + columnIndex * (cardWidth + gap)
        : leftRightPadding;
      const top = minHeight;

      //NOTE:真实dom的高度
      const cardHeight = (dom as HTMLElement).getBoundingClientRect().height;

      // 更新卡片位置
      positions.push({
        ...initCardPositions[index],
        top,
        left,
      });

      // 更新列高度
      columnHeight[columnIndex] += cardHeight + gap;
    });
    return [positions, columnHeight];
  };

  /* 监听Card父容器的宽度，设置card的列数、card之间的gap、cardWidth以及父容器左右的padding */
  useEffect(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.offsetWidth;
    const newColumns = getColumnsByWidth(width);
    const newGap = getGapByWidth(width);
    const newPadding = getLeftRightPaddingByWidth(width);
    const newCardWidth =
      (width - (newColumns - 1) * newGap - 2 * newPadding) / newColumns;

    columns.current = newColumns;
    gap.current = newGap;
    leftRightPadding.current = newPadding;
    cardWidth.current = newCardWidth;

    const temp = async () => {
      let data = await getData(page.current++);
      if (data) {
        /*      // 先把card的位置信息计算出来。此时所有的卡牌都在父容器左上角
        const cp = calculatePositions([...data], newCardWidth);
        setCardPositions([...cp]); */
        setCards([...data]);
      } else {
        finish.current = true;
      }
    };
    temp();

    const observer = new ResizeObserver(() => {
      handleResize();
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      observer.disconnect();
      page.current = 1;
    };
  }, []);

  // card列数、card宽带变化时，重新计算card的位置
  useEffect(() => {
    if (containerWidth <= 0) return;
    if (columns.current <= 0) return;
    if (cardWidth.current <= 0) return;
    const cp = calculateInitCardPositions(cards, cardWidth.current);
    setInitCardPositions([...cp]);
    setCardPositions([...cp]);
  }, [containerWidth, cards]);

  // 一个card一个card的移动到相应的位置
  useEffect(() => {
    if (!containerRef.current) return;
    if (containerWidth <= 0) return;
    const children = containerRef.current?.children;
    if (children.length > 0) {
      // 获取卡片位置
      const [cp, tempColumnHeight] = calculatePositions2(
        Array(columns.current).fill(0),
        containerRef,
        leftRightPadding.current,
        cardWidth.current,
        gap.current,
        initCardPositions
      );
      setCardPositions([...cp]);
      columnHeights.current = [...tempColumnHeight];
    }
  }, [initCardPositions]);

  return [cards, containerRef, cardPositions, handleScroll] as [
    typeof cards,
    React.RefObject<HTMLDivElement>,
    typeof cardPositions,
    typeof handleScroll
  ];
};

interface MasonryProps {
  getData: (page: number) => Promise<CardType[]>;
}

const Masonry = ({ getData }: MasonryProps) => {
  const [cards, containerRef, cardPositions, handleScroll] =
    useContainer(getData);
  // 人为地减慢了渲染
  let now = performance.now();
  while (performance.now() - now < 100) {
    // 不做任何事情...
  }
  return (
    <>
      <svg style={{ display: "none" }}>
        <symbol id="like" viewBox="0 0 16 16">
          <path
            fill="currentColor"
            fillOpacity=".8"
            d="M3.256 3.913a3.083 3.083 0 0 0-.003 4.397L8 12.998l4.743-4.684a3.085 3.085 0 0 0 .001-4.4c-.6-.593-1.4-.914-2.233-.914a3.17 3.17 0 0 0-1.91.635L8 4.087l-.601-.452A3.17 3.17 0 0 0 5.489 3c-.834 0-1.634.321-2.233.913m10.19 5.111-4.748 4.69a.996.996 0 0 1-1.397 0L2.549 9.02a4.083 4.083 0 0 1 .004-5.82A4.17 4.17 0 0 1 5.488 2c.907 0 1.787.29 2.512.835A4.17 4.17 0 0 1 10.51 2c1.093 0 2.146.422 2.936 1.202a4.085 4.085 0 0 1 0 5.822"
          ></path>
        </symbol>
      </svg>
      <div
        className={styles.masonry}
        ref={containerRef}
        onScroll={handleScroll}
      >
        {cards.map((card) => {
          let position: CardPostion;
          if (cardPositions.find((pos) => pos.id === card.id)) {
            position = cardPositions.find((pos) => pos.id === card.id)!;
            return (
              <Card
                key={card.id}
                title={card.title}
                author={card.auhtor}
                like={card.like}
                height={position.height}
                width={position.width}
                top={position.top}
                left={position.left}
                card={card}
              />
            );
          } else {
            return;
          }
        })}
      </div>
    </>
  );
};

export default Masonry;
