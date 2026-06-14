const CLIENT_ID = 'dd513856149c467ca5a6c8b9221d9e04'

const REDIRECT_URI = 'https://enzo-couto.github.io/yume-startpage/'

const SCOPES = [
  'user-read-currently-playing',
  'user-read-playback-state'
]

const TOKEN_KEY = 'spotify_access_token'
const EXPIRATION_KEY = 'spotify_token_expiration'
const VERIFIER_KEY = 'spotify_code_verifier'

function generateRandomString(length: number) {
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  return Array.from(
    crypto.getRandomValues(new Uint8Array(length))
  )
    .map((x) => possible[x % possible.length])
    .join('')
}

async function sha256(plain: string) {
  const encoder = new TextEncoder()

  const data = encoder.encode(plain)

  return crypto.subtle.digest('SHA-256', data)
}

function base64encode(input: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

export async function loginSpotify() {
  const verifier = generateRandomString(64)

  localStorage.setItem(VERIFIER_KEY, verifier)

  const hashed = await sha256(verifier)

  const challenge = base64encode(hashed)

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: SCOPES.join(' '),
    code_challenge_method: 'S256',
    code_challenge: challenge,
    redirect_uri: REDIRECT_URI
  })

  window.location.href =
    `https://accounts.spotify.com/authorize?${params}`
}

export async function handleSpotifyCallback() {
  const params = new URLSearchParams(window.location.search)

  const code = params.get('code')

  if (!code) {
    return
  }

  const verifier = localStorage.getItem(VERIFIER_KEY)

  if (!verifier) {
    return
  }

  const body = new URLSearchParams({
    client_id: CLIENT_ID,
    grant_type: 'authorization_code',
    code,
    redirect_uri: REDIRECT_URI,
    code_verifier: verifier
  })

  const response = await fetch(
    'https://accounts.spotify.com/api/token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    }
  )

  const data = await response.json()

  if (data.access_token) {
    localStorage.setItem(
      TOKEN_KEY,
      data.access_token
    )

    localStorage.setItem(
      EXPIRATION_KEY,
      String(Date.now() + data.expires_in * 1000)
    )

    window.history.replaceState(
      {},
      document.title,
      REDIRECT_URI
    )
  }
}

export function getAccessToken() {
  const token = localStorage.getItem(TOKEN_KEY)

  const expiration = Number(
    localStorage.getItem(EXPIRATION_KEY)
  )

  if (!token || Date.now() > expiration) {
    return null
  }

  return token
}

export function logoutSpotify() {
  localStorage.removeItem(TOKEN_KEY)

  localStorage.removeItem(EXPIRATION_KEY)

  localStorage.removeItem(VERIFIER_KEY)
}

export async function getCurrentlyPlaying() {
  const token = getAccessToken()

  if (!token) {
    return null
  }

  const response = await fetch(
    'https://api.spotify.com/v1/me/player/currently-playing',
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  if (response.status === 204) {
    return null
  }

    if (!response.ok) {
    const errorText = await response.text()

    console.error(
        'Spotify Response:',
        response.status,
        errorText
    )

    throw new Error(
        `Spotify API Error: ${response.status}`
    )
  }

  return response.json()
}