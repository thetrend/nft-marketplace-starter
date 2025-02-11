import React from "react";
import { Link } from "react-router-dom";

const BrowseByCategory = () => {
  return (
    <section id="section-category" className="no-top">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fade-up">Browse by category</h2>
              <div className="small-border bg-color-2" />
            </div>
          </div>
          <div className="col-md-2 col-sm-4 col-6 mb-sm-30" data-aos="fade-left" data-aos-delay="500">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fa fa-image" />
              <span>Art</span>
            </Link>
          </div>
          <div className="col-md-2 col-sm-4 col-6 mb-sm-30" data-aos="fade-left" data-aos-delay="500">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fa fa-music" />
              <span>Music</span>
            </Link>
          </div>
          <div className="col-md-2 col-sm-4 col-6 mb-sm-30" data-aos="fade-left" data-aos-delay="500">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fa fa-search" />
              <span>Domain Names</span>
            </Link>
          </div>
          <div className="col-md-2 col-sm-4 col-6 mb-sm-30" data-aos="fade-left" data-aos-delay="500">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fa fa-globe" />
              <span>Virtual Worlds</span>
            </Link>
          </div>
          <div className="col-md-2 col-sm-4 col-6 mb-sm-30" data-aos="fade-left" data-aos-delay="500">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fa fa-vcard" />
              <span>Trading Cards</span>
            </Link>
          </div>
          <div className="col-md-2 col-sm-4 col-6 mb-sm-30" data-aos="fade-left" data-aos-delay="500">
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className="fa fa-th" />
              <span>Collectibles</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategory;
