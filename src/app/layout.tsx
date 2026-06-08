import type { Metadata } from "next";
import { Noto_Sans_Lao, Inter } from "next/font/google";
import "./globals.css";

const notoLao = Noto_Sans_Lao({
  variable: "--font-noto-lao",
  subsets: ["lao"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ໂຄງການຄຸ້ມຄອງເຂດຊົດເຊີຍຊີວະນາໆພັນ ນ້ຳຈວນ-ນ້ຳຊັ່ງ",
  description: "ເຂດຊົດເຊີຍຊີວະນາໆພັນ (Biodiversity Offset Site) ຂອງໂຄງການໄຟຟ້ານ້ຳງຽບ 1 ພາຍໃຕ້ການຄຸ້ມຄອງຂອງພាកລັດ ແລະ ການຮ່ວມມືຈາກພាកສ່ວນກ່ຽວຂ້ອງ.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="lo"
      className={`${notoLao.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
