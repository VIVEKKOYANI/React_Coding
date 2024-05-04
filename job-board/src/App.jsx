import { useEffect, useState } from "react";
import "./App.css";

const ITEMS_PER_PAGE = 6;
const API_ENDPOINT = "https://hacker-news.firebaseio.com/v0";

function JobPosting({ url, title, by, time }) {
  const formatedTime = new Date(time * 1000).toLocaleString();
  return (
    <div className="post" role="listItem">
      <h2 className="post__title">
        <a
          className={url ? "" : "inactiveLink"}
          href={url}
          target="_blank"
          rel="noopener"
        >
          {title}
        </a>
      </h2>
      <span className="post__metadata">
        By {by} - {formatedTime}
      </span>
    </div>
  );
}

function App() {
  const [items, setItems] = useState([]);
  const [itemIds, setItemIds] = useState(null);
  const [fetchingDetails, setFetchingDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchItems = async (currPage) => {
    setCurrentPage(currPage);
    setFetchingDetails(true);

    let itemList = itemIds;
    if (itemList === null) {
      const response = await fetch(`${API_ENDPOINT}/jobstories.json`);
      itemList = await response.json();
      setItemIds(itemList);
    }

    const itemIdsForPage = itemList.slice(
      currPage * ITEMS_PER_PAGE,
      currPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

    const itemsForPage = await Promise.all(
      itemIdsForPage.map((itemId) =>
        fetch(`${API_ENDPOINT}/item/${itemId}.json`).then((res) => res.json())
      )
    );

    setItems([...items, ...itemsForPage]);
    setFetchingDetails(false);
  };

  useEffect(() => {
    if (currentPage === 0) fetchItems(currentPage);
  }, []);
  return (
    <div className="app">
      <h1 className="title">Hacker News Job Board</h1>
      {itemIds === null || items.length < 1 ? (
        <p className="loading">loading...</p>
      ) : (
        <div>
          <div className="items" role="list">
            {items.map((item) => (
              <JobPosting key={item.id} {...item} />
            ))}
          </div>
          <button
            className="load-more-button"
            onClick={() => fetchItems(currentPage + 1)}
            disabled={fetchingDetails}
          >
            {fetchingDetails ? "Loading..." : "Load more jobs"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;