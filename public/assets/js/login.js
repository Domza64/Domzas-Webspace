import {
  CLIENT_ID,
  REDIRECT_URI,
  AUTHORIZATION_ENDPOINT,
} from "./Constants.js";

export async function authenticate() {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const state = generateRandomState();

  // Store state and code verifier in sessionStorage
  sessionStorage.setItem("oauthState", state);
  sessionStorage.setItem("codeVerifier", codeVerifier);

  const authorizationUrl = `${AUTHORIZATION_ENDPOINT}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=openid&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

  // Redirect the user to the authorization URL
  window.location.href = authorizationUrl;
}

// Helper function to generate a random string
function generateRandomString() {
  const array = new Uint32Array(28);
  window.crypto.getRandomValues(array);
  return Array.from(array, (dec) => ("0" + dec.toString(16)).substr(-2)).join(
    ""
  );
}

// Generate a random state parameter and store it in session storage
function generateRandomState() {
  const state = generateRandomString();
  sessionStorage.setItem("oauthState", state);
  return state;
}

// Generate a code verifier for PKCE
function generateCodeVerifier() {
  const codeVerifier = generateRandomString();
  sessionStorage.setItem("codeVerifier", codeVerifier);
  return codeVerifier;
}

const generateCodeChallenge = async (verifier) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const base64Url = btoa(String.fromCharCode.apply(null, hashArray))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return base64Url;
};
