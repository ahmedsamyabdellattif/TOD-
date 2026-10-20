import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="section container">
      <span className="eyebrow">404</span>
      <h1>Page not found / الصفحة غير موجودة</h1>
      <Link className="button" href="/en">
        Home / الرئيسية
      </Link>
    </main>
  );
}
