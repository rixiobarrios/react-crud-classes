// We can create a constant in our app that
// automatically uses the development or
// deployed URL for our API.  This ternary
// checks if we're running React locally
// and if so, it uses the localhost url for
// the API as well.
export const APIURL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:4000'
    : 'REPLACE WITH DEPLOYED API URL';
