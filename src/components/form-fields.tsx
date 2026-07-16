import { useId } from "react";

import { getErrorMessage } from "@/lib/utils";
import { useFieldContext, useFormContext } from "@/hooks/use-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input as InputControl } from "@/components/ui/input";

type FormInputProps = Omit<React.ComponentProps<typeof InputControl>, "name" | "value" | "onBlur" | "aria-invalid"> & {
	label: React.ReactNode;
};

export function FormInput({ label, onChange, ...props }: FormInputProps) {
	const form = useFormContext();
	const field = useFieldContext<string>();

	const fieldId = useId();
	const validationErrors = field.state.meta.errors.map((val) => ({ message: getErrorMessage(val) }));
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<Field data-invalid={isInvalid}>
			<FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
			<InputControl
				id={fieldId}
				name={field.name}
				value={field.state.value}
				onBlur={field.handleBlur}
				onChange={(event) => {
					form.setErrorMap({});
					field.handleChange(event.target.value);
					onChange?.(event);
				}}
				aria-invalid={isInvalid}
				{...props}
			/>
			<FieldError errors={validationErrors} />
		</Field>
	);
}
