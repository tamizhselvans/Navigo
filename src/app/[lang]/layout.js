import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Work_Sans } from "next/font/google";
import ToasterProvider from "@/components/providers/ToasterProvider";
import { redirect } from "next/navigation";
import Navbar from "@/components/Layout/Navbar";

import "@/app/styles/index.css";
import "@/app/styles/bootstrap.min.css";

const work_sans = Work_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Live Government Bus Tracking | GPS Public Transport Locator",
  description: "NaviGo to track the government buses using GPS tracking system.",
  keywords:
    "Government bus tracking, Real-time bus tracking, GPS bus tracker, Track government buses, Public transport tracker, Live bus location",
  openGraph: {
    title: "Live Government Bus Tracking | GPS Public Transport Locator",
    description: "NaviGo to track the government buses using GPS tracking system.",
    url: "https://navigo-govt.vercel.app/",
    siteName: "Navigo",
    images: [
      {
        url: "https://img-new.cgtrader.com/items/4583518/afefff03a6/large/tamil-nadu-government-bus-high-quality-3d-model-3d-model-afefff03a6.jpg", // Must be an absolute URL
        width: 800,
        height: 600,
        alt: "Navigo",
      },
      {
        url: "https://img-new.cgtrader.com/items/4583518/afefff03a6/large/tamil-nadu-government-bus-high-quality-3d-model-3d-model-afefff03a6.jpg", // Must be an absolute URL
        width: 800,
        height: 600,
        alt: "Navigo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({ children, params }) {
  const { lang } = await params;

  if (!routing.locales.includes(lang)) {
    redirect("/");
  }

  const messages = await getMessages({ locale: lang });

  return (
    <html lang={lang}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/2.6.0/uicons-solid-straight/css/uicons-solid-straight.css"
        />
        <link rel="icon" href="/globe.svg" />
      </head>
      <body className={work_sans.className}>
        <NextIntlClientProvider messages={messages}>
          <ToasterProvider />
          <Navbar />
          {children}
          {/* <Footer /> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
