import { notFound } from "next/navigation";
import playItems from "../playItemsData";
import PlayDetailClient from "./PlayDetailClient";

interface Props {
  params: Promise<{ id: string; locale: string }>;
}

export default async function PlayDetailPage({ params }: Props) {
  const { id } = await params;
  const item = playItems.find((i) => i.id === Number(id));

  if (!item) {
    notFound();
  }

  return <PlayDetailClient item={item} />;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const item = playItems.find((i) => i.id === Number(id));

  return {
    title: item?.title ?? "Play",
  };
}

export function generateStaticParams() {
  return playItems.map((item) => ({
    id: String(item.id),
  }));
}
