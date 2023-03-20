import { Action } from "@remix-run/router";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { SyntheticEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import {
	Card,
	CardGroup,
	Grid,
	GridColumn,
	Header,
	Tab,
	TabPane,
	TabProps,
	Image,
	CardContent,
	CardHeader,
	CardMeta,
} from "semantic-ui-react";
import { UserActivity } from "../../app/models/userActivity";
import { useStore } from "../../app/stores/store";

const panes = [
	{ menuItem: "Future Events", pane: { key: "future" } },
	{ menuItem: "Past Events", pane: { key: "past" } },
	{ menuItem: "Hosting", pane: { key: "hosting" } },
];

const ProfileActivities = () => {
	const { profileStore } = useStore();
	const { loadUserActivities, profile, loadingActivities, userActivites } =
		profileStore;

	useEffect(() => {
		loadUserActivities(profile!.username);
	}, [loadUserActivities, profile]);

	const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
		loadUserActivities(
			profile!.username,
			panes[data.activeIndex as number].pane.key
		);
	};
	return (
		<TabPane loading={loadingActivities}>
			<Grid>
				<GridColumn width={16}>
					<Header floated="left" icon="calendar" content={"Activities"} />
				</GridColumn>
				<GridColumn width={16}>
					<Tab
						panes={panes}
						menu={{ secondary: true, pointing: true }}
						onTabChange={(e, data) => handleTabChange(e, data)}
					/>
					<br />
					<CardGroup itemsPerRow={4}>
						{userActivites.map((activity: UserActivity) => (
							<Card
								as={Link}
								to={`/activities/${activity.id}`}
								key={activity.id}
							>
								<Image
									src={`/assets/categoryImages/${activity.category}.jpg`}
									style={{ minHeight: 100, objectFit: "cover" }}
								/>
								<CardContent>
									<CardHeader textAlign="center">{activity.title}</CardHeader>
									<CardMeta textAlign="center">
										<div>{format(new Date(activity.date), "do LLL")}</div>
										<div>{format(new Date(activity.date), "h:mm a")}</div>
									</CardMeta>
								</CardContent>
							</Card>
						))}
					</CardGroup>
				</GridColumn>
			</Grid>
		</TabPane>
	);
};
export default observer(ProfileActivities);
