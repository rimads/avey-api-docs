import { cn } from "@/lib/cn";
import {
  AlertTriangle,
  ShieldAlert,
  Database,
  FileText,
  BookOpen,
} from "lucide-react";

interface ViolationProps {
  code: string;
  title: string;
  level: "critical" | "warning";
  children: React.ReactNode;
}

export function Violation({ code, title, level, children }: ViolationProps) {
  const isCritical = level === "critical";
  const borderColor = isCritical
    ? "border-av-red500/10 dark:border-av-red600/10"
    : "border-av-yellow500/10 dark:border-av-yellow600/10";
  const bgColor = isCritical
    ? "bg-av-red100/50 dark:bg-av-red600/5"
    : "bg-av-yellow100/50 dark:bg-av-yellow600/3";
  const textColor = isCritical
    ? "text-av-gray900 dark:text-av-gray200"
    : "text-av-gray900 dark:text-av-gray200";
  const codeBg = isCritical
    ? "bg-av-red100 dark:bg-av-red600/30"
    : "bg-av-yellow100 dark:bg-av-yellow600/30";
  const codeText = isCritical
    ? "text-av-red600 dark:text-av-red500"
    : "text-av-yellow600 dark:text-av-yellow500";

  return (
    <div
      className={cn(
        "rounded-lg border my-6 overflow-hidden",
        borderColor,
        bgColor
      )}
    >
      <div
        className={cn(
          "px-4 py-5 border-b flex items-center gap-3",
          borderColor,
          "bg-av-white/50 dark:bg-av-white/5"
        )}
      >
        <span
          className={cn(
            "text-xs font-mono font-bold px-2 py- rounded",
            codeBg,
            codeText
          )}
        >
          {code}
        </span>
        <h3 className={cn("text-base font-semibold mt-0 mb-0", textColor)}>
          {title}
        </h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export function SeverityGrid({
  showAudience = true,
}: {
  showAudience?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 ">
      <div className="rounded-xl border bg-gradient-to-b from-av-red100 to-av-white dark:from-av-red600/5 dark:to-av-red600/5 border-av-red500/10 dark:border-av-red600/10 p-6 shadow-sm ">
        <div className="flex items-center   gap-3 mb-4">
          <div className="p-2 rounded-full bg-av-red100 dark:bg-av-red600/50 text-av-red600 dark:text-av-red500">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-av-gray900 dark:text-av-gray100 mt-0 mb-0">
            Critical
            </h3>
            <p className="text-xs text-av-red600 dark:text-av-red500 font-medium mt-0 mb-0">
              Denial Risk: High
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-av-gray600 dark:text-av-gray300">
            Fundamental errors that will cause claim rejection. These require
            clinical review.
          </div>

          {showAudience && (
            <div className="flex flex-col gap-1 pt-4">
              <p className="text-sm font-semibold text-av-gray600 dark:text-av-gray400 mt-0">
                Target audience:
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-av-red600/80 text-av-red100 dark:bg-av-red600/30 dark:text-av-red500 border border-none dark:border-av-red600/30">
                  Physicians
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-av-red600/80 text-av-red100 dark:bg-av-red600/30 dark:text-av-red500 border border-none dark:border-av-red600/30">
                  Medical Directors
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-av-red600/80 text-av-red100 dark:bg-av-red600/30 dark:text-av-red500 border border-none dark:border-av-red600/30">
                  Medical Coders
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl border bg-gradient-to-b from-av-yellow100 to-av-white dark:from-av-yellow600/5 dark:to-av-yellow600/5 border-av-yellow500/10 dark:border-av-yellow600/10 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-av-yellow100 dark:bg-av-yellow600/50 text-av-yellow600 dark:text-av-yellow500">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-av-gray900 dark:text-av-gray100 mt-0 mb-0">
              Warning
            </h3>
            <p className="text-xs text-av-yellow600 dark:text-av-yellow500 font-medium mt-0 mb-0">
              Compliance Alert
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-av-gray600 dark:text-av-gray300">
            Potential issues that may be valid with proper documentation or
            modifiers.
          </div>

          {showAudience && (
            <div className="flex flex-col gap-1 pt-4">
              <p className="text-sm font-semibold text-av-gray600 dark:text-av-gray400 mt-0">
                Target audience:
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-av-yellow600/80 text-av-yellow100 dark:bg-av-yellow600/30 dark:text-av-yellow500 border border-none dark:border-av-yellow600/30">
                  Medical Coders
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-av-yellow600/80 text-av-yellow100 dark:bg-av-yellow600/30 dark:text-av-yellow500 border border-none dark:border-av-yellow600/30">
                  Billers
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function DataSourceGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
      <div className="rounded-lg border border-av-blue500/30 dark:border-av-blue900/30 bg-av-blue100/30 dark:bg-av-blue900/10 p-4 flex flex-col gap-3">
        <div className="p-2 w-fit rounded-lg bg-av-blue500/80 dark:bg-av-blue900/40 text-av-blue100/90 dark:text-av-blue600">
          <Database className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-sm text-av-gray900 dark:text-av-gray100 m-0 mb-1">
            CMS NCCI
          </h4>
          <p className="text-xs text-av-gray600 dark:text-av-gray400 m-0 leading-relaxed">
            The gold standard for bundling edits (PTP) and frequency limits
            (MUE).
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-av-gray300 dark:border-av-gray600/30 bg-av-gray100/30 dark:bg-av-gray900/10 p-4 flex flex-col gap-3">
        <div className="p-2 w-fit rounded-lg bg-av-gray300 dark:bg-av-gray600/40 text-av-gray900 dark:text-av-gray300">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-sm text-av-gray900 dark:text-av-gray100 m-0 mb-1">
            ICD-10-CM & CPT
          </h4>
          <p className="text-xs text-av-gray600 dark:text-av-gray400 m-0 leading-relaxed">
            Official coding manuals, guidelines, and relationship mappings.
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-av-blue500/30 dark:border-av-blue900/30 bg-av-blue100/30 dark:bg-av-blue900/10 p-4 flex flex-col gap-3">
        <div className="p-2 w-fit rounded-lg bg-av-blue500/80 dark:bg-av-blue900/40 text-av-blue100/90 dark:text-av-blue600">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-sm text-av-gray900 dark:text-av-gray100 m-0 mb-1">
            Clinical Policy
          </h4>
          <p className="text-xs text-av-gray600 dark:text-av-gray400 m-0 leading-relaxed">
            Rules derived from standard medical policies (LCD/NCD) and
            literature.
          </p>
        </div>
      </div>
    </div>
  );
}

export function DrugDataSourceGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
      <div className="rounded-lg border border-av-blue500/30 dark:border-av-blue900/30 bg-av-blue100/30 dark:bg-av-blue900/10 p-4 flex flex-col gap-3">
        <div className="p-2 w-fit rounded-lg bg-av-blue500/80 dark:bg-av-blue900/40 text-av-blue100/90 dark:text-av-blue600">
          <Database className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-sm text-av-gray900 dark:text-av-gray100 m-0 mb-1">
            FDA Standards
          </h4>
          <p className="text-xs text-av-gray600 dark:text-av-gray400 m-0 leading-relaxed">
            FDA-approved medical standards.
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-av-gray300 dark:border-av-gray600/30 bg-av-gray100/30 dark:bg-av-gray900/10 p-4 flex flex-col gap-3">
        <div className="p-2 w-fit rounded-lg bg-av-gray300 dark:bg-av-gray600/40 text-av-gray900 dark:text-av-gray300">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-sm text-av-gray900 dark:text-av-gray100 m-0 mb-1">
            Clinical Guidelines
          </h4>
          <p className="text-xs text-av-gray600 dark:text-av-gray400 m-0 leading-relaxed">
             Clinical guidelines.
          </p>
        </div>
      </div>
    </div>
  );
}

export function Roadmap() {
  return (
    <div className="mt-12 pt-6 border-t border-dashed border-av-gray300 dark:border-av-gray600">
      <p className="text-xs font-semibold text-av-gray500 uppercase tracking-wider mb-4">
        Coming Soon
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
        <div className="flex items-baseline gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-av-gray400 dark:bg-av-gray600 translate-y-0.5" />
          <p className="text-sm text-av-gray600 dark:text-av-gray400 m-0">
            <strong className="text-av-gray900 dark:text-av-gray200 font-medium">
              Patient Demographics:
            </strong>{" "}
            Age and sex validation.
          </p>
        </div>
        <div className="flex items-baseline gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-av-gray400 dark:bg-av-gray600 translate-y-0.5" />
          <p className="text-sm text-av-gray600 dark:text-av-gray400 m-0">
            <strong className="text-av-gray900 dark:text-av-gray200 font-medium">
              Modifiers Support:
            </strong>{" "}
            Auto-resolution for PTP1.
          </p>
        </div>
      </div>
    </div>
  );
}
