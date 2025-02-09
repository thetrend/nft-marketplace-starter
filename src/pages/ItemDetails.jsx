import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import EthImage from "../images/ethereum.svg";
import "react-loading-skeleton/dist/skeleton.css";
import { useParams } from "react-router-dom";

const ItemDetails = () => {
  const { itemId } = useParams();
  const [loading, setLoading] = useState(true);
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchItemDetails = async () => {
      try {
        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${itemId}`
        );
        const data = await response.json();
        setItemData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching item details:", error);
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [itemId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top" />
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading ? (
                  <Skeleton height={300} width={300} />
                ) : (
                  <img
                    src={itemData?.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={itemData?.title}
                  />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{loading ? <Skeleton width={200} /> : itemData?.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye" />
                      {loading ? <Skeleton width={40} /> : itemData?.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart" />
                      {loading ? <Skeleton width={40} /> : itemData?.likes}
                    </div>
                  </div>
                  <p>{loading ? <Skeleton count={3} /> : itemData?.description}</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>{loading ? <Skeleton width={60} /> : "Owner"}</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemData?.ownerId}`}>
                            {loading ? (
                              <Skeleton circle height={40} width={40} />
                            ) : (
                              <img className="lazy" src={itemData?.ownerImage} alt={itemData?.ownerName} />
                            )}
                            <i className="fa fa-check" />
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${itemData?.ownerId}`}>
                            {loading ? <Skeleton width={100} /> : itemData?.ownerName}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div />
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>{loading ? <Skeleton width={60} /> : "Creator"}</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to="/author">
                            {loading ? (
                              <Skeleton circle height={40} width={40} />
                            ) : (
                              <img className="lazy" src={itemData?.creatorImage} alt={itemData?.creatorName} />
                            )}
                            <i className="fa fa-check" />
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to="/author">
                            {loading ? <Skeleton width={100} /> : itemData?.creatorName}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40" />
                    <h6>{loading ? <Skeleton width={60} /> : "Price"}</h6>
                    <div className="nft-item-price">
                      {loading ? (
                        <Skeleton width={40} circle />
                      ) : (
                        <img src={EthImage} alt="Ethereum" />
                      )}
                      <span>{loading ? <Skeleton width={40} /> : itemData?.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
