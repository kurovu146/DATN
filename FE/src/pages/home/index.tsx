import Header from "../../components/header";
import Navbar from "../../components/navbar";
import QuestionUI from "../QuestionUI/index";
import Tags from "../tags";
import UserList from "../userlistUI/index";
import Companies from "../companies";
import styles from "./home.module.css";
import Footer from "../../components/footer";
import AllQuestion from "../allQuestion";
import QuestionsByTag from "../../components/questionsByTag";

function Home() {
  let pathName = window.location.pathname;
  const renderPage = () => {
    if (pathName.includes("/questions/tag")) return <QuestionsByTag />;
    if (pathName.includes("/questions")) return <QuestionUI />;
    if (pathName === "/users") return <UserList />;
    if (pathName === "/") return <AllQuestion />;
    if (pathName === "/tags") return <Tags />;
    if (pathName === "/companies") return <Companies />;
  };

  return (
    <div>
      <Header />
      <div className="container d-flex align-items-start">
        <Navbar />
        <div className={`${styles.content} px-3 w-100`}>{renderPage()}</div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
