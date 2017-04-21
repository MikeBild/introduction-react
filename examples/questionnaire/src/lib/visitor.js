export function check(dataObj = {}, fn = (() => {})) {
  const tmpObj = JSON.parse(JSON.stringify(dataObj))
  const asyncRules = []
  const hasOwn = Object.prototype.hasOwnProperty

  function visit(obj, field) {
    let c, child = hasOwn.call(obj, field) ? obj[field] : obj

    if (typeof child === 'object') {
      for (c in child) {
        if (hasOwn.call(child, c)) visit.call(this, child, c)
      }
    }

    asyncRules.push(
      this
      .call(obj, child, field || null, field ? obj : null)
      .then(data => typeof obj[field] !== 'object' && field ? obj[field] = { success: true, error: null, value: data } : null)
      .catch(err => obj[field] = {success: false, error: err, value: obj[field]})
    )
  }

  function visitor (fn) {
    if (typeof fn === 'function') fn.visit = visit
    return fn
  }

  visitor.visit = visit
  visitor(fn).visit(tmpObj)

  return Promise
  .all(asyncRules)
  .then(rules => {
    const filteredRules = rules.filter(r => r !== null)
    const isSuccess = filteredRules.every(r => r.success)
    const allErrors = filteredRules
          .filter(r => r.error !== null)
          .map(r => r.error.message)
    return { success: isSuccess, result: tmpObj, errors: allErrors }
  })
}