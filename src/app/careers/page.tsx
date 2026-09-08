"use client";

import React, { useState } from "react";
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { jobPositions } from "@/data/jobs";
import { JobPosition } from "@/types";

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [applied, setApplied] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplied(true);
    setTimeout(() => {
      setApplied(false);
      setSelectedJob(null);
    }, 3000);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-[#FFFDF8] rounded-3xl p-8 sm:p-14 border border-[#EDE4D5] text-center max-w-4xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#064B35] bg-[#EAF4D5] px-3.5 py-1 rounded-full">
          We&apos;re Hiring
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] mt-3 mb-3">
          Build the Future of Mindful Retail
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
          Join a multidisciplinary team of designers, engineers, and supply chain craftspeople passionate about sustainable lifestyle products and world-class digital commerce.
        </p>
      </div>

      {/* Open Positions */}
      <div>
        <h2 className="text-2xl font-bold text-[#111111] mb-6">
          Open Positions ({jobPositions.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobPositions.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs flex flex-col justify-between hover:border-[#064B35] transition-all hover:shadow-cardHover"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-[#F3F8E8] text-[#064B35] text-[11px] font-bold rounded-md">
                    {job.department}
                  </span>
                  <span className="text-[11px] text-gray-500 font-medium">
                    {job.experience}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#111111] leading-tight">
                  {job.title}
                </h3>

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{job.type}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed pt-1">
                  {job.description}
                </p>
              </div>

              <div className="pt-5 border-t border-gray-100 mt-4 flex items-center justify-between">
                <button
                  onClick={() => setSelectedJob(job)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#064B35] hover:text-[#0B6B47] hover:underline"
                >
                  <span>View Details &amp; Apply</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-gray-100 animate-in zoom-in-95">
            {applied ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#EAF4D5] text-[#064B35] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-[#78B82A]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Application Submitted!</h3>
                <p className="text-xs text-gray-600">
                  Thank you for applying to the <strong>{selectedJob.title}</strong> role. Our hiring team will review your credentials and contact you within 5 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <div className="flex items-start justify-between pb-3 border-b border-gray-100">
                  <div>
                    <span className="text-xs font-bold text-[#064B35]">{selectedJob.department}</span>
                    <h3 className="text-xl font-bold text-gray-900">{selectedJob.title}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="text-gray-400 hover:text-gray-700 font-bold text-lg p-1"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                    <input type="text" required placeholder="Jane Doe" className="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#064B35]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email</label>
                    <input type="email" required placeholder="jane@example.com" className="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#064B35]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">LinkedIn / Portfolio URL</label>
                    <input type="url" required placeholder="https://linkedin.com/in/..." className="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#064B35]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Note or Cover Letter</label>
                    <textarea rows={3} placeholder="Tell us why you'd be a great fit..." className="w-full text-xs p-3 border border-gray-200 rounded-lg outline-none focus:border-[#064B35]" />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="px-4 py-2 border border-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#064B35] hover:bg-[#0B6B47] text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
