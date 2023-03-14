import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
	Button,
	Form,
	FormInput,
	FormTextArea,
	Segment,
} from "semantic-ui-react";
import Loading from "../../../app/layout/Loading";
import { Activity } from "../../../app/models";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";

const ActivityForm = () => {
	const { activityStore } = useStore();
	const {
		createActivity,
		updateActivity,
		loading,
		loadActivity,
		loadingInitial,
	} = activityStore;
	const { id } = useParams();
	const navigate = useNavigate();

	const [activity, setActivity] = useState<Activity>({
		id: "",
		category: "",
		city: "",
		date: "",
		description: "",
		title: "",
		venue: "",
	});

	useEffect(() => {
		if (id) loadActivity(id).then((activity) => setActivity(activity!));
	}, [id, loadActivity]);

	function handleSubmit() {
		if (!activity.id) {
			activity.id = uuid();
			createActivity(activity).then(() => {
				navigate(`/activities/${activity.id}`);
			});
		} else {
			updateActivity(activity).then(() => {
				navigate(`/activities/${activity.id}`);
			});
		}
	}

	function handleInputChange(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const { name, value } = event.target;
		setActivity({ ...activity, [name]: value });
	}

	if (loadingInitial) return <Loading content="Loading activity..." />;

	return (
		<Segment clearing>
			<Form onSubmit={handleSubmit} autoComplete="off">
				<FormInput
					placeholder="Title"
					name="title"
					value={activity.title}
					onChange={handleInputChange}
				/>
				<FormTextArea
					placeholder="Description"
					name="description"
					value={activity.description}
					onChange={handleInputChange}
				/>
				<FormInput
					placeholder="Category"
					name="category"
					value={activity.category}
					onChange={handleInputChange}
				/>
				<FormInput
					placeholder="Date"
					type="date"
					name="date"
					value={activity.date}
					onChange={handleInputChange}
				/>
				<FormInput
					placeholder="City"
					name="city"
					value={activity.city}
					onChange={handleInputChange}
				/>
				<FormInput
					placeholder="Venue"
					name="venue"
					value={activity.venue}
					onChange={handleInputChange}
				/>
				<Button
					loading={loading}
					floated="right"
					positive
					type="submit"
					content="Submit"
				/>
				<Button
					floated="right"
					type="submit"
					content="Cancel"
					as={Link}
					to="/activities"
				/>
			</Form>
		</Segment>
	);
};
export default observer(ActivityForm);
