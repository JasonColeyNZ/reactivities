import { useField } from "formik";
import { FormField, Label } from "semantic-ui-react";

interface Props {
	placeholder?: string;
	name: string;
	label?: string;
	type?: string;
}

const MyTextInput = (props: Props) => {
	let _placeholder = props.placeholder;
	if (props && !_placeholder && props.name)
		_placeholder = props.name[0].toUpperCase() + props.name.substring(1);
	const [field, meta] = useField(props.name);
	return (
		<FormField error={meta.touched && !!meta.error}>
			<label>{props.label}</label>
			<input {...field} {...props} placeholder={_placeholder} />
			{meta.touched && meta.error ? (
				<Label basic color="red">
					{meta.error}
				</Label>
			) : null}
		</FormField>
	);
};
export default MyTextInput;
