import { useNavigate } from "react-router";
import LoginButton from "../../features/auth/ui/LoginButton.tsx";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <LoginButton onClick={() => navigate("/login")}>login</LoginButton>
    </div>
  );
};

export default Home;
