import { useContext } from "react";
import { ApiContext } from "../contexts/api-create-context";

const ApiUseContext = () => {
  const context = useContext(ApiContext);

  if (!context)
    throw new Error("ApiContext must be placed within ApiProvider");

  return context;
};

export default ApiUseContext;