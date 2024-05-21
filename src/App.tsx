import { useState } from "react";
import { Button } from "@/components/ui/button";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Count: {count}</h1>
      <Button onClick={() => setCount((count) => count + 1)}>Increment</Button>
    </>
  );
}

export default App;
