import { useField } from "formik";
import { FormField, Label, Select } from "semantic-ui-react";

interface Props {
	placeholder?: string;
	name: string;
	options: any;
	label?: string;
}

const MySelectInput = (props: Props) => {
	let _placeholder = props.placeholder;
	if (props && !_placeholder && props.name)
		_placeholder = props.name[0].toUpperCase() + props.name.substring(1);
	const [field, meta, helpers] = useField(props.name);
	return (
		<FormField error={meta.touched && !!meta.error}>
			<label>{props.label}</label>
			<Select
				clearable
				options={props.options}
				value={field.value || null}
				placeholder={_placeholder}
				onChange={(e, d) => helpers.setValue(d.value)}
				onBlur={() => helpers.setTouched(true)}
			/>
			{meta.touched && meta.error ? (
				<Label basic color="red">
					{meta.error}
				</Label>
			) : null}
		</FormField>
	);
};
export default MySelectInput;
