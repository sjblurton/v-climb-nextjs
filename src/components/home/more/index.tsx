import React, { useContext, useEffect, useState } from "react";
import { FilterContext } from "../../../context/context";
import { ActionType } from "../../../reducer/actions";
import { axiosGet } from "../../../service/axios";

export const LoadMore = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const { dispatch, state } = useContext(FilterContext);

  useEffect(() => {
    if (state.shoes.length === state.limit) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [state]);

  // const handleClick = async () => {
  //   setLoading(true);
  //   const res = await axiosGet.getInitShoes({
  //     skip: state.limit,
  //     take: state.limit * 2,
  //   });
  //   dispatch({
  //     type: ActionType.AddMoreShoes,
  //     payload: { limit: state.limit * 2, skip: state.limit, shoes: res.shoes },
  //   });
  //   setLoading(false);
  // };
  return (
    <div className={show ? "flex w-full my-4 justify-center" : "hidden"}>
      <button
        className={loading ? "btn-olive disabled-btn" : "btn-olive"}
        // onClick={handleClick}
      >
        See More
      </button>
    </div>
  );
};
