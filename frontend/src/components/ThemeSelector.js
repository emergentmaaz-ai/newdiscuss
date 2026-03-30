import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Sun, Moon, Code } from 'lucide-react';

export default function ThemeSelector() {
  const { theme, changeTheme } = useTheme();
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingTheme, setPendingTheme] = useState(null);

  const handleThemeChange = (newTheme) => {
    if ((newTheme === 'discuss-light' || newTheme === 'discuss-dark') && !theme.startsWith('discuss')) {
      setPendingTheme(newTheme);
      setShowConfirm(true);
    } else {
      changeTheme(newTheme);
    }
  };

  const confirmThemeChange = () => {
    if (pendingTheme) {
      changeTheme(pendingTheme);
    }
    setShowConfirm(false);
    setPendingTheme(null);
  };

  const isDiscussTheme = theme.startsWith('discuss');

  const themes = [
    { id: 'light', name: 'Light', icon: Sun },
    { id: 'dark', name: 'Dark', icon: Moon },
    { id: 'discuss-light', name: 'Discuss Light', icon: Code },
    { id: 'discuss-dark', name: 'Discuss Dark', icon: Code },
  ];

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {themes.map((t) => {
          const Icon = t.icon;
          const isActive = theme === t.id;
          return (
            <button
              key={t.id}
              data-testid={`theme-option-${t.id}`}
              onClick={() => handleThemeChange(t.id)}
              className={`relative flex items-center justify-center gap-1.5 px-3 py-2 border transition-all text-xs font-medium ${
                isActive
                  ? isDiscussTheme
                    ? 'border-[#EF4444] bg-[#EF4444] text-white'
                    : 'border-[#2563EB] bg-[#2563EB] text-white'
                  : 'border-[#E2E8F0] text-[#64748B] hover:border-[#2563EB]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="whitespace-nowrap">{t.name}</span>
            </button>
          );
        })}
      </div>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Code className="w-5 h-5 text-[#EF4444]" />
              Switch to {pendingTheme === 'discuss-light' ? 'Discuss Light' : 'Discuss Dark'} Theme?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will apply a tech-inspired {pendingTheme === 'discuss-light' ? 'light' : 'dark'} theme with monospace fonts, red accents, and square edges. 
              You can switch back anytime from your profile settings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={() => { setShowConfirm(false); setPendingTheme(null); }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmThemeChange}
              className="bg-[#EF4444] text-white hover:bg-[#DC2626] font-medium"
            >
              Apply {pendingTheme === 'discuss-light' ? 'Discuss Light' : 'Discuss Dark'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
