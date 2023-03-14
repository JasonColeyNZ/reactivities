import { useState, SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import {
	Button,
	Item,
	ItemContent,
	ItemDescription,
	ItemExtra,
	ItemHeader,
	ItemMeta,
	Label,
} from "semantic-ui-react";
import { Activity } from "../../../app/models";
import { useStore } from "../../../app/stores/store";

interface Props {
	activity: Activity;
}

const ActivityItem = ({ activity }: Props) => {
	const { activityStore } = useStore();
	const { loading, deleteActivity } = activityStore;

	const [target, setTarget] = useState("");
	const handleActivityDelete = (
		e: SyntheticEvent<HTMLButtonElement>,
		id: string
	) => {
		setTarget(e.currentTarget.name);
		deleteActivity(id);
	};

	return (
		<Item key={activity.id}>
			<ItemContent>
				<ItemHeader as="a">{activity.title}</ItemHeader>
				<ItemMeta>{activity.date}</ItemMeta>
				<ItemDescription>
					<div>{activity.description}</div>
					<div>
						{activity.city}, {activity.venue}
					</div>
				</ItemDescription>
				<ItemExtra>
					<Button
						as={Link}
						to={`/activities/${activity.id}`}
						floated="right"
						content="View"
						color="blue"
					/>
					<Button
						onClick={(e) => handleActivityDelete(e, activity.id)}
						name={activity.id}
						loading={loading && target === activity.id}
						floated="right"
						content="Delete"
						color="red"
					/>
					<Label basic content={activity.category} />
				</ItemExtra>
			</ItemContent>
		</Item>
	);
};
export default ActivityItem;
