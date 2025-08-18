// components/StopPanel/StopPanel.jsx
import { ChevronDown, ChevronLeft, ChevronUp } from "lucide-react";
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
    <section className="rounded-2xl shadow border border-gray-200 bg-white mb-5 overflow-hidden max-w-full">
      <div className="bg-gray-50 px-4 pt-4 pb-2 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Receiver name and phone */}
          <div>
            <div className="text-base font-bold text-gray-800">
              {local.receiverName}{" "}
              <span className="font-normal text-gray-700">| {local.phone}</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">{local.address}</div>
            <div className="text-xs text-gray-500">{local.time}</div>
          </div>
        </div>

        {/* Expand / Collapse toggle */}
        <button
          onClick={toggleExpand}
          aria-label={
            local.expanded ? "Collapse documents" : "Expand documents"
          }
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          {local.expanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
      </div>

      {/* Documents selection list, only if expanded */}
      {local.expanded && (
        <div className="flex items-center gap-2 px-4 py-2 border-t border-gray-200 bg-white">
          {/* All checkbox */}
          <label
            className={`flex items-center gap-1 px-2 py-1 rounded-lg cursor-pointer text-xs font-medium transition`}
          >
            <input
              type="checkbox"
              className="accent-green-500 w-4 h-4 cursor-pointer"
              checked={local.allSelected}
              onChange={(e) => toggleAll(e.target.checked)}
            />
            All
          </label>

          {/* Individual document checkboxes */}
          {local.docs.map((doc) => {
            const checked = local.selectedDocIds.has(doc.id);
            return (
              <label
                key={doc.id}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg cursor-pointer text-xs font-medium transition`}
              >
                <input
                  type="checkbox"
                  className="accent-green-500 w-4 h-4 cursor-pointer"
                  checked={checked}
                  onChange={(e) => toggleOne(doc.id, e.target.checked)}
                />
                {doc.id}
              </label>
            );
          })}
        </div>
      )}
      <div className="w-full bg-gray-100 border-b-1 p-1">
        <div className="mt-1 mx-4 flex justify-between text-md font-medium">
          <span className="font-bold">Documents</span>
          <span className="font-medium text-gray-600">
            {local.docs.length} items
          </span>
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
