import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
import Loading from "../../../app/layout/Loading";
import { useStore } from "../../../app/stores/store";

const ActivityDetails = () => {
	const { activityStore } = useStore();
	const { id } = useParams();
	const {
		selectedActivity: activity,
		loadActivity,
		loadingInitial,
	} = activityStore;

	useEffect(() => {
		if (id) loadActivity(id);
	}, [id, loadActivity]);

	if (loadingInitial || !activity) return <Loading />;

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
						as={Link}
						to={`/manage/${activity.id}`}
					></Button>
					<Button
						basic
						color="grey"
						content="Cancel"
						as={Link}
						to="/activities"
					></Button>
				</ButtonGroup>
			</CardContent>
		</Card>
	);
};
export default observer(ActivityDetails);
