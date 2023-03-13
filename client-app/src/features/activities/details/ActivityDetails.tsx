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
import { Activity } from "../../../app/models";

interface Props {
	activity: Activity;
	cancelSelectActivity: () => void;
	openForm: (id: string) => void;
}

const ActivityDetails = ({
	activity,
	cancelSelectActivity,
	openForm,
}: Props) => {
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
export default ActivityDetails;
