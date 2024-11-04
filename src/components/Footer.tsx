export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="py-6 px-8 bg-dark-primary">
      <p className="font-inter font-normal text-[0.875rem] leading-normal text-white">Copyright © {year} | UNIMAR - Universidade de Marília.</p>
    </footer>
  );
}
