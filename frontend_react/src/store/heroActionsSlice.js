import { url } from "../consts";
import { heroActions } from "./heroSlice";
import { uiActions } from "./uiSlice";

export const fetchData = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    };
    try {
      const heroData = await fetchHandler();
      dispatch(heroActions.replaceData(heroData));
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Data fetch failed",
          type: "error",
        })
      );
    }
  };
};
export const createHero = (hero) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        open: true,
        message: "Sending Request...",
        type: "warning",
      })
    );
    const sendRequest = async () => {
      await fetch(url + "/create", {
        method: "PUT",
        body: JSON.stringify(hero),
      });
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Hero was created",
          type: "success",
        })
      );
    };
    try {
      sendRequest();
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Request Failed",
          type: "error",
        })
      );
    }
  };
};

export const editHero = (hero) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        open: true,
        message: "Sending Request...",
        type: "warning",
      })
    );
    const sendRequest = async () => {
      await fetch(url + "/edit", {
        method: "POST",
        body: JSON.stringify(hero),
      });
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Hero was edited",
          type: "success",
        })
      );
    };
  };
};

export const deleteHero = (id) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        open: true,
        message: "Sending Request...",
        type: "warning",
      })
    );
    const sendRequest = async () => {
      await fetch(url + "/delete/" + id, {
        method: "DELETE",
      });
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Hero was deleted",
          type: "success",
        })
      );
    };
  };
};
