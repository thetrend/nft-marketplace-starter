import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import AuthorItems from "../components/author/AuthorItems";
import AuthorBanner from "../images/author_banner.jpg";

const Author = () => {
  const { authorId } = useParams();
  const [authorInfo, setAuthorInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false); // Track following state

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        setLoading(true);
        const apiUrl = `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`;
        const response = await axios.get(apiUrl);
        setAuthorInfo(response.data);
      } catch (error) {
        console.error("Error fetching author data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [authorId]);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);

    if (isFollowing) {
      setAuthorInfo((prev) => ({
        ...prev,
        followers: prev.followers - 1,
      }));
    } else {
      setAuthorInfo((prev) => ({
        ...prev,
        followers: prev.followers + 1,
      }));
    }
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top" />

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        />

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <Skeleton circle height={100} width={100} />
                      ) : (
                        <img src={authorInfo.authorImage} alt="Author" />
                      )}
                      <i className="fa fa-check" />
                      <div className="profile_name">
                        <h4>
                          {loading ? <Skeleton width={150} /> : authorInfo?.authorName}
                          <span className="profile_username">
                            {loading ? <Skeleton width={100} /> : `@${authorInfo?.tag}`}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {loading ? <Skeleton width={200} /> : authorInfo?.address}
                          </span>
                          {!loading && (
                            <button type="button" id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {loading ? <Skeleton width={80} /> : `${authorInfo?.followers} followers`}
                      </div>
                      {loading ? (
                        <Skeleton width={80} height={30} />
                      ) : (
                        <button
                          type="button"
                          onClick={handleFollowClick}
                          className="btn-main"
                        >
                          {isFollowing ? "Unfollow" : "Follow"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  {loading ? <Skeleton count={5} height={150} /> : <AuthorItems collection={authorInfo.nftCollection} authorImg={authorInfo.authorImage} authorId={authorId} />}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
