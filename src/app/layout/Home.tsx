import LoginButton from "../../features/auth/ui/LoginButton.tsx";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <LoginButton />
    </div>
  );
};

export default Home;
