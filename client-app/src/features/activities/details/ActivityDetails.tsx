import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, GridColumn } from "semantic-ui-react";
import Loading from "../../../app/layout/Loading";
import { useStore } from "../../../app/stores/store";
import {
	ActivityDetailedChat,
	ActivityDetailedHeader,
	ActivityDetailedInfo,
	ActivityDetailedSidebar,
} from "./";

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
		<Grid>
			<GridColumn width="10">
				<ActivityDetailedHeader activity={activity} />
				<ActivityDetailedInfo activity={activity} />
				<ActivityDetailedChat />
			</GridColumn>
			<GridColumn width="6">
				<ActivityDetailedSidebar activity={activity} />
			</GridColumn>
		</Grid>
	);
};
export default observer(ActivityDetails);
