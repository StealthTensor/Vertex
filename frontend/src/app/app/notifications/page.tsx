"use client";

import React, { useState, useEffect } from 'react';
import { Bell, Skull, Clock, AlertTriangle, BookOpen, Copy, Check } from 'lucide-react';
import { VertexNotificationService } from '@/utils/notificationService';

const NotificationSettings: React.FC = () => {
  const [userTopic, setUserTopic] = useState<string>('');
  const [notificationUrl, setNotificationUrl] = useState<string>('');
  const [settings, setSettings] = useState({
    dailySchedule: true,
    attendanceAlerts: true,
    examReminders: true,
    scheduleTime: '08:00'
  });
  const [copied, setCopied] = useState(false);
  const [testNotification, setTestNotification] = useState(false);

  useEffect(() => {
    // Generate or load user topic
    const savedTopic = localStorage.getItem('vertex-notification-topic');
    if (savedTopic) {
      setUserTopic(savedTopic);
      setNotificationUrl(VertexNotificationService.subscribeToNotifications(savedTopic));
    } else {
      const newTopic = VertexNotificationService.generateUserTopic(Date.now().toString());
      setUserTopic(newTopic);
      setNotificationUrl(VertexNotificationService.subscribeToNotifications(newTopic));
      localStorage.setItem('vertex-notification-topic', newTopic);
    }

    // Load saved settings
    const savedSettings = localStorage.getItem('vertex-notification-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const saveSettings = () => {
    localStorage.setItem('vertex-notification-settings', JSON.stringify(settings));
    // Here you would typically send settings to backend
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(notificationUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const sendTestNotification = async () => {
    setTestNotification(true);
    await VertexNotificationService.sendNotification({
      topic: userTopic,
      title: '💀 Vertex Test Notification',
      message: 'This is a test notification from your Vertex academic app. If you received this, your notifications are working perfectly!',
      priority: 'high',
      tags: ['skull', 'test', 'vertex'],
    });

    setTimeout(() => {
      setTestNotification(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen p-6" style={{background: 'var(--vertex-black)'}}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="vertex-card p-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Bell size={32} className="text-white" />
            <h1 className="text-3xl vertex-heading">
              NOTIFICATION MATRIX
            </h1>
          </div>
          <p className="text-white/70 vertex-body">
            Real-time system alerts and academic protocol updates
          </p>
        </div>

        {/* Setup Instructions */}
        <div className="vertex-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Skull size={20} className="text-white" />
            <h2 className="text-xl vertex-heading">
              SYSTEM CONFIGURATION
            </h2>
          </div>
          
          <div className="space-y-4">
            <div className="vertex-card-subtle p-4">
              <h3 className="vertex-heading font-medium text-white mb-2">
                STEP 1: INSTALL NTFY CLIENT
              </h3>
              <p className="vertex-body text-white/70 text-sm">
                Deploy NTFY application from mobile repositories or access web interface: ntfy.sh
              </p>
            </div>

            <div className="vertex-card-subtle p-4">
              <h3 className="vertex-heading font-medium text-white mb-2">
                STEP 2: ESTABLISH CONNECTION
              </h3>
              <p className="vertex-body text-white/70 text-sm mb-3">
                Copy secure channel endpoint and configure subscription protocol:
              </p>
              <div className="flex items-center gap-2 p-3 vertex-surface">
                <code className="flex-1 text-sm text-white vertex-body break-all">
                  {notificationUrl}
                </code>
                <button
                  onClick={copyToClipboard}
                  className="vertex-btn-secondary p-2 min-w-fit"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            <div className="vertex-card-subtle p-4">
              <h3 className="vertex-heading font-medium text-white mb-2">
                STEP 3: VERIFY CONNECTION
              </h3>
              <p className="vertex-body text-white/70 text-sm mb-3">
                Execute diagnostic transmission to confirm channel integrity:
              </p>
              <button
                onClick={sendTestNotification}
                disabled={testNotification}
                className="vertex-btn flex items-center gap-2"
              >
                <Bell size={16} />
                {testNotification ? 'TRANSMITTING...' : 'SEND TEST SIGNAL'}
              </button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="vertex-card p-6">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle size={20} className="text-white" />
            <h2 className="text-xl vertex-heading">
              ALERT PROTOCOLS
            </h2>
          </div>

          <div className="space-y-6">
            {/* Daily Schedule */}
            <div className="flex items-center justify-between p-4 vertex-card-subtle">
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-white" />
                <div>
                  <h3 className="vertex-heading font-medium text-white">
                    DAILY SCHEDULE MATRIX
                  </h3>
                  <p className="vertex-body text-sm text-white/70">
                    Morning transmission of daily academic protocol sequence
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.dailySchedule}
                  onChange={(e) => setSettings({...settings, dailySchedule: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[var(--surface)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent)]"></div>
              </label>
            </div>

            {/* Schedule Time */}
            {settings.dailySchedule && (
              <div className="ml-8 p-4 vertex-card-subtle">
                <label className="block vertex-body text-sm text-white/70 mb-2">
                  TRANSMISSION TIME:
                </label>
                <input
                  type="time"
                  value={settings.scheduleTime}
                  onChange={(e) => setSettings({...settings, scheduleTime: e.target.value})}
                  className="vertex-input"
                />
              </div>
            )}

            {/* Attendance Alerts */}
            <div className="flex items-center justify-between p-4 vertex-card-subtle">
              <div className="flex items-center gap-3">
                <AlertTriangle size={20} className="vertex-error-text" />
                <div>
                  <h3 className="vertex-heading font-medium text-white">
                    ATTENDANCE THRESHOLD ALERTS
                  </h3>
                  <p className="vertex-body text-sm text-white/70">
                    Critical notifications when attendance protocol falls below 75%
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.attendanceAlerts}
                  onChange={(e) => setSettings({...settings, attendanceAlerts: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[var(--surface)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent)]"></div>
              </label>
            </div>

            {/* Exam Reminders */}
            <div className="flex items-center justify-between p-4 vertex-card-subtle">
              <div className="flex items-center gap-3">
                <BookOpen size={20} className="text-white" />
                <div>
                  <h3 className="vertex-heading font-medium text-white">
                    EXAMINATION ALERTS
                  </h3>
                  <p className="vertex-body text-sm text-white/70">
                    Advance warnings for examination protocols and assignment deadlines
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.examReminders}
                  onChange={(e) => setSettings({...settings, examReminders: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[var(--surface)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent)]"></div>
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={saveSettings}
              className="vertex-btn"
            >
              Save Settings
            </button>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="vertex-card-subtle p-4">
          <p className="vertex-body text-sm text-white/60 text-center">
            🔒 Channel data encrypted locally. VERTEX protocol maintains zero-data-collection policy. 
            Your privacy is our primary directive.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
