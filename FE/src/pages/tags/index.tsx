import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import tagApi from "../../api/tagApi";
import { ITag } from "../../interfaces/tag.interfaces";
import styles from "./tags.module.css";
import Pagination from "../../components/pagination";

function Tags() {
  const [data, setData] = useState<ITag[]>([]);
  const [dataCurrent, setDataCurrent] = useState<ITag[]>([]);
  const [keyword, setKeyword] = useState<string>('');

  useEffect(() => {
    tagApi.getApiTag()
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    setKeyword(e.target.value)
    console.log(e.target.value)
    const dataFilter = data.filter(tag =>tag.name.includes(value))
    console.log(26, dataFilter);
  }

  const renderCardTag = dataCurrent.map((tag, index) => (
    <div className={`${styles.w24} card shadow-sm`} key={index}>
      <div className="card-body">
        <Link to={`/questions/tag/${tag.name}`}>
          <h5 className="card-title fs-6 ">{tag.name}</h5>
        </Link>
        <p className="card-text fs-6">{tag.number} questions</p>
      </div>
    </div>
  ));
  const debounce = (fn: Function, delay: number) => {
    let timeout = -1;
  
    return (...args: any) => {
      if (timeout !== -1) {
        clearTimeout(timeout);
      }
  
      timeout = setTimeout(fn, delay, ...args);
    };
  };

  return (
    <div className="p-3">
      <h3>Tags</h3>
      <p className="py-3">A tag is a keyword or label that categorizes your question with other, similar questions.
        Using the right tags makes it easier for others to find and answer your question.</p>
      <div className="d-flex align-items-center justify-content-between">
        <div className="w-25 position-relative">
          <i className={`${styles.searchIcon} bi bi-search`}></i>
          <input value={keyword} className={`${styles.searchInput} form-control`} type="text" placeholder="Filter by tag name..." onChange={handleInputChange} />
        </div>
      </div>
      <div className="d-flex flex-wrap gap-2 my-3">
        {renderCardTag}
        <div className="mt-4 w-100 d-flex justify-content-end">
          <Pagination data={data} setDataCurrent={setDataCurrent} pageSize={20} />
        </div>
      </div>
    </div>
  );
}

export default Tags;
