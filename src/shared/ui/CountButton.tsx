import { useCountStore } from "../store/CountStore.tsx";
import { Button } from "antd";

const CountButton = () => {
  const { inc } = useCountStore();

  return (
    <div>
      <Button onClick={inc}></Button>
    </div>
  );
};

export default CountButton;
