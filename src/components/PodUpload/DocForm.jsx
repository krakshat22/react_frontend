// components/StopPanel/DocForm.jsx
import React from "react";
import { Camera, UploadCloud, X } from "lucide-react";
import FilePicker from "./FilePicker";
import Button from "../common/Button";
import { useTranslation } from "react-i18next";

const DocForm = ({ doc, onChange, onUpload }) => {

  const { t } = useTranslation();

  const addScannedFiles = (fileList) => {
    const newFiles = Array.from(fileList);
    const newPreviews = newFiles.map((f) => URL.createObjectURL(f));
    onChange({
      ...doc,
      files: [...doc.files, ...newFiles],
      previews: [...doc.previews, ...newPreviews],
    });
  };

  const deleteAt = (i) => {
    const next = { ...doc };
    URL.revokeObjectURL(next.previews[i]);
    next.files.splice(i, 1);
    next.previews.splice(i, 1);
    onChange(next);
  };

  return (
    <div className="rounded-xl shadow-sm border bg-white p-4 mb-3">
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {t("document_id")} {doc.id}
      </label>
      <input
        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 text-base focus:outline-none focus:ring focus:border-blue-400 transition"
        value={doc.id}
        inputMode="numeric"
        onChange={(e) => onChange({ ...doc, id: e.target.value })}
      />
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {t("status")}
      </label>
      <select
        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 text-base focus:outline-none focus:ring focus:border-blue-400 transition"
        value={doc.status}
        onChange={(e) => onChange({ ...doc, status: e.target.value })}
      >
        <option>Delivered</option>
        <option>Pending</option>
        <option>Shop Closed</option>
      </select>
      <label className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          checked={doc.attachToInvoice}
          onChange={(e) =>
            onChange({ ...doc, attachToInvoice: e.target.checked })
          }
          className="h-4 w-4 accent-blue-600"
        />
        <span className="text-sm text-gray-700 font-medium">
          {t("attach_to_invoice")}
        </span>
      </label>

      {/* Remarks */}
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {t("remarks")}
      </label>
      <textarea
        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 text-base focus:outline-none focus:ring focus:border-blue-400 transition"
        placeholder="Add remarks"
        value={doc.remarks}
        onChange={(e) => onChange({ ...doc, remarks: e.target.value })}
        rows={2}
      />

      {/* Scan Document Button */}
      <div className="mb-2">
        <FilePicker
          label={
            <span className="flex items-center gap-2 font-medium">
              <Camera className="w-5 h-5" />
              {t("scan_document")}
            </span>
          }
          onFiles={addScannedFiles}
          variant="outline"
          capture="environment"
        />
      </div>

      {/* Scanned Documents Preview */}
      <div className="mb-2">
        {doc.previews.length === 0 ? (
          <div className="text-gray-400 text-sm">{t("no_documents")}</div>
        ) : (
          <>
            <div className="text-xs text-gray-500 mb-1">{t("scanned_documents")}</div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {doc.previews.map((src, i) => (
                <div
                  className="relative w-20 h-20 rounded-lg shadow border flex-shrink-0"
                  key={i}
                >
                  <img
                    src={src}
                    alt={`Doc ${doc.id} ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center"
                    onClick={() => deleteAt(i)}
                    aria-label="Delete"
                  >
                    <X />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Upload Documents Button */}
      <Button
        icon={<UploadCloud className="w-5 h-5" />}
        content={t("upload_documents")}
        bgColor="bg-blue-500"
        onClick={()=> onUpload && onUpload(doc)}
      />
    </div>
  );
};

export default DocForm;
