import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import ReactOwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import { options } from '../../ReactOwlCarouselOptions'
import Timer from "../UI/Timer";

const Item = ({ item }) => {


  return (
    <div key={item.nftId}>
      <div className="nft__item">
        <div className="author_list_pp">
          <Link
            to="/author"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
          >
            <img className="lazy" src={item.authorImage} alt="" />
            <i className="fa fa-check" />
          </Link>
        </div>
        {item.expiryDate && <div className="de_countdown"><Timer timestamp={item.expiryDate} /></div>}
        <div className="nft__item_wrap">
          <div className="nft__item_extra">
            <div className="nft__item_buttons">
              <button type="button">Buy Now</button>
              <div className="nft__item_share">
                <h4>Share</h4>
                <a href="" target="_blank" rel="noreferrer">
                  <i className="fa fa-facebook fa-lg" />
                </a>
                <a href="" target="_blank" rel="noreferrer">
                  <i className="fa fa-twitter fa-lg" />
                </a>
                <a href="">
                  <i className="fa fa-envelope fa-lg" />
                </a>
              </div>
            </div>
          </div>

          <Link to={`/item-details/${item.nftId}`}>
            <img
              src={item.nftImage}
              className="lazy nft__item_preview"
              alt=""
            />
          </Link>
        </div>
        <div className="nft__item_info">
          <Link to="/item-details">
            <h4>{item.title}</h4>
          </Link>
          <div className="nft__item_price">{item.price} ETH</div>
          <div className="nft__item_like">
            <i className="fa fa-heart" />
            <span>{item.likes}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const NewItems = () => {
  const [collection, setCollection] = useState([])
  const [loading, setLoading] = useState(null)

  useEffect(() => {
    const getCollection = async () => {
      try {
        setLoading(true)
        const apiUrl = 'https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems'
        const response = await axios.get(apiUrl)
        setCollection(prevCollection => {
          if (JSON.stringify(prevCollection) !== JSON.stringify(response.data)) {
            return response.data
          }
          return prevCollection
        })
      } catch (error) {
        console.error('Error fetching collection:', error)
      } finally {
        setLoading(false)
      }
    }
    getCollection()
  }, [])

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2" />
            </div>
          </div>

          {loading ? (
            new Array(4).fill(null).map((_, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <div key={index} className="col-lg-3 col-md-6 col-sm-6 mb-4">
                <div className="skeleton-box" style={{ width: '100%' }}>
                  <div className="nft_wrap">
                    <Skeleton className="lazy img-fluid" />
                  </div>
                  <div className="nft_coll_pp">
                    <Skeleton className="lazy pp-coll" />
                  </div>
                  <div className="nft_coll_info">
                    <Skeleton />
                    <Skeleton />
                  </div>
                </div>
              </div>
            ))
          ) : collection.length > 0 ? (
            <ReactOwlCarousel {...options}>
              {collection.map((item) => (
                <Item key={item.id} item={item} />
              ))}
            </ReactOwlCarousel>
          ) : (
            <p className="text-center">No items available.</p> // Fallback in case no data is found
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
