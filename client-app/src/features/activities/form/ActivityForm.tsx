import { observer } from "mobx-react-lite";
import { ChangeEvent, useState } from "react";
import {
	Button,
	Form,
	FormInput,
	FormTextArea,
	Segment,
} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

const ActivityForm = () => {
	const { activityStore } = useStore();
	const {
		selectedActivity,
		closeForm,
		createActivity,
		updateActivity,
		loading,
	} = activityStore;

	const initialState = selectedActivity ?? {
		id: "",
		category: "",
		city: "",
		date: "",
		description: "",
		title: "",
		venue: "",
	};

	const [activity, setActivity] = useState(initialState);

	function handleSubmit() {
		activity.id ? updateActivity(activity) : createActivity(activity);
	}
	function handleInputChange(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const { name, value } = event.target;
		setActivity({ ...activity, [name]: value });
	}

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
					onClick={closeForm}
					floated="right"
					type="submit"
					content="Cancel"
				/>
			</Form>
		</Segment>
	);
};
export default observer(ActivityForm);
