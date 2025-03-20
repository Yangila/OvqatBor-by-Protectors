import ConfirmationScreen from "@/components/confirmation-screen"

export default function Confirmation({
  params,
}: {
  params: { id: string }
}) {
  return <ConfirmationScreen id={params.id} />
}

