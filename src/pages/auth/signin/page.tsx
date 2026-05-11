import { SignInForm } from "@/features/auth";
import { Container, Section } from "@/shared/ui";

export const Page = () => {
  return (
    <Container>
      <Section className="grid h-dvh place-items-center">
        <SignInForm />
      </Section>
    </Container>
  );
};
