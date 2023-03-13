import { ItemGroup, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models";
import ActivityItem from "./ActivityItem";

interface Props {
	activities: Activity[];
	selectActivity: (id: string) => void;
	deleteActivity: (id: string) => void;
	submitting: boolean;
}

const ActivityList = ({
	activities,
	selectActivity,
	deleteActivity,
	submitting,
}: Props) => {
	return (
		<>
			<Segment>
				<ItemGroup divided>
					{activities.map((activity) => {
						return (
							<ActivityItem
								activity={activity}
								selectActivity={selectActivity}
								deleteActivity={deleteActivity}
								submitting={submitting}
							/>
						);
					})}
				</ItemGroup>
			</Segment>
		</>
	);
};
export default ActivityList;
