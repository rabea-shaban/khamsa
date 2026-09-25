import { RotateCcw, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ResetConfirmModal({ isOpen, onClose, onConfirm }: ResetConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md rounded-2xl border border-amber-500/30 bg-card p-6 shadow-2xl space-y-6 text-right">
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
              <RotateCcw className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">استعادة القيم السابقة</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                هل أنت متأكد من رغبتك في التراجع عن التعديلات غير المحفوظة؟
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-xs text-foreground-secondary leading-relaxed bg-secondary/40 p-3 rounded-xl border border-border">
          سيتم التراجع عن جميع التغييرات التي قمت بها في الحقول وإعادة تعيين النموذج إلى آخر بيانات محفوظة في قاعدة البيانات.
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="px-4 text-xs font-bold"
          >
            إلغاء
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="gap-2 px-5 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-black shadow-card"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>تأكيد الاستعادة</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
