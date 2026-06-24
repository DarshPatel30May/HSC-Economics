import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X, Info, AlertCircle } from "lucide-react";

export interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "info" | "error";
}

interface ToastProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

export function Toast({ toasts, removeToast }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: ToastMessage; onRemove: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onRemove, 4000);
    return () => clearTimeout(timer);
  }, [onRemove]);

  const Icon = toast.type === "success" ? CheckCircle : toast.type === "error" ? AlertCircle : Info;
  const colors = {
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    info: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
    error: "border-red-500/30 bg-red-500/10 text-red-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 80, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.9 }}
      className={`pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-xl max-w-sm ${colors[toast.type]}`}
    >
      <Icon size={18} className="mt-0.5 shrink-0" />
      <span className="text-sm font-medium leading-relaxed">{toast.message}</span>
      <button onClick={onRemove} className="ml-auto shrink-0 opacity-60 hover:opacity-100">
        <X size={14} />
      </button>
    </motion.div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: ToastMessage["type"] = "info") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return { toasts, addToast, removeToast };
}
