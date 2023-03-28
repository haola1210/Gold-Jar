# refresh token:
- API deployed on VPS
- React App runs in the local machine
- refresh-token is stored in cookie

=> problem: browser does not keep the cookie from cross-domain.

- when setting cookie for login/signup requests, we have to set the `sameSite: 'none'` and `secure: true`
- but with `secure: true`, cookies will only be set via `https`

=> problem: configure the `https`

- easiest way: keep using nginx configuration on vps (`http reverse proxy`)
- rent a domain and point to our vps (we can create the sub-domain also)
- then we use `cloudflare` free TLS to secure our domain
