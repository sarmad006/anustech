'use client';

import { useState, useEffect } from 'react';
import { 
  Accessibility, 
  Type, 
  Sun, 
  Link as LinkIcon, 
  PauseCircle, 
  ArrowLeftRight,
  X,
  MonitorSmartphone,
  BookOpen,
  Glasses,
  RotateCcw
} from 'lucide-react';
import styles from './Accessibility.module.css';

interface AccessibilitySettings {
  fontSize: number;
  contrast: string;
  highlightLinks: boolean;
  stopAnimations: boolean;
  textSpacing: number;
  colorTheme: string;
  dyslexiaFont: boolean;
  readingGuide: boolean;
  screenReader: boolean;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 1,
  contrast: 'normal',
  highlightLinks: false,
  stopAnimations: false,
  textSpacing: 1,
  colorTheme: 'default',
  dyslexiaFont: false,
  readingGuide: false,
  screenReader: false
};

export default function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);

  // Load settings from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('accessibility-settings');
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings);
        applySettings(parsedSettings);
      }
    }
  }, []);

  const applySettings = (currentSettings: AccessibilitySettings) => {
    if (typeof window === 'undefined') return;

    const body = document.body;
    
    // Font size and spacing
    document.documentElement.style.setProperty('--font-size-multiplier', currentSettings.fontSize.toString());
    document.documentElement.style.setProperty('--text-spacing', `${currentSettings.textSpacing}em`);
    
    // Apply data attributes for other settings
    body.setAttribute('data-contrast', currentSettings.contrast);
    body.setAttribute('data-highlight-links', currentSettings.highlightLinks.toString());
    body.setAttribute('data-stop-animations', currentSettings.stopAnimations.toString());
    body.setAttribute('data-dyslexia-font', currentSettings.dyslexiaFont.toString());
    body.setAttribute('data-reading-guide', currentSettings.readingGuide.toString());
    body.setAttribute('data-screen-reader', currentSettings.screenReader.toString());
    body.setAttribute('data-theme', currentSettings.colorTheme);
  };

  // Save and apply settings when they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessibility-settings', JSON.stringify(settings));
      applySettings(settings);
    }
  }, [settings]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'a') {
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

const updateSetting = <T extends keyof AccessibilitySettings>(key: T, value: AccessibilitySettings[T]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={styles.accessibilityButton}
        aria-label="פתח תפריט נגישות"
      >
        <Accessibility className={styles.accessibilityIcon} />
      </button>

      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          <div 
            className={styles.accessibilityPanel}
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-label="אפשרויות נגישות"
          >
            <div className={styles.panelHeader}>
              <h2>הגדרות נגישות</h2>
              <button
                className={styles.closeButton}
                onClick={() => setIsOpen(false)}
                aria-label="סגור תפריט נגישות"
              >
                <X />
              </button>
            </div>

            <div className={styles.shortcuts}>
              <div className={styles.shortcutKey}>
                <kbd>Alt</kbd> + <kbd>A</kbd>
                <span>פתיחה/סגירה</span>
              </div>
              <div className={styles.shortcutKey}>
                <kbd>Esc</kbd>
                <span>סגירה</span>
              </div>
            </div>

            <div className={styles.optionsGrid}>
              <div className={styles.option}>
                <div className={styles.optionHeader}>
                  <Type size={20} />
                  <span>גודל טקסט</span>
                </div>
                <input 
                  type="range"
                  min="0.8"
                  max="1.5"
                  step="0.1"
                  value={settings.fontSize}
                  onChange={(e) => updateSetting('fontSize', parseFloat(e.target.value))}
                  className={styles.slider}
                />
              </div>

              <div className={styles.option}>
                <div className={styles.optionHeader}>
                  <Sun size={20} />
                  <span>ניגודיות</span>
                </div>
                <select 
                  value={settings.contrast}
                  onChange={(e) => updateSetting('contrast', e.target.value)}
                  className={styles.select}
                >
                  <option value="normal">רגילה</option>
                  <option value="high">גבוהה</option>
                </select>
              </div>

              <div className={styles.option}>
                <div className={styles.optionHeader}>
                  <LinkIcon size={20} />
                  <span>הדגשת קישורים</span>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={settings.highlightLinks}
                    onChange={(e) => updateSetting('highlightLinks', e.target.checked)}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>

              <div className={styles.option}>
                <div className={styles.optionHeader}>
                  <PauseCircle size={20} />
                  <span>עצירת אנימציות</span>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={settings.stopAnimations}
                    onChange={(e) => updateSetting('stopAnimations', e.target.checked)}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>

              <div className={styles.option}>
                <div className={styles.optionHeader}>
                  <ArrowLeftRight size={20} />
                  <span>ריווח טקסט</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="2"
                  step="0.1"
                  value={settings.textSpacing}
                  onChange={(e) => updateSetting('textSpacing', parseFloat(e.target.value))}
                  className={styles.slider}
                />
              </div>

              <div className={styles.option}>
                <div className={styles.optionHeader}>
                  <Glasses size={20} />
                  <span>גופן לדיסלקטים</span>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={settings.dyslexiaFont}
                    onChange={(e) => updateSetting('dyslexiaFont', e.target.checked)}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>

              <div className={styles.option}>
                <div className={styles.optionHeader}>
                  <BookOpen size={20} />
                  <span>מדריך קריאה</span>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={settings.readingGuide}
                    onChange={(e) => updateSetting('readingGuide', e.target.checked)}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>

              <div className={styles.option}>
                <div className={styles.optionHeader}>
                  <MonitorSmartphone size={20} />
                  <span>תאימות לקורא מסך</span>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={settings.screenReader}
                    onChange={(e) => updateSetting('screenReader', e.target.checked)}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>

            <button 
              className={styles.resetButton}
              onClick={resetSettings}
              aria-label="אפס הגדרות נגישות"
            >
              <RotateCcw size={16} />
              אפס הגדרות
            </button>
          </div>
        </div>
      )}
    </>
  );
}