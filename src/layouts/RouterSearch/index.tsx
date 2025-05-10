/*
 * @Author: fengli
 * @Description: 需要安装npm install fuse.js
 * @Date: 2025-05-10 10:52:45
 * @lastEditors: fengli
 * @lastEditTime:
 */
import { useEffect, useState } from "react";
import style from "./index.module.scss";
import Fuse from "fuse.js";
import { Link } from "react-router-dom";
import router from "../../router.config.tsx";
import { debounce } from "lodash";

const deepFlatten = (arr: any[]) => {
  return arr.reduce((acc: any[], val) => {
    if (Array.isArray(val.children)) {
      acc.push(...deepFlatten(val.children));
    } else {
      acc.push(val);
    }
    return acc;
  }, []);
};
const searchIndex = deepFlatten(router);
// Fuse.js 配置
const fuse = new Fuse(searchIndex, {
  keys: ["name"],
  includeScore: true,
  threshold: 0.3,
});
const RouterSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(searchIndex);
  const [showResults, setShowResults] = useState(false);

  // 输入变化时更新结果
  useEffect(() => {
    if (searchTerm.trim()) {
      const fuseResult = fuse.search(searchTerm).map((r) => r.item);
      setResults(fuseResult);
      setShowResults(true);
    } else {
      setResults([]);
    }
  }, [searchTerm]);
  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  }, 500);
  return (
    <>
      <div className={style.searchWrapper}>
        <svg
          className={style.searchIcon}
          width="1em"
          height="1em"
          viewBox="0 0 20 20"
        >
          <path
            d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            fill-rule="evenodd"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
        <input
          placeholder="搜索"
          className={style.search}
          onChange={handleChange}
        />
      </div>
      {results.length && showResults ? (
        <ul className={style.resultsList}>
          {results.map((item) => (
            <li key={item.path}>
              <Link to={item.path} onClick={() => setShowResults(false)}>
                <strong>{item.name}</strong>
                <p>{item.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default RouterSearch;
