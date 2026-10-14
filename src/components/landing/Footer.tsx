export function Footer() {
  return (
    <footer className="flex justify-between border-t border-line px-[var(--pad)] py-7 text-[13px] text-mute">
      <span>© {new Date().getFullYear()} Digital Twins</span>
      <span>Privacy · Delete my data</span>
    </footer>
  );
}
