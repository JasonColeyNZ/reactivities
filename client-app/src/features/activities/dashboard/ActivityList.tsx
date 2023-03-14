import { observer } from "mobx-react-lite";
import { ItemGroup, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityItem from "./ActivityItem";

const ActivityList = () => {
	const { activityStore } = useStore();
	const { activitiesByDate } = activityStore;

	return (
		<>
			<Segment>
				<ItemGroup divided>
					{activitiesByDate.map((activity) => {
						return <ActivityItem key={activity.id} activity={activity} />;
					})}
				</ItemGroup>
			</Segment>
		</>
	);
};
export default observer(ActivityList);
