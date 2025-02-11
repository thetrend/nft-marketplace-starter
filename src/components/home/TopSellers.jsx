import axios from "axios";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const TopSellers = () => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(null)

  useEffect(() => {
    const getList = async () => {
      try {
        setLoading(true)
        const apiUrl = 'https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers'
        const response = await axios.get(apiUrl)
        const sortedList = response.data.sort((a, b) => b.price - a.price)
        setList(sortedList)
      } catch (error) {
        console.error('Error fetching top sellers', error)
      } finally {
        setLoading(false)
      }
    }
    getList()
  }, [])

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fade-up">Top Sellers</h2>
              <div className="small-border bg-color-2" />
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list" data-aos="fade-up" data-aos-delay="500">
              {loading ? new Array(12).fill(0).map((_, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <li key={index}>
                  <div className="author_list_pp">
                    <Skeleton
                      className="lazy pp-author"
                    />
                  </div>
                  <Skeleton className="author_list_info" />
                </li>
              )) : (
                list.length > 0 ? (
                  list.map(item => (
                    <li key={item.authorId}>
                      <div className="author_list_pp">
                        <Link to={`/author/${item.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={item.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check" />
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${item.authorId}`}>{item.authorName}</Link>
                        <span>{item.price} ETH</span>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-center">No top sellers available.</p>
                )
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
