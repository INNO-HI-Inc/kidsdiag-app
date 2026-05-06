export function generateStaticParams() {
  return [{ sessionId: "demo" }];
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
