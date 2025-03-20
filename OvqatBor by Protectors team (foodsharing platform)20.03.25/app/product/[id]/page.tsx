import ProductDetailScreen from "@/components/product-detail-screen"

export default function ProductDetail({
  params,
}: {
  params: { id: string }
}) {
  return <ProductDetailScreen id={params.id} />
}

