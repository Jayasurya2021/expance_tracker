import React, { useState } from 'react';
import { X, FileText, Download, Check, Sparkles, Calendar, Filter } from 'lucide-react';

export default function CreateReportModal({ isOpen, onClose }) {
  const [reportType, setReportType] = useState('monthly');
  const [format, setFormat] = useState('pdf');
  const [includeAIInsights, setIncludeAIInsights] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setDownloadSuccess(true);
      setTimeout(() => {
        setDownloadSuccess(false);
        onClose();
      }, 1400);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-lg rounded-[32px] p-6 sm:p-8 shadow-2xl border border-neutral-150 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-3">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-neutral-900 tracking-tight">
            Create Financial Report
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            Generate an executive spending breakdown and tax-ready export.
          </p>
        </div>

        {downloadSuccess ? (
          <div className="py-10 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h4 className="text-lg font-bold text-neutral-900">Report Generated!</h4>
            <p className="text-xs text-neutral-500 mt-1">Downloading Spendly_Financial_Report.pdf</p>
          </div>
        ) : (
          <div className="space-y-4">
            
            {/* Period Selection */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-2">
                Report Period
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'monthly', label: 'April 2026' },
                  { id: 'quarterly', label: 'Q1 2026' },
                  { id: 'annual', label: 'Full Year' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setReportType(item.id)}
                    className={`py-2 px-3 rounded-2xl text-xs font-bold border transition cursor-pointer ${
                      reportType === item.id
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Export Format */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-2">
                Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormat('pdf')}
                  className={`py-2.5 rounded-2xl text-xs font-bold border transition cursor-pointer flex items-center justify-center gap-2 ${
                    format === 'pdf'
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <FileText className="w-4 h-4" /> PDF Document
                </button>
                <button
                  type="button"
                  onClick={() => setFormat('csv')}
                  className={`py-2.5 rounded-2xl text-xs font-bold border transition cursor-pointer flex items-center justify-center gap-2 ${
                    format === 'csv'
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <Download className="w-4 h-4" /> CSV Spreadsheet
                </button>
              </div>
            </div>

            {/* AI Insights Checkbox */}
            <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-800">Include AI Spending Insights</p>
                  <p className="text-[11px] text-neutral-500">Anomaly flags and automated budget recommendations</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={includeAIInsights}
                onChange={(e) => setIncludeAIInsights(e.target.checked)}
                className="w-4 h-4 accent-orange-600 rounded cursor-pointer"
              />
            </div>

            {/* Generate Action Button */}
            <div className="pt-2">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-[#111111] hover:bg-neutral-800 text-white font-bold py-3.5 rounded-2xl text-sm transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Preparing Report...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Report ({format.toUpperCase()})</span>
                  </>
                )}
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
