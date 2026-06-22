// src/pages/RecuperarPasswordPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/axios';

export default function RecuperarPasswordPage() {
  // Paso 1: enviar código  /  Paso 2: restablecer
  const [paso, setPaso] = useState(1);

  // Paso 1
  const [email,    setEmail]    = useState('');
  const [sending,  setSending]  = useState(false);
  const [msgPaso1, setMsgPaso1] = useState('');
  const [errPaso1, setErrPaso1] = useState('');

  // Paso 2
  const [codigo,      setCodigo]      = useState('');
  const [password,    setPassword]    = useState('');
  const [confirm,     setConfirm]     = useState('');
  const [resetting,   setResetting]   = useState(false);
  const [errPaso2,    setErrPaso2]    = useState('');
  const [resetOk,     setResetOk]     = useState(false);

  // ─── Paso 1: Enviar código ────────────────────────────────────────────────
  const handleEnviarCodigo = async (e) => {
    e.preventDefault();
    setSending(true); setErrPaso1(''); setMsgPaso1('');
    try {
      const { data } = await api.post('/auth/forgot-password', { email });
      setMsgPaso1(data.message);
      setPaso(2);
    } catch (err) {
      setErrPaso1(err.response?.data?.message || 'Error al enviar código');
    } finally { setSending(false); }
  };

  // ─── Paso 2: Restablecer contraseña ───────────────────────────────────────
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setErrPaso2('Las contraseñas no coinciden');
      return;
    }
    if (password.length < 6) {
      setErrPaso2('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    setResetting(true); setErrPaso2('');
    try {
      await api.post('/auth/reset-password', {
        email,
        codigo: codigo.trim(),
        nuevaPassword: password,
      });
      setResetOk(true);
    } catch (err) {
      setErrPaso2(err.response?.data?.message || 'Error al restablecer');
    } finally { setResetting(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-500/30 mb-4">
            <span className="text-3xl">🔑</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Recuperar contraseña</h1>
          <p className="text-slate-400 mt-1">
            {resetOk
              ? '¡Contraseña restablecida!'
              : paso === 1
                ? 'Ingresa tu correo para recibir un código'
                : 'Ingresa el código y tu nueva contraseña'
            }
          </p>
        </div>

        {/* Card */}
        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl p-8">

          {resetOk ? (
            /* ─── Éxito ─── */
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/20 mb-2">
                <span className="text-3xl">✅</span>
              </div>
              <p className="text-emerald-400 font-medium">Tu contraseña ha sido restablecida correctamente.</p>
              <Link
                to="/login"
                className="inline-block px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all"
              >
                Volver al login
              </Link>
            </div>
          ) : paso === 1 ? (
            /* ─── Paso 1: Email ─── */
            <form onSubmit={handleEnviarCodigo} className="space-y-5" id="forgot-form">
              <div className="space-y-1.5">
                <label htmlFor="forgot-email" className="block text-sm font-medium text-slate-300">
                  Correo electrónico
                </label>
                <input
                  id="forgot-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@minimarket.com"
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-900/60 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>

              {errPaso1 && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-sm">
                  <span>⚠️</span> <span>{errPaso1}</span>
                </div>
              )}

              <button
                id="btn-enviar-codigo"
                type="submit"
                disabled={sending}
                className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-semibold transition-all duration-200 shadow-lg shadow-indigo-500/20"
              >
                {sending ? 'Enviando...' : 'Enviar código'}
              </button>
            </form>
          ) : (
            /* ─── Paso 2: Código + Password ─── */
            <form onSubmit={handleResetPassword} className="space-y-5" id="reset-form">
              {/* Info banner */}
              {msgPaso1 && (
                <div className="bg-sky-500/10 border border-sky-500/30 text-sky-400 rounded-lg px-4 py-3 text-sm">
                  📧 {msgPaso1}
                </div>
              )}

              {/* Paso indicator */}
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold">2</span>
                <span className="text-slate-400 text-sm">Código enviado a <strong className="text-slate-200">{email}</strong></span>
                <button type="button" onClick={() => setPaso(1)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 underline ml-auto">
                  Cambiar email
                </button>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="reset-code" className="block text-sm font-medium text-slate-300">
                  Código de 4 dígitos
                </label>
                <input
                  id="reset-code"
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  required
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="• • • •"
                  className="w-full px-4 py-3 rounded-lg bg-slate-900/60 border border-slate-600 text-white text-center text-2xl font-mono tracking-[0.5em] placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="new-password" className="block text-sm font-medium text-slate-300">
                  Nueva contraseña
                </label>
                <input
                  id="new-password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-900/60 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-300">
                  Confirmar contraseña
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  required
                  minLength={6}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Repite la contraseña"
                  className={`w-full px-4 py-2.5 rounded-lg bg-slate-900/60 border text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                    confirm && confirm !== password ? 'border-red-500' : 'border-slate-600'
                  }`}
                />
                {confirm && confirm !== password && (
                  <p className="text-red-400 text-xs mt-1">Las contraseñas no coinciden</p>
                )}
              </div>

              {errPaso2 && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-sm">
                  <span>⚠️</span> <span>{errPaso2}</span>
                </div>
              )}

              <button
                id="btn-restablecer"
                type="submit"
                disabled={resetting || codigo.length !== 4}
                className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-semibold transition-all duration-200 shadow-lg shadow-indigo-500/20"
              >
                {resetting ? 'Restableciendo...' : 'Restablecer contraseña'}
              </button>
            </form>
          )}
        </div>

        {/* Footer link */}
        <p className="text-center mt-6">
          <Link to="/login" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">
            ← Volver al login
          </Link>
        </p>
      </div>
    </div>
  );
}
