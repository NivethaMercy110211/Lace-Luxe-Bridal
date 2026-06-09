/* ==========================================
   LACE LUXE BRIDAL – auth.js
   Auth pages: Login + Registration logic
   ========================================== */

'use strict';

// ─── Password Toggle ──────────────────────────────────────────────────────────
function initPasswordToggle(btnId, inputId, iconId) {
  const btn = document.getElementById(btnId);
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  if (!btn || !input || !icon) return;
  btn.addEventListener('click', () => {
    const isText = input.type === 'text';
    input.type = isText ? 'password' : 'text';
    icon.className = isText ? 'bi bi-eye' : 'bi bi-eye-slash';
  });
}
initPasswordToggle('pwToggle', 'loginPassword', 'pwIcon');
initPasswordToggle('regPwToggle', 'regPassword', 'regPwIcon');
initPasswordToggle('resetPwToggle', 'resetPassword', 'resetPwIcon');
initPasswordToggle('resetConfirmPwToggle', 'resetPasswordConfirm', 'resetConfirmPwIcon');

// ─── Login Form Submission ────────────────────────────────────────────────────
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('loginEmail');
    const pw = document.getElementById('loginPassword');
    let valid = true;
    [email, pw].forEach(el => {
      if (!el.value.trim()) { el.style.borderColor = '#e57373'; valid = false; el.addEventListener('input', () => el.style.borderColor = '', { once: true }); }
    });
    if (!valid) return;

    const btnText = document.getElementById('loginBtnText');
    const btnLoad = document.getElementById('loginBtnLoading');
    if (btnText) btnText.classList.add('d-none');
    if (btnLoad) btnLoad.classList.remove('d-none');

    // Simulate API call
    setTimeout(() => {
      if (btnText) btnText.classList.remove('d-none');
      if (btnLoad) btnLoad.classList.add('d-none');
      // Show success feedback
      const btn = document.getElementById('loginBtn');
      if (btn) { btn.style.background = '#5cb85c'; btn.innerHTML = '<span>Signed In! Redirecting... <i class="bi bi-check2-circle"></i></span>'; }
      setTimeout(() => { window.location.href = 'index.html'; }, 1500);
    }, 1800);
  });
}

// â”€â”€â”€ Forgot Password Form â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
if (forgotPasswordForm) {
  forgotPasswordForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('forgotEmail');
    if (!email || !email.value.trim()) {
      if (email) {
        email.style.borderColor = '#e57373';
        email.addEventListener('input', () => email.style.borderColor = '', { once: true });
      }
      return;
    }

    const btn = document.getElementById('forgotPasswordBtn');
    if (btn) {
      btn.style.background = '#5cb85c';
      btn.innerHTML = 'Reset Link Sent <i class="bi bi-check2-circle"></i>';
    }
  });
}

// â”€â”€â”€ Reset Password Form â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const resetPasswordForm = document.getElementById('resetPasswordForm');
if (resetPasswordForm) {
  resetPasswordForm.addEventListener('submit', e => {
    e.preventDefault();
    const pw = document.getElementById('resetPassword');
    const confirm = document.getElementById('resetPasswordConfirm');
    let valid = true;

    [pw, confirm].forEach(el => {
      if (!el || !el.value.trim()) {
        if (el) {
          el.style.borderColor = '#e57373';
          el.addEventListener('input', () => el.style.borderColor = '', { once: true });
        }
        valid = false;
      }
    });

    if (pw && confirm && pw.value && confirm.value && pw.value !== confirm.value) {
      confirm.style.borderColor = '#e57373';
      confirm.addEventListener('input', () => confirm.style.borderColor = '', { once: true });
      valid = false;
    }

    if (!valid) return;

    const btn = document.getElementById('resetPasswordBtn');
    if (btn) {
      btn.style.background = '#5cb85c';
      btn.innerHTML = 'Password Updated <i class="bi bi-check2-circle"></i>';
    }
  });
}

// ─── Register Multi-Step ─────────────────────────────────────────────────────
let currentStep = 1;

