import ToDo from "./todo";
import { ConfirmProvider } from "material-ui-confirm";

function App() {
  return (
    <ConfirmProvider>
      <ToDo />
    </ConfirmProvider>
  );
}

export default App;
