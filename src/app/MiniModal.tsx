import PropTypes from "prop-types";
import ReactDom from "react-dom";
import React, { useEffect, useState } from "react";

import "./MiniModal.scss";

function MiniModal({
  open,
  DMDetails,
  setVisible,
  onMiniModal,
  setOnMiniModal,
  setonHoverDeliveryMap,
  setLearnMoreModal,
}: any): React.ReactElement {
  const [topVal, setTopVal] = useState<number>(0);
  const [leftVal, setLeftVal] = useState<number>(0);
  const [arrowTopVal, setArrowTopVal] = useState<number>(0);
  const [arrowRightVal, setArrowRightVal] = useState<number>(0);

  const getPosition = () => {
    const { id } = DMDetails;
    const iconDetail = document.getElementById(`info-icon-${id}`);
    if (iconDetail !== null) {
      const { top } = iconDetail.getBoundingClientRect();
      const { left } = iconDetail.getBoundingClientRect();

      if (top < 400 && top + 400 > window.innerHeight) {
        setTopVal(top);
        setLeftVal(left - 215);
        setArrowTopVal(167);
        setArrowRightVal(-5);
      } else if (top < 400 && top + 400 < window.innerHeight) {
        setTopVal(top + 194);
        setLeftVal(left - 122);
        setArrowTopVal(-5);
        setArrowRightVal(64);
      } else {
        setTopVal(top - 179);
        setLeftVal(left - 122);
        setArrowTopVal(324);
        setArrowRightVal(64);
      }
    }
  };

  const closeOnScroll = () => {
    setVisible(false);
  };

  useEffect(() => {
    getPosition();
    const scrollableParent = document.getElementById("iconTopId");
    if (open || onMiniModal) {
      scrollableParent!.addEventListener("scroll", closeOnScroll);
    }
    return () => {
      scrollableParent!.removeEventListener("scroll", closeOnScroll);
    };
  }, [open]);

  const closeModal = () => {
    setOnMiniModal(false);
    setonHoverDeliveryMap(false);
  };

  const onHoverModal = () => {
    setonHoverDeliveryMap(true);
    setOnMiniModal(true);
  };

  const getTime = (releaseTime: string) => {
    const em = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const dateObj = new Date(
      releaseTime === "DateTime" ? DMDetails.audit.createdDate : releaseTime
    );
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();

    return `${em[month]} ${year}`;
  };

  const openLearnMore = () => {
    setLearnMoreModal(true);
  };

  if (!open && !onMiniModal) return <></>;
  return ReactDom.createPortal(
    <div
      className="mini-m0da1-c0ntainer"
      style={{
        top: topVal,
        left: leftVal,
      }}
      onMouseEnter={onHoverModal}
      onMouseLeave={closeModal}
    >
      <div className="mini-modal-title">{DMDetails.name}</div>
      <div className="mini-modal-description">
        {DMDetails.description === undefined
          ? "No Description"
          : DMDetails.description}
      </div>
      <div className="mini-modal-status">STATUS</div>
      {DMDetails.audit?.modifiedDate !== undefined ? (
        <div className="mini-modal-status-date">
          Last updated {getTime(DMDetails.audit?.modifiedDate)}
        </div>
      ) : (
        <div className="mini-modal-status-date">Undefined</div>
      )}
      {(DMDetails.audit || DMDetails.description) && (
        <div className="mini-modal-learn-more">
          <div className="mini-modal-learn-more-p">Need more information? </div>
          <div className="mini-modal-learn-more-link" onClick={openLearnMore}>
            Learn More
          </div>
        </div>
      )}

      <div
        className="mini-modal-arrow"
        style={{ right: arrowRightVal, top: arrowTopVal }}
      />
    </div>,
    document.body
  );
}

MiniModal.defaultProps = {
  DMDetails: {},
  setLearnMoreModal: null,
  open: false,
  setVisible: null,
  onMiniModal: false,
  setOnMiniModal: null,
  setonHoverDeliveryMap: null,
};

MiniModal.propTypes = {
  DMDetails: PropTypes.objectOf(PropTypes.any),
  setLearnMoreModal: PropTypes.func,
  open: PropTypes.bool,
  setVisible: PropTypes.func,
  onMiniModal: PropTypes.bool,
  setOnMiniModal: PropTypes.func,
  setonHoverDeliveryMap: PropTypes.func,
};

export { MiniModal };
