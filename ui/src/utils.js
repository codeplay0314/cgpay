import store from '#store.js'
import queryString from 'query-string'
import { navigateTo } from 'svelte-router-spa'

function goEr(msg) {
  store.erMsg.set(msg)
  navigateTo('/home')
}

function goHome(msg) {
  store.erMsg.set(msg)
  navigateTo('/home')
}

function CgError(msg, name = 'CgError') { this.message = msg; this.name = name }

/**
 * Fetch from the server API and return and object (or a blob if specified in the options).
 * @param {*} url: the enpoint to fetch from (without the API path)
 * @param {*} options: 
 *   timeout: the number of miliseconds
 *   type: 'json' (default) or 'blob'
 *   method: 'POST' or 'GET'
 *   etc.
 * @returns: the result of the fetch plus a "result" property whose value is either:
 *   On SUCCESS: an object or a blob (a large string)
 *   On FAILURE: (GET status not 200 OR POST status not 201) an error message
 *   if POST error, res.ok is true, so caller must check res.status != 201 (can't set res.ok)
 * @throws an AbortError if the fetch times out
 *   in the catch block use: if (er.name == 'AbortError' || er.name == 'TypeError') {}
 *   (AbortError is timeout, TypeError means network blocked during testing)
 */
async function timedFetch(url, options = {}) {
  const { timeout = 1000, type = 'json' } = options;
  const aborter = new AbortController();
  aborter.name = 'Timeout'
  const timeoutId = setTimeout(() => aborter.abort(), timeout)
  let res = await fetch(store.api() + '/' + url, {...options, signal: aborter.signal })
  if (res.ok && type != 'none') {
    res.result = await (type == 'blob' ? res.blob() : res.json())
    if (options.method == 'POST') res = res.result // a JSON string: {ok, message}
  }
  clearTimeout(timeoutId);
  return res
}

function isTimeout(er) { return (er.name == 'AbortError') }

function htmlQuote(s) { return `<pre>${s}</pre>` }

/**
 * Filter an object by key and/or value (just like for an array)
 * @param {*} obj0 
 * @param {*} fn: callback function like (key) => <truthy expression>
 * @returns the filtered object
 */
function filterObjByKey(obj0, fn) {
  return Object.keys(obj0)
  .filter(fn)
  .reduce((obj, key) => { obj[key] = obj0[key]; return obj }, {})
}

async function sendTxRequest(tx) {
//  console.log('tx request: transactions?' + queryString.stringify(tx))
  const res = await timedFetch(`transactions`, {
    method: 'POST',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    mode: 'cors',
    cache: 'default',
    body: queryString.stringify(tx)
  })
  return res
}

/*
async function cgEncrypt(text) {
console.log('before readKey');
  const publicKey = await readKey({ armoredKey: cgPublicKey });
  console.log('after readKey');
  const crypt = await encrypt({
    message: await createMessage({ text: text }), // input as Message object
    encryptionKeys: publicKey,
  });

//    return btoa(crypt).replace('+', '-').replace('_', '/')
}

function disableBack() {
  window.history.pushState(null, null, window.location.href)
  window.onpopstate = function () {window.history.go(1)}
}

*/

/* for POST auth in HTTP header (any advantage?)
        'authorization': `Bearer ${ $store.myAccount.deviceId }`,
        'Accept': 'application/json',
        'Content-type': 'application/json',
        body: JSON.stringify(tx)
*/

export { goEr, goHome, CgError, timedFetch, isTimeout, htmlQuote, filterObjByKey, sendTxRequest }
