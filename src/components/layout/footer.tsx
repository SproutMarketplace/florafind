export default function Footer() {
  return (
    <footer className="border-t bg-background/95">
      <div className="container flex h-14 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} FloraFind. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
