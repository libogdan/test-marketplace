import { SignInForm } from "@/features/auth";
import { Container, Section } from "@/shared/ui";

export const Page = () => {
  return (
    <Container>
      <Section className="grid h-[calc(100dvh-84px)] place-items-center">
        <SignInForm />
      </Section>
    </Container>
  );
};
