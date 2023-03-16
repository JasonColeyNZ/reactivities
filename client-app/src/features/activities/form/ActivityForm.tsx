import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import Loading from "../../../app/layout/Loading";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
	MyTextInput,
	MyTextArea,
	MySelectInput,
	MyDateInput,
} from "../../../app/common/form";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import { ActivityFormValues } from "../../../app/models/activity";

const ActivityForm = () => {
	const { activityStore } = useStore();
	const { createActivity, updateActivity, loadActivity, loadingInitial } =
		activityStore;
	const { id } = useParams();
	const navigate = useNavigate();

	const [activity, setActivity] = useState<ActivityFormValues>(
		new ActivityFormValues()
	);

	const validationSchema = Yup.object({
		category: Yup.string().required(),
		city: Yup.string().required(),
		date: Yup.string().required("Date is required").nullable(),
		description: Yup.string().required("The activity description is required"),
		title: Yup.string().required("The activity title is required"),
		venue: Yup.string().required(),
	});

	useEffect(() => {
		if (id)
			loadActivity(id).then((activity) =>
				setActivity(new ActivityFormValues(activity!))
			);
	}, [id, loadActivity]);

	function handleFormSubmit(activity: ActivityFormValues) {
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

	if (loadingInitial) return <Loading content="Loading activity..." />;

	return (
		<Segment clearing>
			<Header content="Activity Details" sub color="teal" />
			<Formik
				validationSchema={validationSchema}
				enableReinitialize
				initialValues={activity}
				onSubmit={(values) => handleFormSubmit(values)}
			>
				{({ handleSubmit, isValid, isSubmitting, dirty }) => (
					<Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
						<MyTextInput name="title" />
						<MyTextArea name="description" rows={3} />
						<MySelectInput options={categoryOptions} name="category" />
						<MyDateInput
							name="date"
							placeholderText="Date"
							showTimeSelect
							timeCaption="time"
							dateFormat="MMM d, yyyy h:mm aa"
						/>
						<Header content="Location Details" sub color="teal" />
						<MyTextInput name="city" />
						<MyTextInput name="venue" />
						<Button
							disabled={isSubmitting || !dirty || !isValid}
							loading={isSubmitting}
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
				)}
			</Formik>
		</Segment>
	);
};
export default observer(ActivityForm);
