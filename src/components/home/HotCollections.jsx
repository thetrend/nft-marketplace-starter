import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactOwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";

const Item = ({ item }) => {
  return (
    <div>
      <div className="nft_coll">
        <div className="nft_wrap">
          <Link to="/item-details">
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

  const options = {
    items: 4,
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 4,
      }
    }
  }

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
          {!loading && collection.length > 0 && (
            <ReactOwlCarousel {...options}>
              {
                collection.map(item => (<Item key={item.id} item={item} />))
              }
            </ReactOwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
