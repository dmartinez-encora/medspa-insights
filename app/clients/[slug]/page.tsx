import { ClientView } from "@/views/clientView";
import { getCompletion } from "@/actions/getCompletion";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <ClientView clientId={Number(params.slug)} getCompletion={getCompletion} />
  );
}
