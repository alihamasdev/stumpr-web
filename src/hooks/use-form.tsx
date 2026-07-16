import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import { FormInput } from "@/components/form-fields";

const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		Input: FormInput,
	},
	formComponents: {},
});

export { useAppForm as useForm, useFieldContext, useFormContext };
