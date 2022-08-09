import { createContext, useState } from "react";
import axios from "../utils/axios";

const ApiContext = createContext(null);

function ApiProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const httpRequest = async (
    method,
    path,
    data = {},
    options = {
      showLoading: true,
    }
  ) => {
    try {
      setLoading(options.showLoading);
      let res = await axios[method](path, data);
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const postData = async (
    path,
    data = {},
    options = {
      showLoading: true,
    }
  ) => {
    return httpRequest("post", path, data, options);
  };

  const getData = async (
    path,
    data = {},
    options = {
      showLoading: true,
    }
  ) => {
    return httpRequest("get", path, data, options);
  };

  return (
    <ApiContext.Provider
      value={{
        // method: "api",
        loading,
        postData,
        getData,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}

export { ApiContext, ApiProvider };
