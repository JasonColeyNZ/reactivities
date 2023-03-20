import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Grid, GridColumn, Loader } from "semantic-ui-react";
import Loading from "../../../app/layout/Loading";
import { PagingParams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
import ActivityFilters from "./ActivityFilters";
import ActivityList from "./ActivityList";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";

const ActivityDashboard = () => {
	const { activityStore } = useStore();
	const {
		loadActivities,
		activityRegistry,
		loadingInitial,
		setPagingParams,
		pagination,
	} = activityStore;
	const [loadingNext, setLoadingNext] = useState(false);

	const handleGetNext = () => {
		setLoadingNext(true);
		setPagingParams(new PagingParams(pagination!.currentPage + 1));
		loadActivities().then(() => setLoadingNext(false));
	};

	useEffect(() => {
		if (activityRegistry.size <= 1) loadActivities();
	}, [activityStore, activityRegistry.size]);

	return (
		<Grid>
			<GridColumn width="10">
				{activityStore.loadingInitial && !loadingNext ? (
					<>
						<ActivityListItemPlaceholder />
						<ActivityListItemPlaceholder />
					</>
				) : (
					<InfiniteScroll
						pageStart={0}
						loadMore={handleGetNext}
						hasMore={
							!loadingNext &&
							!!pagination &&
							pagination?.totalPages > pagination?.currentPage
						}
						initialLoad={false}
					>
						<ActivityList />
					</InfiniteScroll>
				)}
			</GridColumn>
			<GridColumn width="6">
				<ActivityFilters />
			</GridColumn>
			<GridColumn width={10}>
				<Loader active={loadingNext} />
			</GridColumn>
		</Grid>
	);
};
export default observer(ActivityDashboard);
