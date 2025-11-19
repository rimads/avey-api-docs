import { cn } from "@/lib/cn";
import { AlertTriangle, ShieldAlert, Database, FileText, BookOpen, Users, FileEdit } from "lucide-react";

interface ViolationProps {
  code: string;
  title: string;
  level: "critical" | "warning";
  children: React.ReactNode;
}

export function Violation({ code, title, level, children }: ViolationProps) {
  const isCritical = level === "critical";
  const borderColor = isCritical ? "border-red-200 dark:border-red-900/50" : "border-amber-200 dark:border-amber-900/50";
  const bgColor = isCritical ? "bg-red-50/50 dark:bg-red-950/10" : "bg-amber-50/50 dark:bg-amber-950/10";
  const textColor = isCritical ? "text-red-900 dark:text-red-200" : "text-amber-900 dark:text-amber-200";
  const codeBg = isCritical ? "bg-red-100 dark:bg-red-900/30" : "bg-amber-100 dark:bg-amber-900/30";
  const codeText = isCritical ? "text-red-700 dark:text-red-300" : "text-amber-700 dark:text-amber-300";

  return (
    <div className={cn("rounded-lg border my-6 overflow-hidden", borderColor, bgColor)}>
      <div className={cn("px-4 py-3 border-b flex items-center gap-3", borderColor, "bg-white/50 dark:bg-white/5")}>
        <span className={cn("text-xs font-mono font-bold px-2 py-1 rounded", codeBg, codeText)}>
          {code}
        </span>
        <h3 className={cn("text-base font-semibold m-0", textColor)}>
          {title}
        </h3>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

export function SeverityGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
      <div className="rounded-xl border bg-gradient-to-b from-red-50 to-white dark:from-red-950/20 dark:to-transparent border-red-100 dark:border-red-900/30 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 m-0">Critical</h3>
            <p className="text-xs text-red-600 dark:text-red-400 font-medium m-0">Denial Risk: High</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Fundamental errors that will cause claim rejection. These require clinical review.
          </div>
          
          <div className="bg-white dark:bg-neutral-900 rounded-lg border border-red-100 dark:border-red-900/30 p-3">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Target Audience</p>
            <div className="flex gap-2 flex-wrap">
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 border border-red-100 dark:border-red-900/30">
                Physicians
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 border border-red-100 dark:border-red-900/30">
                Medical Directors
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 border border-red-100 dark:border-red-900/30">
                Medical Coders
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-gradient-to-b from-amber-50 to-white dark:from-amber-950/20 dark:to-transparent border-amber-100 dark:border-amber-900/30 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 m-0">Warning</h3>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-medium m-0">Compliance Alert</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Potential issues that may be valid with proper documentation or modifiers.
          </div>
          
          <div className="bg-white dark:bg-neutral-900 rounded-lg border border-amber-100 dark:border-amber-900/30 p-3">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Target Audience</p>
            <div className="flex gap-2 flex-wrap">
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-100 dark:border-amber-900/30">
                Medical Coders
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-100 dark:border-amber-900/30">
                Billers
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DataSourceGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
       <div className="rounded-lg border border-blue-100 dark:border-blue-900/30 bg-blue-50/30 dark:bg-blue-900/10 p-4 flex flex-col gap-3">
          <div className="p-2 w-fit rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 m-0 mb-1">CMS NCCI</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400 m-0 leading-relaxed">
              The gold standard for bundling edits (PTP) and frequency limits (MUE).
            </p>
          </div>
       </div>

       <div className="rounded-lg border border-purple-100 dark:border-purple-900/30 bg-purple-50/30 dark:bg-purple-900/10 p-4 flex flex-col gap-3">
          <div className="p-2 w-fit rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 m-0 mb-1">ICD-10 & CPT</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400 m-0 leading-relaxed">
               Official coding manuals, guidelines, and relationship mappings.
            </p>
          </div>
       </div>

       <div className="rounded-lg border border-teal-100 dark:border-teal-900/30 bg-teal-50/30 dark:bg-teal-900/10 p-4 flex flex-col gap-3">
          <div className="p-2 w-fit rounded-lg bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 m-0 mb-1">Clinical Policy</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400 m-0 leading-relaxed">
               Rules derived from standard medical policies (LCD/NCD) and literature.
            </p>
          </div>
       </div>
    </div>
  )
}

export function Roadmap() {
  return (
    <div className="mt-12 pt-6 border-t border-dashed border-neutral-200 dark:border-neutral-800">
      <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
        Coming Soon
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
        <div className="flex items-baseline gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700 translate-y-0.5" />
          <p className="text-sm text-neutral-600 dark:text-neutral-400 m-0">
            <strong className="text-neutral-900 dark:text-neutral-200 font-medium">Patient Demographics:</strong> Age and sex validation.
          </p>
        </div>
        <div className="flex items-baseline gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700 translate-y-0.5" />
          <p className="text-sm text-neutral-600 dark:text-neutral-400 m-0">
            <strong className="text-neutral-900 dark:text-neutral-200 font-medium">Modifiers Support:</strong> Auto-resolution for PTP1.
          </p>
        </div>
      </div>
    </div>
  );
}
