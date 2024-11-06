"use client";
import React from "react";
import "./FavoriteIconOverlay.scss";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getUserAuth } from "@/app/util";
import { apiCall } from "@/api/sevice";
import confetti from "canvas-confetti";

export default function FavoriteIconOverlay({ id }: any) {
  const queryClient = useQueryClient();
  const userData: any = useSuspenseQuery({
    queryFn: getUserAuth,
    queryKey: ["user"],
  });

  const user = userData?.data ? JSON.parse(userData?.data) : null;
  if (!user?.email) return null;

  const favoritedItems = user?.wishlists || [];
  const handleFavorite = async () => {
    const data = await apiCall(
      "POST",
      `${
        favoritedItems.includes(id) ? "REMOVE_FROM_WISHLIST" : "ADD_TO_WISHLIST"
      }`,
      {},
      `?email=${user.email}`,
      { productId: id },
      {
        "Content-Type": "application/json",
      },
      {
        success: `Successfully ${
          favoritedItems.includes(id) ? "removed from" : "added to"
        } wishlist.`,
        failure: `Failed, ${
          favoritedItems.includes(id) ? "remove item from" : "add item to"
        } wishlist`,
      }
    );
    const userResp = data.email ? data : null;

    if (userResp) {
      localStorage.setItem("user", JSON.stringify(data));
      queryClient.setQueryData(["user"], JSON.stringify(data));
      queryClient.invalidateQueries({
        queryKey: ["wishlists", "user"],
      });
      let canvas = document.createElement("canvas");
      canvas.width = 1000;
      canvas.height = 1000;
      const container: any = document.getElementById(`confetti-button-${id}`);
      container.appendChild(canvas);
      let confetti_button: any = confetti.create(canvas);
      confetti_button({
        particleCount: 500,
        startVelocity: 7,
        spread: 360,
        ticks: 30,
        origin: {
          x: 0.5,
          y: 0.48,
        },
        colors: [`${favoritedItems.includes(id) ? "#eaffe4b3" : "#ff0000"}`],
        shapes: ["circle"],
        scalar: 0.3, // This makes the confetti smaller
      }).then(() => container.removeChild(canvas));
    }
  };

  return (
    <div className="favorite-icon-overlay-outer">
      <div
        className="favoriteIconOverlay"
        id={`confetti-button-${id}`}
        onClick={(event) => {
          event.stopPropagation(); // Stop the event from propagating to the outer div
          handleFavorite();
        }}
      >
        <svg
          className={`${
            favoritedItems.includes(id) ? "favoriteIcon" : "unfavoriteIcon"
          } confetti-button`}
          height="400"
          width="400"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className=""
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="#ff2f2f"
            stroke="#e8ffe4"
            stroke-width="2"
          />
        </svg>
      </div>
    </div>
  );
}
