import { observer } from "mobx-react-lite";
import {
	Button,
	ButtonGroup,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardMeta,
	Image,
} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

const ActivityDetails = () => {
	const { activityStore } = useStore();
	const {
		selectedActivity: activity,
		openForm,
		cancelSelectActivity,
	} = activityStore;

	if (!activity) return null;

	return (
		<Card fluid>
			<Image src={`/assets/categoryImages/${activity.category}.jpg`} />
			<CardContent>
				<CardHeader>{activity.title}</CardHeader>
				<CardMeta>
					<span>{activity.date}</span>
				</CardMeta>
				<CardDescription>{activity.description}</CardDescription>
			</CardContent>
			<CardContent>
				<ButtonGroup widths="2">
					<Button
						basic
						color="blue"
						content="Edit"
						onClick={() => openForm(activity.id)}
					></Button>
					<Button
						onClick={() => cancelSelectActivity()}
						basic
						color="grey"
						content="Cancel"
					></Button>
				</ButtonGroup>
			</CardContent>
		</Card>
	);
};
export default observer(ActivityDetails);
