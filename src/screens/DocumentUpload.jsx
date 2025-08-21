import React, { useState } from "react";
import StopPanel from "../components/PodUpload/StopPanel";
import { Mail } from "lucide-react";
import Header from "../components/Header";
import { initialStops } from "../data/seed";
import { useTranslation } from "react-i18next";

const DocumentUpload = () => {
  const [stops, setStops] = useState(initialStops);
  const {t} = useTranslation()
  return (
    <div className="relative min-h-screen max-w-[680px] mx-auto px-2 pb-24">
      <Header />
      <main className="space-y-4 mt-2">
        {stops.map((stop, i) => (
          <StopPanel
            key={i}
            stop={stop}
            onChange={(next) =>
              setStops((prev) => prev.map((s, idx) => (idx === i ? next : s)))
            }
          />
        ))}
      </main>
      <div className="fixed left-0 right-0 bottom-0 z-20 px-3 pb-3 bg-white/90 backdrop-blur max-w-[680px] mx-auto">
        <button
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition text-lg"
          onClick={() => {}}
        >
          <Mail className="w-6 h-6" />
          {t("send_mail")}
        </button>
      </div>
    </div>
  );
};

export default DocumentUpload;
