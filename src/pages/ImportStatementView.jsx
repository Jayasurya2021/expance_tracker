import React, { useState } from 'react';
import { UploadCloud, FileSpreadsheet, Check, AlertCircle, Sparkles, ArrowRight, RefreshCw, FileText } from 'lucide-react';
import { statementImportDemo } from '../mockData';

export default function ImportStatementView({ onImportComplete }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewData, setPreviewData] = useState([]);
  const [importDone, setImportDone] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    setSelectedFile(file);
    setIsUploading(true);
    setUploadProgress(20);

    const timer = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsUploading(false);
          setPreviewData(statementImportDemo);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const handleCategoryChange = (id, newCategory) => {
    setPreviewData(previewData.map(item => 
      item.id === id ? { ...item, suggestedCategory: newCategory, confidence: 'User Verified' } : item
    ));
  };

  const handleConfirmImport = () => {
    setImportDone(true);
    if (onImportComplete) {
      onImportComplete(previewData);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-6 space-y-6">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Automated Parser</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Import Bank Statement
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Upload CSV or XLSX bank statements. AI will automatically classify merchants and prepare records.
          </p>
        </div>

        {previewData.length > 0 && !importDone && (
          <button
            onClick={handleConfirmImport}
            className="px-6 py-2.5 rounded-full bg-[#111111] hover:bg-neutral-800 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition cursor-pointer active:scale-95"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Confirm Import ({previewData.length} Items)</span>
          </button>
        )}
      </div>

      {/* Upload Drag & Drop Area */}
      {!previewData.length && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-[32px] p-8 sm:p-14 text-center transition-all bg-white ${
            dragActive 
              ? 'border-orange-500 bg-orange-50/50 scale-[0.99]' 
              : 'border-neutral-200 hover:border-neutral-300'
          }`}
        >
          <div className="w-16 h-16 rounded-3xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-4 shadow-xs">
            <UploadCloud className="w-8 h-8" />
          </div>

          <h3 className="text-lg font-bold text-neutral-900 mb-1">
            Drag and drop your bank statement here
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto mb-6">
            Supports HDFC, ICICI, SBI, Axis, Chase, Barclays .CSV and .XLSX statement exports.
          </p>

          <label className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111111] hover:bg-neutral-800 text-white text-xs sm:text-sm font-bold cursor-pointer transition shadow-md">
            <FileSpreadsheet className="w-4 h-4 text-orange-400" />
            <span>Select Statement File</span>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500" /> Client-side AI parser
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500" /> Duplicate protection
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500" /> Phase 2 API ready
            </span>
          </div>
        </div>
      )}

      {/* Progress Feedback */}
      {isUploading && (
        <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs max-w-lg mx-auto text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-orange-500 animate-spin mx-auto" />
          <h4 className="text-sm font-bold text-neutral-800">Parsing Statement with AI...</h4>
          <div className="w-full bg-neutral-100 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-orange-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-xs text-neutral-400">{uploadProgress}% classified</p>
        </div>
      )}

      {/* Success Notification Banner after import */}
      {importDone && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 text-center animate-in zoom-in-95">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-2">
            <Check className="w-6 h-6 stroke-[3]" />
          </div>
          <h3 className="text-lg font-bold text-emerald-900">Successfully Imported {previewData.length} Transactions!</h3>
          <p className="text-xs text-emerald-700 mt-1">
            Categorized by Spendly AI engine. Visible in Dashboard and Transactions pages.
          </p>
          <button
            onClick={() => {
              setPreviewData([]);
              setImportDone(false);
              setSelectedFile(null);
            }}
            className="mt-4 px-4 py-2 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold cursor-pointer"
          >
            Import Another Statement
          </button>
        </div>
      )}

      {/* Preview Table */}
      {previewData.length > 0 && !importDone && (
        <div className="bg-white rounded-[28px] border border-neutral-200/80 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 text-base">{selectedFile?.name || "HDFC_Statement_Apr2026.csv"}</h3>
                <span className="text-xs text-neutral-400">Previewing extracted entries — click any category to adjust</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full font-semibold">
                6 Detected
              </span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-semibold">
                0 Duplicates
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50/70 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Date</th>
                  <th className="py-3.5 px-4">Raw Merchant Description</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-6">AI Suggested Category</th>
                  <th className="py-3.5 px-4">AI Confidence</th>
                  <th className="py-3.5 px-6 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-xs sm:text-sm">
                {previewData.map((row) => (
                  <tr key={row.id} className="hover:bg-neutral-50/70 transition">
                    <td className="py-3.5 px-6 font-medium text-neutral-500 whitespace-nowrap">
                      {row.date}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-neutral-900 whitespace-nowrap">
                      {row.description}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${
                        row.type === 'Debit' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-700'
                      }`}>
                        {row.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-6">
                      <select
                        value={row.suggestedCategory}
                        onChange={(e) => handleCategoryChange(row.id, e.target.value)}
                        className="px-3 py-1.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-bold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
                      >
                        <option value="Food & Dining">Food & Dining</option>
                        <option value="Transport">Transport</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Subscriptions">Subscriptions</option>
                        <option value="Salary">Salary</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200/50">
                        <Sparkles className="w-3 h-3" />
                        {row.confidence}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right font-extrabold whitespace-nowrap">
                      <span className={row.type === 'Debit' ? 'text-rose-600' : 'text-emerald-600'}>
                        {row.type === 'Debit' ? `-$${row.amount.toFixed(2)}` : `+$${row.amount.toFixed(2)}`}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-neutral-50/80 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
            <span>All entries can be edited prior to final confirmation</span>
            <button
              onClick={handleConfirmImport}
              className="px-6 py-2.5 rounded-full bg-[#111111] hover:bg-neutral-800 text-white font-bold transition shadow-xs cursor-pointer flex items-center gap-2"
            >
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Confirm & Append to Dashboard</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
