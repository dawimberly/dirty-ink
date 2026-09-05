import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicShell } from "@/components/site/public-shell";
import { ProductDetail } from "@/components/shop/product-detail";
import { getProduct, PRODUCTS } from "@/lib/products";
import { SITE_NAME } from "@/lib/site";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: `Shop — ${SITE_NAME}` };
  return {
    title: `${product.name} — ${SITE_NAME}`,
    description: product.blurb,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <PublicShell wide>
      <nav className="mb-6 text-sm text-[#f2ebe0]/50">
        <Link href="/shop" className="hover:text-[#f2ebe0]/80">
          ← Back to shop
        </Link>
      </nav>
      <ProductDetail product={product} />
    </PublicShell>
  );
}
