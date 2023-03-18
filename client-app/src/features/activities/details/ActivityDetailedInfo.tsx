import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Segment, Grid, Icon } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
	activity: Activity;
}

const ActivityDetailedInfo = ({ activity }: Props) => {
	const [activityDate, setActivityDate] = useState<Date>();
	useEffect(() => {
		if (activity && activity.date) {
			let newDate = new Date(activity.date + "Z");
			setActivityDate(newDate);
		}
	}, [activity]);

	return (
		<Segment.Group>
			<Segment attached="top">
				<Grid>
					<Grid.Column width={1}>
						<Icon size="large" color="teal" name="info" />
					</Grid.Column>
					<Grid.Column width={15}>
						<p>{activity.description}</p>
					</Grid.Column>
				</Grid>
			</Segment>
			<Segment attached>
				<Grid verticalAlign="middle">
					<Grid.Column width={1}>
						<Icon name="calendar" size="large" color="teal" />
					</Grid.Column>
					<Grid.Column width={15}>
						{activityDate && (
							<span>{format(activityDate, "dd MMM yyyy h:mm aa")}</span>
						)}
					</Grid.Column>
				</Grid>
			</Segment>
			<Segment attached>
				<Grid verticalAlign="middle">
					<Grid.Column width={1}>
						<Icon name="marker" size="large" color="teal" />
					</Grid.Column>
					<Grid.Column width={11}>
						<span>
							{activity.venue}, {activity.city}
						</span>
					</Grid.Column>
				</Grid>
			</Segment>
		</Segment.Group>
	);
};

export default observer(ActivityDetailedInfo);
