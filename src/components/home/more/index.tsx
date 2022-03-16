import React, { useContext, useEffect, useState } from "react";
import { FilterContext } from "../../../context/context";
import { ActionType } from "../../../reducer/actions";
import { axiosGet } from "../../../service/axios";

export const LoadMore = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const { dispatch, state } = useContext(FilterContext);

  useEffect(() => {
    handleClick();
  }, []); //eslint-disable-line

  useEffect(() => {
    if (state.shoes.length === state.limit) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [state]);

  const handleClick = async () => {
    setLoading(true);
    const res = await axiosGet.getShoes({
      skip: state.limit.toString(),
      take: (state.limit * 2).toString(),
    });
    if (res.shoes)
      dispatch({
        type: ActionType.AddMoreShoes,
        payload: {
          limit: state.limit + 90,
          skip: state.skip + state.limit,
          shoes: res.shoes,
        },
      });
    setLoading(false);
  };

  return (
    <div
      className={
        show ? "flex w-full my-4 justify-center  col-span-full" : "hidden"
      }
    >
      {loading ? (
        <div className="flex justify-center items-center">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-slate-200"
            role="status"
          >
            <span className="visually-hidden"></span>
          </div>
        </div>
      ) : (
        <button className={"btn-olive"} onClick={handleClick}>
          See More
        </button>
      )}
    </div>
  );
};
