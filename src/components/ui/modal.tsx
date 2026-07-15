import { Button, Modal as HeroModal } from "@heroui/react";

type ModalProps = React.ComponentProps<typeof HeroModal.Container> & {
	state: React.ComponentProps<typeof HeroModal>["state"];
	title: React.ReactNode;
	children: React.ReactNode;
	footer?: Array<React.ComponentProps<typeof Button>>;
	backdropProps?: React.ComponentProps<typeof HeroModal.Backdrop>;
	showCloseTrigger?: boolean;
};

export function Modal({ state, title, footer, backdropProps, showCloseTrigger = true, children, ...props }: ModalProps) {
	return (
		<HeroModal state={state}>
			<HeroModal.Backdrop {...backdropProps}>
				<HeroModal.Container size="md" {...props}>
					<HeroModal.Dialog>
						{showCloseTrigger && <HeroModal.CloseTrigger />}
						<HeroModal.Header>
							<HeroModal.Heading className="text-lg font-semibold">{title}</HeroModal.Heading>
						</HeroModal.Header>
						<HeroModal.Body>{children}</HeroModal.Body>
						<HeroModal.Footer>
							{footer?.map((props, index) => (
								<Button key={index} {...props} />
							))}
						</HeroModal.Footer>
					</HeroModal.Dialog>
				</HeroModal.Container>
			</HeroModal.Backdrop>
		</HeroModal>
	);
}
