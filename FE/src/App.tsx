import "./App.css";
import RouterDom from "./Router";
import { checkToken } from "./helper/utils";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  if(checkToken() && (window.location.pathname === "/login" || window.location.pathname === "/register")) {
    window.location.href='/questions';
  };

  return (
    <div className="site-main">
        <RouterDom />
    </div>
  );
};

export default App;
