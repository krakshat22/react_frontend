// components/StopPanel/StopPanel.jsx
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import DocForm from "./DocForm";

const StopPanel = ({ stop, onChange }) => {
  const [local, setLocal] = useState(stop);
  const sync = (draft) => {
    setLocal(draft);
    onChange(JSON.parse(JSON.stringify(draft)));
  };

  const toggleExpand = () => sync({ ...local, expanded: !local.expanded });
  const toggleAll = (checked) => {
    const allIds = new Set(checked ? local.docs.map((d) => d.id) : []);
    sync({ ...local, allSelected: checked, selectedDocIds: allIds });
  };
  const toggleOne = (id, checked) => {
    const set = new Set(local.selectedDocIds);
    checked ? set.add(id) : set.delete(id);
    sync({
      ...local,
      selectedDocIds: set,
      allSelected: set.size === local.docs.length,
    });
  };
  const patchDoc = (idx, patch) => {
    const docs = [...local.docs];
    docs[idx] = { ...docs[idx], ...patch };
    sync({ ...local, docs });
  };

  return (
    <section className="rounded-xl shadow border bg-white mb-4 overflow-hidden">
      {/* Header Row */}
      <div className="flex items-center justify-between p-3">
        <div>
          <span className="text-[15px] font-semibold">
            {local.receiverName}
          </span>
          <span className="text-gray-500"> | {local.phone}</span>
        </div>
        <button
          onClick={toggleExpand}
          className="focus:outline-none text-gray-600"
        >
          {local.expanded ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      {/* Stop Meta Info */}
      <div className="border-t border-gray-200 px-3 pb-3">
        <div className="text-sm text-gray-500">{local.address}</div>
        <div className="text-sm text-gray-500">{local.time}</div>
        {/* Chips Section */}
        <div className="flex flex-wrap gap-2 mt-2">
          <label
            className={`px-2 py-1 rounded-full border text-sm cursor-pointer transition 
            ${
              local.allSelected
                ? "bg-blue-100 border-blue-400 text-blue-700 font-bold"
                : "bg-gray-100 border-gray-300 text-gray-700"
            }
          `}
          >
            <input
              type="checkbox"
              checked={local.allSelected}
              onChange={(e) => toggleAll(e.target.checked)}
              className="hidden"
            />
            All
          </label>
          {local.docs.map((d) => (
            <label
              key={d.id}
              className={`px-2 py-1 rounded-full border text-sm cursor-pointer transition
              ${
                local.selectedDocIds.has(d.id)
                  ? "bg-blue-100 border-blue-400 text-blue-700 font-bold"
                  : "bg-gray-100 border-gray-300 text-gray-700"
              }
            `}
            >
              <input
                type="checkbox"
                checked={local.selectedDocIds.has(d.id)}
                onChange={(e) => toggleOne(d.id, e.target.checked)}
                className="hidden"
              />
              {d.id}
            </label>
          ))}
        </div>
      </div>

      {/* Expanded Doc Forms */}
      {local.expanded && (
        <div className="border-t border-gray-200 p-3">
          {local.docs.map((doc, i) => (
            <DocForm
              key={doc.id}
              doc={doc}
              onChange={(next) => patchDoc(i, next)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default StopPanel;
