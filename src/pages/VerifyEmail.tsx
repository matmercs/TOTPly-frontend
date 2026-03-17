import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthProvider';

export default function VerifyEmail() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    if (pastedData.every(char => !isNaN(Number(char)))) {
       const newCode = [...code];
       pastedData.forEach((char, i) => {
         if (i < 6) newCode[i] = char;
       });
       setCode(newCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async () => {
     const fullCode = code.join('');
     if (fullCode.length !== 6) return;

     setLoading(true);
     setError('');

     try {
       if (auth.tempToken) {
         await auth.verifyLogin(fullCode);
       } else if (auth.pendingEmail) {
         await auth.verifyEmail(auth.pendingEmail, fullCode);
       }
       navigate('/dashboard');
     } catch (err: any) {
       setError(err?.message || 'Verification failed. Please try again.');
     } finally {
       setLoading(false);
     }
  };

  const handleResend = async () => {
    if (!auth.pendingEmail) return;
    try {
      await auth.resendVerification(auth.pendingEmail);
    } catch {}
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-slate-100">
        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">Verify your email</h1>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Please enter the 6-digit code sent to{' '}
          {auth.pendingEmail ? <strong>{auth.pendingEmail}</strong> : 'your email address'}.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-center gap-2 mb-8">
            {code.map((digit, index) => (
                <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-14 text-center text-2xl font-bold border-2 border-slate-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all bg-slate-50"
                />
            ))}
        </div>

        <div className="space-y-4">
          <Button
            className="w-full py-3 text-lg shadow-lg shadow-purple-200"
            onClick={handleSubmit}
            disabled={loading || code.some(d => !d)}
          >
            {loading ? 'Verifying...' : 'Verify Account'}
          </Button>

          <div className="text-sm text-slate-500 mt-6">
            Didn't receive the code?{' '}
            <button onClick={handleResend} className="text-purple-600 font-bold hover:underline">
              Resend
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Link to="/login" className="text-slate-400 hover:text-slate-600 text-sm font-medium">Back to Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
