import axios from "axios";
import { url } from "../consts";
import { heroActions } from "./heroSlice";
import { uiActions } from "./uiSlice";

export const fetchData = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await axios.get(url);
      const data = res.data;
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
      await axios.post(url + "/", hero, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Hero was created",
          type: "success",
        })
      );
      dispatch(fetchData());
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

export const editHero = (req) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        open: true,
        message: "Sending Request...",
        type: "warning",
      })
    );

    const sendRequest = async (req) => {
      await axios.put(`${url}/${req.id}`, req.hero, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    };

    try {
      await sendRequest(req);
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Hero was edited",
          type: "success",
        })
      );
      dispatch(fetchData());
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
      await axios.delete(url + "/" + id);
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Hero was deleted",
          type: "success",
        })
      );
      dispatch(fetchData()); // Update the store after hero deletion
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

export const findHeroById = (id) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const res = await axios.get(url + "/" + id);
      const heroData = res.data;
      return heroData;
    };

    try {
      return sendRequest().then((res) => {
        return res;
      });
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
