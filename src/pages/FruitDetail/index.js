import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { Box, Rating } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getFruitDetail } from "../../redux/apiThunk/fruitThunk";
import { getReview, deleteReview } from "../../redux/apiThunk/reviewThunk";
import "bootstrap/dist/css/bootstrap.min.css";
import { getFruit } from "../../redux/apiThunk/fruitThunk";
import FruitList from "../../components/ListFruit";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/Reducers/CartSlice";
import { getAllDiscountFruit } from "../../redux/apiThunk/discountThunk";

const FruitDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reload, setReload] = useState(false);
  const [replyingCommentId, setReplyingCommentId] = useState(null);
  const [isReplying, setIsReplying] = useState(false);
  const replyInputRef = useRef(null);
  const [replyData, setReplyData] = useState([]);
  const [replyingCommentContent, setReplyingCommentContent] = useState("");
  const baseUrl = "https://fruitseasonms.azurewebsites.net/api/review-fruits";
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState({
    ReviewComment: "",
    Rating: 0,
    FruitId: id,
    ParentId: 0,
    UserId: user?.userId,
    UploadFile: "",
  });
  const [discountData, setDiscountData] = useState([]);
  console.log("data: ", data);
  useEffect(() => {
    dispatch(getAllDiscountFruit({ discountName: "", discountExpiryDate: "" }))
      .unwrap()
      .then((data) => {
        setDiscountData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching discount data:", error);
      });
  }, [dispatch]);
  useEffect(() => {
    dispatch(getFruitDetail({ id: id }))
      .then((result) => {
        return dispatch(
          getFruit({
            name: "",
            min: "",
            max: "",
            newDate: "",
            createDate: "",
            user: result.payload.data.userId,
          })
        );
      })
      .then(() => {
        // Logic that depends on both getFruitDetail and getFruit responses
      })
      .catch((err) => {
        // Handle errors
      });
  }, [dispatch, id]);
  const fruitDetail = useSelector((state) => state.fruit.detail.data);

  useEffect(() => {
    dispatch(getReview({ id: id }));
  }, [dispatch, id, reload]);
  const reviews = useSelector((state) => state.review.review.data);

  // useEffect(() => {
  //     dispatch(getFruit({ name: '', min: '', max: '', newDate: '', createDate: '', user: fruitDetail?.userId }))
  // }, [dispatch])
  const fruitList = useSelector((state) => state.fruit.fruit);

  function copyRandomElements(arr, count) {
    const newArr = [];
    const copyArr = arr?.slice(); // Create a copy of the original array

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * copyArr?.length);
      const randomElement = copyArr?.splice(randomIndex, 1)[0]; // Remove the element from the copy

      newArr.push(randomElement); // Add the element to the new array
    }

    return newArr;
  }

  // Assuming fruitList.data is your array
  const fruitListData = fruitList?.data; // Replace this with your array
  const numberOfElementsToCopy = 4;
  const randomElements = copyRandomElements(
    fruitListData,
    numberOfElementsToCopy
  );

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handlePostReview = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("ReviewComment", data.ReviewComment);
    formData.append("Rating", data.Rating);
    formData.append("FruitId", data.FruitId);
    formData.append("ParentId", data.ParentId);
    formData.append("UserId", data.UserId);
    formData.append("UploadFile", data.UploadFile);
    // await dispatch(postReview({ data: formData }))
    const response = await fetch(baseUrl, {
      method: "POST",
      body: formData,
    });
    // const data = await response.json();
    if (response.ok) {
      setReload(!reload);
    } else {
      console.log("Registration failed");
    }
    setData({
      ReviewComment: "",
      Rating: 0,
      FruitId: id,
      ParentId: 0,
      UserId: user?.userId,
      UploadFile: "",
    });
  };
  const handleReply = (reviewId) => {
    setReplyingCommentId(reviewId);
    setIsReplying(true);
    const selectedReview = reviews.find(
      (review) => review.reviewId === reviewId
    );

    if (selectedReview) {
      const replyDataItem = {
        reviewId: reviewId,
        rating: selectedReview.rating,
        replyingCommentContent: "",
      };

      const existingIndex = replyData.findIndex(
        (item) => item.reviewId === reviewId
      );

      if (existingIndex === -1) {
        setReplyData([...replyData, replyDataItem]);
      } else {
        const updatedReplyData = [...replyData];
        updatedReplyData[existingIndex] = replyDataItem;
        setReplyData(updatedReplyData);
      }
    }
  };
  const handleReplySubmit = async (event) => {
    event.preventDefault();

    const replyInfo = replyData.find(
      (item) => item.reviewId === replyingCommentId
    );
    if (replyInfo) {
      const formData = new FormData();
      formData.append("ReviewComment", replyingCommentContent);
      formData.append("Rating", 0);
      formData.append("FruitId", id);
      formData.append("ParentId", replyingCommentId);
      formData.append("UserId", user?.userId);
      formData.append("UploadFile", data.UploadFile);

      try {
        const response = await fetch(baseUrl, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          setReload(!reload);
          setReplyingCommentId(null);
          setIsReplying(false);
          setReplyingCommentContent("");
        } else {
          console.log("Reply failed");
        }
      } catch (error) {
        console.error("Error sending reply:", error);
      }
    }
  };
  const handleDeleteReview = async (e, id) => {
    e.preventDefault();
    await dispatch(deleteReview({ id: id }));
    setReload(!reload);
  };
  const handleAddToCart = (product) => {
    const findDis = discountData?.reduce((prev, curr, index) => {
      if (
        product?.fruitId === curr?.fruitId &&
        curr?.discountPercentage > (prev?.discountPercentage || 0) &&
        (curr?.discountThreshold || 0) > 0
      ) {
        return curr;
      }
      return prev;
    }, {});

    dispatch(
      addToCart({
        ...product,
        quantity: 1,
        percent: findDis.discountPercentage * 100,
        depositAmount: findDis.depositAmount,
        fruitDiscountId: findDis?.fruitDiscountId,
      })
    );
    toast.success("Đã thêm vào vỏ hàng!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <>
      <section className="pt-5">
        <div className="container px-2 px-lg-5 my-1 mb-0">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6">
              <img
                className="card-img-top mb-md-0 image"
                src={fruitDetail?.fruitImages[currentImageIndex]?.imageUrl}
                alt={fruitDetail?.fruitName}
              />
              <Box mt={2}>
                {fruitDetail?.fruitImages.map((image, index) => (
                  <img
                    key={index}
                    src={fruitDetail?.fruitImages[index].imageUrl}
                    alt={`Thumbnail ${index}`}
                    style={{
                      width: "80px",
                      height: "50px",
                      marginRight: "8px",
                      cursor: "pointer",
                      border:
                        index === currentImageIndex
                          ? "2px solid green"
                          : "none",
                    }}
                    onClick={() => handleThumbnailClick(index)}
                  />
                ))}
              </Box>
            </div>
            <div className="col-md-6">
              <div className="small mb-1">
                Loại sản phẩm: {fruitDetail?.categoryFruitName}
              </div>
              <h1 className="display-5 fw-bolder">{fruitDetail?.fruitName}</h1>
              <div className="fs-5 mb-3">
                <span>{fruitDetail?.price?.toFixed(3)} vnđ</span>
              </div>
              <p
                className="lead"
                dangerouslySetInnerHTML={{
                  __html: fruitDetail?.fruitDescription,
                }}
              ></p>

              <div className="d-flex">
                <button
                  className="btn btn-outline-dark flex-shrink-0"
                  type="button"
                  onClick={() => handleAddToCart(fruitDetail)}
                  style={{ backgroundColor: "green", color: "white" }}
                >
                  <i className="bi-cart-fill me-1"></i>
                  Thêm vào vỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-0">
        <div className="container px-2 px-lg-5 my-5">
          <div className="card-body">
            <form className="mb-4" onSubmit={(e) => handlePostReview(e)}>
              <Rating
                name="half-rating"
                value={data.Rating}
                // precision={0.5}
                onChange={(e) => setData({ ...data, Rating: e.target.value })}
              />
              <textarea
                className="form-control mb-3"
                rows="3"
                placeholder="Bạn hãy đánh giá về sản phẩm này"
                onChange={(e) =>
                  setData({ ...data, ReviewComment: e.target.value })
                }
                required
                value={data.ReviewComment}
              ></textarea>
              <button className="btn btn-success" type="submit">
                Đánh giá
              </button>
            </form>
            {reviews?.map(
              (reviewParent) =>
                reviewParent.parentId === 0 && (
                  <div className="d-flex mb-4" key={reviewParent.reviewId}>
                    <div className="flex-shrink-0">
                      <img
                        className="rounded-circle"
                        src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                        alt="avatar user"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </div>
                    <div className="ms-3">
                      <div className="fw-bold">
                        {reviewParent.fullName}&nbsp;
                        <Rating
                          name="read-only"
                          value={reviewParent.rating}
                          readOnly
                          precision={0.5}
                        />
                      </div>
                      {reviewParent.reviewComment}
                      <div>
                        <button
                          className="btn btn-light"
                          style={{ color: "#198754" }}
                          onClick={() => handleReply(reviewParent.reviewId)}
                        >
                          Trả lời
                        </button>
                        {reviewParent.reviewId === replyingCommentId &&
                          isReplying && (
                            <div ref={replyInputRef}>
                              <form
                                className="mb-4"
                                onSubmit={(event) => handleReplySubmit(event)}
                                style={{ marginTop: "10px" }}
                              >
                                <textarea
                                  className="form-control mb-3"
                                  rows="3"
                                  placeholder="Bạn hãy phản hồi đánh giá này ở đây"
                                  onChange={(e) =>
                                    setReplyingCommentContent(e.target.value)
                                  }
                                  required
                                  value={replyingCommentContent}
                                ></textarea>
                                <button
                                  className="btn btn-success"
                                  type="submit"
                                >
                                  Gửi câu trả lời
                                </button>
                              </form>
                            </div>
                          )}
                        {reviewParent.fullName === user?.fullName && (
                          <>
                            <button
                              className="btn btn-light"
                              style={{ color: "#dc3545" }}
                              onClick={(e) =>
                                handleDeleteReview(e, reviewParent.reviewId)
                              }
                            >
                              Xóa
                            </button>
                          </>
                        )}
                      </div>
                      {reviews
                        ?.filter(
                          (reviewChild) =>
                            reviewChild.parentId === reviewParent.reviewId
                        )
                        .map((reviewChild) => (
                          <div
                            className="d-flex mt-4"
                            key={reviewChild.reviewId}
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div className="flex-shrink-0">
                              <img
                                className="rounded-circle"
                                src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                                alt="avatar user"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                }}
                              />
                            </div>
                            <div className="ms-3">
                              <div className="fw-bold">
                                {reviewChild.fullName}
                              </div>
                              {reviewChild.reviewComment}
                            </div>
                            <div
                              style={{
                                marginLeft: "20px",
                                marginTop: "15px",
                              }}
                            >
                              {reviewChild.fullName === user?.fullName && (
                                <>
                                  <button
                                    className="btn btn-light"
                                    style={{ color: "#dc3545" }}
                                    onClick={(e) =>
                                      handleDeleteReview(
                                        e,
                                        reviewChild.reviewId
                                      )
                                    }
                                  >
                                    Xóa
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </section>
      <section className="py-1 bg-light">
        <div className="container px-2 px-lg-5 mt-5">
          <h2 className="fw-bolder mb-4">Related products</h2>
          <div className="row gx-2 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4">
            <FruitList data={randomElements} />
          </div>
        </div>
      </section>
      <section className="py-3 bg-light">
        <div className="container px-4 px-lg-5 mb-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            <button className="btn btn-outline-success">
              <Link
                to={`/search`}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                {" "}
                Show More{" "}
              </Link>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default FruitDetail;
