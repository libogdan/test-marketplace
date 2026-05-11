import { SignUpForm } from "@/features/auth";
import { Container, Section } from "@/shared/ui";

export const Page = () => {
  return (
    <Container>
      <Section className="grid place-items-center min-h-[calc(100dvh-84px)]">
        <SignUpForm />
      </Section>
    </Container>
  );
};
