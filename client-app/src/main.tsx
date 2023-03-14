import ReactDOM from "react-dom/client";
import App from "./app/App";
import "semantic-ui-css/semantic.min.css";
import "./app/styles.css";
import { store, StoreContext } from "./app/stores/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<StoreContext.Provider value={store}>
		<App />
	</StoreContext.Provider>
);
