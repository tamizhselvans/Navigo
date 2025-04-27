import AboutPage from "./AboutPage";
export async function generateMetadata({ params }) {
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/about`),
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      languages: {
        en: `${process.env.NEXT_PUBLIC_BASE_URL}/en/about`,
        ta: `${process.env.NEXT_PUBLIC_BASE_URL}/ta/about`,
      },
    },
  };
}

export default function Page() {
  return <AboutPage />;
}
