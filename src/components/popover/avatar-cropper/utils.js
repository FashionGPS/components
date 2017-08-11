import _ from 'lodash'

// got from https://gist.github.com/bgrins/6194623
export function isDataURL(s) {
  if (!_.isString(s)) return false
  return !!s.match(isDataURL.regex)
}

isDataURL.regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;