function goToStep(step) {
  // Validate current step before moving forward
  if (step > currentStep) {
    if (currentStep === 1) {
      const fields = ['regFirstName', 'regLastName', 'regEmail', 'regPassword'];
      let valid = true;
      fields.forEach(id => {
        const el = document.getElementById(id);
        if (!el || !el.value.trim()) { if (el) { el.style.borderColor = '#e57373'; el.addEventListener('input', () => el.style.borderColor = '', { once: true }); } valid = false; }
      });
      if (!valid) return;
    }
  }

  // Hide all steps
  [1, 2, 3].forEach(n => {
    const s = document.getElementById(`regStep${n}`);
    if (s) s.style.display = 'none';
  });

  // Show target step
  const target = document.getElementById(`regStep${step}`);
  if (target) { target.style.display = 'block'; target.style.animation = 'fadeInItem 0.4s ease both'; }

  // Update progress dots
  document.querySelectorAll('.reg-step').forEach((dot, i) => {
    dot.classList.toggle('active', i < step);
    dot.classList.toggle('completed', i < step - 1);
  });

  // Populate review on step 3
  if (step === 3) {
    const name = (document.getElementById('regFirstName')?.value || '') + ' ' + (document.getElementById('regLastName')?.value || '');
    const email = document.getElementById('regEmail')?.value || '';
    const date = document.getElementById('regWeddingDate')?.value || 'Not specified';
    const venue = document.getElementById('regVenueType')?.value || 'Not specified';
    const reviewEl = document.getElementById('reviewDetails');
    if (reviewEl) reviewEl.innerHTML = `<b>Name:</b> ${name}<br/><b>Email:</b> ${email}<br/><b>Wedding Date:</b> ${date}<br/><b>Venue Type:</b> ${venue}`;
  }

  currentStep = step;
}

// ─── Register Form Submit ─────────────────────────────────────────────────────
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', e => {
    e.preventDefault();
    const agreeTerms = document.getElementById('agreeTerms');
    if (agreeTerms && !agreeTerms.checked) {
      agreeTerms.parentElement.style.outline = '1px solid #e57373';
      agreeTerms.addEventListener('change', () => agreeTerms.parentElement.style.outline = '', { once: true });
      return;
    }

    const btnText = document.getElementById('createBtnText');
    const btnLoad = document.getElementById('createBtnLoading');
    if (btnText) btnText.classList.add('d-none');
    if (btnLoad) btnLoad.classList.remove('d-none');

    setTimeout(() => {
      // Hide all steps, show success
      [1, 2, 3].forEach(n => { const s = document.getElementById(`regStep${n}`); if (s) s.style.display = 'none'; });
      const authTitle = document.querySelector('.auth-title');
      const authSub = document.querySelector('.auth-subtitle');
      const switchEl = document.getElementById('loginSwitch');
      const progress = document.getElementById('regProgress');
      if (authTitle) authTitle.style.display = 'none';
      if (authSub) authSub.style.display = 'none';
      if (switchEl) switchEl.style.display = 'none';
      if (progress) progress.style.display = 'none';
      const success = document.getElementById('regSuccess');
      if (success) { success.style.display = 'block'; success.style.animation = 'fadeInItem 0.6s ease both'; }
    }, 2000);
  });
}

// ─── Auth Split Image Lazy Fade ───────────────────────────────────────────────
(function initAuthImageFade() {
  const img = document.querySelector('.auth-image-side img');
  if (!img) return;
  img.style.opacity = '0'; img.style.transition = 'opacity 1.2s ease';
  const onLoad = () => img.style.opacity = '1';
  if (img.complete) onLoad(); else img.addEventListener('load', onLoad);
})();

// ─── Social Auth Buttons Click Feedback ──────────────────────────────────────
document.querySelectorAll('.social-auth-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.style.opacity = '0.6';
    btn.textContent = 'Redirecting...';
    setTimeout(() => { btn.style.opacity = ''; btn.innerHTML = btn.dataset.originalText || btn.innerHTML; }, 1500);
  });
  btn.dataset.originalText = btn.innerHTML;
});

// ─── Password Strength Indicator ─────────────────────────────────────────────
(function initPwStrength() {
  const pwInput = document.getElementById('regPassword');
  if (!pwInput) return;

  const bar = document.createElement('div');
  bar.style.cssText = 'height:3px;border-radius:50px;background:#eee;margin-top:6px;overflow:hidden;';
  const fill = document.createElement('div');
  fill.style.cssText = 'height:100%;width:0%;border-radius:50px;transition:all 0.4s ease;';
  bar.appendChild(fill);
  pwInput.parentElement.parentElement.appendChild(bar);

  const label = document.createElement('div');
  label.style.cssText = 'font-size:0.72rem;margin-top:4px;font-weight:600;letter-spacing:0.05em;';
  pwInput.parentElement.parentElement.appendChild(label);

  pwInput.addEventListener('input', () => {
    const v = pwInput.value;
    let strength = 0;
    if (v.length >= 8) strength++;
    if (/[A-Z]/.test(v)) strength++;
    if (/[0-9]/.test(v)) strength++;
    if (/[^A-Za-z0-9]/.test(v)) strength++;

    const configs = [
      { label: '', color: '#eee', width: '0%' },
      { label: 'Weak', color: '#e57373', width: '25%' },
      { label: 'Fair', color: '#ffb74d', width: '50%' },
      { label: 'Good', color: '#81c784', width: '75%' },
      { label: 'Strong', color: '#4caf50', width: '100%' },
    ];
    const c = configs[strength];
    fill.style.width = c.width; fill.style.background = c.color;
    label.textContent = c.label; label.style.color = c.color;
  });
})();
