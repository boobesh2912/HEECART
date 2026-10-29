import React, { useEffect, useState } from 'react';
import { replaceSettings } from './utils';

const FIELDS = [
  { key: 'whatsapp', label: 'WhatsApp number (with country code, digits only)', placeholder: '919087778321', help: 'All order buttons send messages to this number.' },
  { key: 'phone_display', label: 'Phone number as shown on the site', placeholder: '90877 78321' },
  { key: 'email', label: 'Email', placeholder: 'heecartorders@gmail.com' },
  { key: 'address', label: 'Address', textarea: true },
  { key: 'instagram', label: 'Instagram username (optional)', placeholder: 'heecart' },
  { key: 'announcement', label: 'Announcement bar (top of the site, leave empty to hide)', textarea: true },
];

export default function SettingsTab({ data, run, busy }) {
  const [form, setForm] = useState(data.settings);
  useEffect(() => setForm(data.settings), [data.settings]);

  const submit = e => {
    e.preventDefault();
    const whatsapp = String(form.whatsapp).replace(/\D/g, '');
    if (whatsapp.length < 11) return alert('Enter the WhatsApp number with country code, e.g. 919087778321');
    run(replaceSettings({ ...form, whatsapp }), 'Updated store settings');
  };

  return (
    <form onSubmit={submit} className="max-w-2xl space-y-4">
      <h1 className="text-xl font-extrabold">Store settings</h1>
      {FIELDS.map(({ key, label, placeholder, help, textarea }) => (
        <div key={key}>
          <label className="label" htmlFor={key}>{label}</label>
          {textarea ? (
            <textarea id={key} rows={2} className="input" value={form[key] || ''} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
          ) : (
            <input id={key} className="input" placeholder={placeholder} value={form[key] || ''} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
          )}
          {help && <p className="mt-1 text-[11px] text-ink/50">{help}</p>}
        </div>
      ))}
      <button className="btn-dark" disabled={busy}>Save settings</button>
    </form>
  );
}
