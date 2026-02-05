import {
  auth,
  googleProvider,
  githubProvider,
  microsoftProvider
} from "./firebase-config.js";

import {
  signInWithPopup,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

const app = document.getElementById("auth-app");
let userEmail = "";

/* ---------- UI RENDERERS ---------- */

function emailStep() {
  app.innerHTML = `
    <form id="emailForm" class="space-y-6">

      <div class="relative">
        <input id="email"
          type="email"
          required
          class="peer w-full bg-transparent border border-gray-600 rounded-md px-3 pt-4 pb-2 text-white focus:border-cyan-400 outline-none" />
        <label
          class="absolute left-3 top-2 text-xs text-gray-400 peer-focus:text-cyan-400">
          Email address
        </label>
      </div>

      <button class="w-full bg-white text-black py-2 rounded-md font-medium">
        Continue
      </button>

      ${oauthButtons()}
    </form>
  `;

  document.getElementById("emailForm").onsubmit = handleEmail;
}

function passwordStep() {
  app.innerHTML = `
    <form id="passwordForm" class="space-y-6">

      <div class="relative">
        <input id="password"
          type="password"
          required
          class="peer w-full bg-transparent border border-gray-600 rounded-md px-3 pt-4 pb-2 text-white focus:border-cyan-400 outline-none" />
        <label class="absolute left-3 top-2 text-xs text-gray-400">
          Password
        </label>
      </div>

      <button class="w-full bg-white text-black py-2 rounded-md font-medium">
        Sign in
      </button>
    </form>
  `;

  document.getElementById("passwordForm").onsubmit = handlePassword;
}

function oauthButtons() {
  return `
    <div class="space-y-3">
      <button type="button" onclick="oauth('google')" class="oauth-btn">Continue with Google</button>
      <button type="button" onclick="oauth('github')" class="oauth-btn">Continue with GitHub</button>
      <button type="button" onclick="oauth('microsoft')" class="oauth-btn">Continue with Microsoft</button>
    </div>
  `;
}

/* ---------- HANDLERS ---------- */

async function handleEmail(e) {
  e.preventDefault();
  userEmail = email.value;

  const methods = await fetchSignInMethodsForEmail(auth, userEmail);
  passwordStep();
}

async function handlePassword(e) {
  e.preventDefault();
  await signInWithEmailAndPassword(auth, userEmail, password.value);
  window.location.href = "/";
}

window.oauth = async (provider) => {
  const map = {
    google: googleProvider,
    github: githubProvider,
    microsoft: microsoftProvider
  };

  await signInWithPopup(auth, map[provider]);
  window.location.href = "/";
};

/* ---------- INIT ---------- */
emailStep();
