import { createFileRoute } from '@tanstack/react-router';

const Home = () => <h1>Start</h1>;

export const Route = createFileRoute('/')({ component: Home });
