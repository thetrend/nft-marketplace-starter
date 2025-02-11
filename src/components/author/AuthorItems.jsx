import React from "react";
import { Link } from "react-router-dom";

const AuthorItems = ({ collection, authorImg, authorId }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {collection.map((item) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.nftId}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to={`/author/${authorId}`}>
                    <img className="lazy" src={authorImg} alt="" />
                    <i className="fa fa-check" />
                  </Link>
                </div>
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button type="button">Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <i className="fa fa-facebook fa-lg" />
                        <i className="fa fa-twitter fa-lg" />
                        <i className="fa fa-envelope fa-lg" />
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
                  <Link to={`/item-details/${item.nftId}`}>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
