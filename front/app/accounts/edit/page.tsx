import { Container } from "@/components/sections/layout/container";
import { Section } from "@/components/sections/layout/section";
import { TitleSection } from "@/components/utils/titleSection";
import FormEditUser from "@/features/auth/components/formEditUser";

export default function EditAccountPage() {
  return (
    <Container>
     <Section>
     <TitleSection title="Mi Cuenta" description="Editar Datos" />
     <FormEditUser />
      </Section> 
    </Container>
  );
}