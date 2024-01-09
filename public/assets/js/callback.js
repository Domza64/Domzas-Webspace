import { CLIENT_ID, REDIRECT_URI, TOKEN_ENDPOINT } from "./Constants.js";

handleCallback();

async function handleCallback() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const state = params.get("state");

  // Verify the state parameter to prevent CSRF attacks
  if (state !== sessionStorage.getItem("oauthState")) {
    alert("Invalid state parameter");
    return;
  }

  // Exchange the authorization code for an access token
  const tokenResponse = await exchangeCodeForToken(code);
  sessionStorage.setItem("auth_token", tokenResponse.access_token);

  sessionStorage.removeItem("oauthState");
  window.location.href = tokenResponse.REDIRECT_URI;
}

async function exchangeCodeForToken(code) {
  const tokenRequest = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      code: code,
      code_verifier: sessionStorage.getItem("codeVerifier"),
    }),
  };
  sessionStorage.removeItem("codeVerifier");

  const response = await fetch(TOKEN_ENDPOINT, tokenRequest);
  return await response.json();
}
