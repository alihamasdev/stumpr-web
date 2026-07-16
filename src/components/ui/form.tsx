type FormProps = React.ComponentProps<"form"> & {
	id: string;
};

export function Form({ id, onSubmit, ...props }: FormProps) {
	return (
		<form
			id={id}
			onSubmit={(e) => {
				e.preventDefault();
				onSubmit?.(e);
			}}
			{...props}
		/>
	);
}
