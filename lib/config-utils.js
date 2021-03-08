import isEmpty from 'lodash/isEmpty'

export function trimEmptyKeys(dotenvResolvedConfig) {
  if (!dotenvResolvedConfig.parsed) {
    throw new Error('Expected parsed config')
  }
  let returnConfig = {}
  Object.entries(dotenvResolvedConfig.parsed).forEach(([key, val]) => {
    if (!isEmpty(val)) {
      returnConfig[key] = val
    }
  })
  return returnConfig
}
