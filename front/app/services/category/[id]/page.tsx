import { Container } from "@/components/sections/layout/container";
import { Section } from "@/components/sections/layout/section";
import { GetServicesByCategory } from "@/features/services/section/categoty/category";

export default function CategoryServices({ params }: { params: { id: string } }) {
    const id = parseInt(params.id, 10); // Convertir a número si es necesario

    return (
        <Container>
              <Section>
                <GetServicesByCategory
                  idcategory={id}
                  infoComponent={{ title: "Todos", description: "Los Servicios" }}
                  size={10}
                />
              </Section>
            </Container>
    );
}