import { Formik, Form } from "formik";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import { Button } from "semantic-ui-react";
import { MyTextArea, MyTextInput } from "../../app/common/form";

interface Props {
	setEditMode: (editMode: boolean) => void;
}

const ProfileEditForm = ({ setEditMode }: Props) => {
	const {
		profileStore: { profile, updateProfile },
	} = useStore();
	return (
		<Formik
			initialValues={{
				displayName: profile?.displayName,
				bio: profile?.bio ? profile?.bio : "",
			}}
			onSubmit={(values) => {
				updateProfile(values).then(() => setEditMode(false));
			}}
			validationSchema={Yup.object({ displayName: Yup.string().required() })}
		>
			{({ isSubmitting, isValid, dirty }) => (
				<Form className="ui form">
					<MyTextInput placeholder="Display Name" name="displayName" />
					<MyTextArea rows={3} placeholder="Add your bio" name="bio" />
					<Button
						positive
						type="submit"
						loading={isSubmitting}
						content="Update profile"
						floated="right"
						disabled={!isValid || !dirty}
					/>
				</Form>
			)}
		</Formik>
	);
};
export default ProfileEditForm;
