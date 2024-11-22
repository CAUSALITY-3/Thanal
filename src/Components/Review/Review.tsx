"use client";
import React, { useState } from "react";
import "./Review.scss"; // Optional CSS for styling
import { Button } from "../Buttons/Button";
import { apiCall } from "@/api/sevice";
import { useQueryClient } from "@tanstack/react-query";

const Review = ({ reviewPayload }: any) => {
  const [rating, setRating] = useState(0); // Store the current rating
  const [review, setReview] = useState("");
  const queryClient = useQueryClient();

  const handleClick = (value: any) => {
    setRating(value);
    console.log(`Rating selected: ${value}`);
  };

  const submitReview = async () => {
    console.log("Review:", review, rating);

    const response = await apiCall(
      "POST",
      "REVIEW_PRODUCT",
      {},
      "",
      { ...reviewPayload, rating, review },
      {
        "Content-Type": "application/json",
      }
    );

    console.log("response", response);
    queryClient.invalidateQueries({
      queryKey: ["orders"],
    });
  };
  return (
    <div className="rate-review-container">
      <div className="rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? "selected" : ""}`}
            onClick={() => handleClick(star)}
          >
            ★
          </span>
        ))}
        <div className="rate-text">Rate this product</div>
      </div>
      <div className="review-container">
        <div className="review-title">Write a Review</div>
        <textarea
          id="review"
          placeholder="Write your review here..."
          maxLength={500}
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
      </div>
      <div className="submit-review" onClick={submitReview}>
        <Button>Submit</Button>
      </div>
    </div>
  );
};

export default Review;
