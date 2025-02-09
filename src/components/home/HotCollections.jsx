import axios from "axios";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import ReactOwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import { options } from "../../ReactOwlCarouselOptions";

const Item = ({ item }) => {
  return (
    <div>
      <div className="nft_coll">
        <div className="nft_wrap">
          <Link to={`/item-details/${item.nftId}`}>
            <img src={item.nftImage} className="lazy img-fluid" alt="" />
          </Link>
        </div>
        <div className="nft_coll_pp">
          <Link to="/author">
            <img className="lazy pp-coll" src={item.authorImage} alt="" />
          </Link>
          <i className="fa fa-check" />
        </div>
        <div className="nft_coll_info">
          <Link to="/explore">
            <h4>{item.title}</h4>
          </Link>
          <span>{item.code}</span>
        </div>
      </div>
    </div>
  )
}

const HotCollections = () => {
  const [collection, setCollection] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getCollection = async () => {
      try {
        setLoading(true)
        const apiUrl = 'https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections'
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
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
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
            <p className="text-center">No collections available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
