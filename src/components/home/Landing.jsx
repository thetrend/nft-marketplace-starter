import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../../images/bg-shape-1.jpg";
import NFT from "../../images/nft.png";

const Landing = () => {
  return (
    <section
      id="section-hero"
      aria-label="section"
      className="no-top no-bottom vh-100"
      data-bgimage="url(images/bg-shape-1.jpg) bottom"
      style={{ background: `url(${backgroundImage}) bottom / cover` }}
    >
      <div className="v-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="spacer-single" />
              <h6>
                <span className="text-uppercase id-color-2" data-aos="fade-up" data-aos-delay="500">
                  Ultraverse Market
                </span>
              </h6>
              <div className="spacer-10" />
              <h1 data-aos="fade-up" data-aos-delay="750">Create, sell or collect digital items.</h1>
              <p className="lead" data-aos="fade-up" data-aos-delay="1000">
                Unit of data stored on a digital ledger, called a blockchain,
                that certifies a digital asset to be unique and therefore not
                interchangeable
              </p>
              <div className="spacer-10" />
              <Link className="btn-main lead" data-aos="fade-up" data-aos-delay="1500" to="/explore">
                Explore
              </Link>
              <div className="mb-sm-30" />
            </div>
            <div className="col-md-6 xs-hide">
              <img src={NFT} className="lazy img-fluid" data-aos="fade-up" data-aos-delay="1500" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
