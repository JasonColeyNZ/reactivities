import { useEffect, useState } from "react";
import axios from "axios";
import { Header, List, Button } from "semantic-ui-react";

function App() {
	const [activities, setActivities] = useState([]);

	useEffect(() => {
		axios.get("http://192.168.20.50:5000/api/activities").then((response) => {
			setActivities(response.data);
		});
	}, []);

	return (
		<div>
			<Header as="h2" icon="users" content="Reactivities" />
			<List>
				<List.Item>
					{activities.map((activity: any) => {
						return <div key={activity.id}>{activity.title}</div>;
					})}
				</List.Item>
			</List>
		</div>
	);
}

export default App;
