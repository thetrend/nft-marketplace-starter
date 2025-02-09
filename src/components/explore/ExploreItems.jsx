import axios from "axios";
import React, { useEffect, useState } from "react";
import Item from "../UI/Item"

const ExploreItems = () => {
  const [list, setList] = useState([])
  const [displayedList, setDisplayedList] = useState([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState("")
  const [itemsToShow, setItemsToShow] = useState(8)

  useEffect(() => {
    const getList = async () => {
      try {
        setLoading(true);
        const apiUrl = `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter || "likes_high_to_low"}`
        const response = await axios.get(apiUrl)
        setList(response.data)
        setDisplayedList(response.data.slice(0, 8))
        setItemsToShow(8)
      } catch (error) {
        console.error("Error fetching Explore page:", error)
      } finally {
        setLoading(false)
      }
    }

    getList()
  }, [filter])

  const loadMore = () => {
    const newItemsToShow = itemsToShow + 4;
    setDisplayedList(list.slice(0, newItemsToShow));
    setItemsToShow(newItemsToShow);
  };

  return (
    <>
      <div>
        <select id="filter-items" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        displayedList.map((item) => (
          <div
            key={item.nftId}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <Item item={item} />
          </div>
        ))
      )}

      {itemsToShow < list.length && (
        <div className="col-md-12 text-center">
          <button type="button" onClick={loadMore} className="btn-main lead">
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;