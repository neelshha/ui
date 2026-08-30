export default function HomePage() {
  return (
    <main className="stack">
      <h1>Interface components. Yours once you add them.</h1>
      <p>
        A small library with a CLI. It copies source into your React or Next
        app. No Tailwind. No Radix. No shadcn.
      </p>
      <pre>
        <code>{`npx @neelshha/ui@latest init
npx @neelshha/ui@latest add field`}</code>
      </pre>
      <p>
        <a href="/field">Field</a> is the first component. The writing lives on{" "}
        <a href="https://www.neelshha.com/experiments/field">
          neelshha.com/experiments/field
        </a>
        .
      </p>
    </main>
  );
}
