'use client';
import { useState, useRef } from 'react';
import { TurnstileWidget } from './TurnstileWidget';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface ToastProps { status: Status; message: string }

function Toast({ status, message }: ToastProps) {
  if (status === 'idle' || status === 'loading') return null;
  const isSuccess = status === 'success';
  return (
    <div
      role="alert"
      aria-live="polite"
      className={`flex items-center gap-3 rounded-lg border p-4 text-sm ${
        isSuccess
          ? 'border-volt/40 bg-volt/10 text-volt-ink'
          : 'border-orange/40 bg-orange/10 text-accent-ink'
      }`}
    >
      {isSuccess ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
      {message}
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [toastMessage, setToastMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!turnstileToken) {
      setToastMessage('Please complete the security check.');
      setStatus('error');
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
          _honeypot: data.get('_honeypot') ?? '',
          turnstileToken,
        }),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setStatus('success');
        setToastMessage("Message sent — I'll reply soon.");
        formRef.current?.reset();
        setTurnstileToken('');
      } else if (res.status === 429) {
        setStatus('error');
        setToastMessage('Too many requests — please try again later.');
      } else if (res.status === 403) {
        setStatus('error');
        setToastMessage('Security check failed — please refresh and try again.');
      } else {
        setStatus('error');
        setToastMessage(json.error ?? 'Something went wrong — please try again.');
      }
    } catch {
      setStatus('error');
      setToastMessage('Network error — please check your connection and try again.');
    }
  };

  const inputClass =
    'w-full rounded-xl border border-border bg-bg-elevated/70 px-4 py-3 text-base text-fg placeholder-fg-muted transition-colors focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange';
  const labelClass = 'mb-2 block text-sm font-semibold text-fg';

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="@container space-y-5">
      {/* Honeypot — hidden from humans, visible to bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="hp-field">Leave this empty</label>
        <input id="hp-field" name="_honeypot" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 @md:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>Message</label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          placeholder="What would you like to discuss?"
          className={`${inputClass} resize-none`}
        />
      </div>

      <TurnstileWidget onVerify={setTurnstileToken} />

      <Toast status={status} message={toastMessage} />

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-on-accent transition-colors hover:bg-orange/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'loading' ? (
          <span className="animate-spin h-4 w-4 rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <Send size={15} />
        )}
        {status === 'loading' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
