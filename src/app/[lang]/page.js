// import Image from "next/image";
import { getTranslations } from "next-intl/server";
import BusSearchForm from "@/components/BusSearch/BusSearchForm";

export async function generateMetadata({ params }) {
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      languages: {
        en: `${process.env.NEXT_PUBLIC_BASE_URL}/en`,
        ta: `${process.env.NEXT_PUBLIC_BASE_URL}/ta`,
      },
    },
  };
}

export default async function Page({ params }) {
  const { lang } = await params;
  const t = await getTranslations("HomePage"); // Load translations dynamically

  return (
    <>
      <BusSearchForm lang={lang} />
    </>
  );
}
