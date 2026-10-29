import { createFileRoute } from '@tanstack/react-router';

const About = () => (
  <>
    <h1>Über uns</h1>
    <p>Wir vermieten Räume und Technik für Workshops.</p>
  </>
);

export const Route = createFileRoute('/about')({ component: About });
