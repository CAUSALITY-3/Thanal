"use client";
import React, { useState } from "react";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { apiCall } from "@/api/sevice";
import { useRouter } from "next/navigation";
import { getUserAuth } from "../util";
import "./bag.scss";
import BagItems from "@/Components/BagItems/BagItems";
import Template from "../template";
import Modal from "@/Components/Modal/Modal";
import EditDeliveryAddress from "@/Components/DeliveryAddress/EditDeliveryAddress";
import DeliveryAddress from "@/Components/DeliveryAddress/DeliveryAddress";
import { Button } from "@/Components/Buttons/Button";
import Payment from "@/Components/Payment/Payment";

function Bag({ product }: any) {
  // const [products, setProducts] = useState<any>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const [orderDetails, setOrderDetails] = useState<any>({});
  const router = useRouter();

  const { data } = useSuspenseQuery({
    queryFn: getUserAuth,
    queryKey: ["user"], //Array according to Documentation
  });

  const user = data ? JSON.parse(data) : null;
  const getProductByIds = async () => {
    const data = await apiCall(
      "post",
      "GET_PRODUCT_BY_IDS",
      {},
      "",
      {
        ids: user?.bag,
      },
      {
        "Content-Type": "application/json",
      }
    );
    console.log("GET_PRODUCT_BY_ID", data);

    return data;
  };

  const getProducts = user?.bag?.length > 0 && !product;
  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryFn: getProductByIds,
    queryKey: ["bag"],
    enabled: getProducts,
  });

  const checkoutFn = (data: any) => {
    setOrderDetails(data);
    setIsOpen(true);
  };

  if (!user?.email) {
    router.push("/login");
  }

  return (
    <div className="bag-page-outer-container">
      <div className="bag-page-container">
        {!productsLoading && (!!product || productsData?.length > 0) ? (
          orderDetails?.totalAmount ? (
            <Payment
              name={user?.name}
              email={user?.email}
              orderDetails={orderDetails}
            />
          ) : (
            <>
              <Template>
                <BagItems
                  products={
                    getProducts ? productsData : product ? [product] : []
                  }
                  checkoutFn={checkoutFn}
                />
              </Template>
              {user?.deliveryAddress?.length > 0 ? (
                <Modal
                  isOpen={isOpen}
                  size={"m"}
                  title={"Select the Delivery Address"}
                  handleClose={() => setIsOpen(false)}
                >
                  <DeliveryAddress
                    deliveryAddress={user?.deliveryAddress}
                    defaultIndex={0}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <div
                    className="address-selected-btn-bag"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <Button color={"#89CFF0"}>
                      <div>Done</div>
                    </Button>
                  </div>
                </Modal>
              ) : (
                <Modal
                  isOpen={isOpen}
                  size={"l"}
                  handleClose={() => setIsOpen(false)}
                  title={"Add Delivery Address"}
                >
                  <EditDeliveryAddress
                    deliveryAddress={user?.deliveryAddress || []}
                    handleClose={() => setIsOpen(false)}
                    index={selected}
                  />
                </Modal>
              )}
            </>
          )
        ) : (
          <div className="no-products">Bag is empty</div>
        )}
      </div>
    </div>
  );
}

export default Bag;
