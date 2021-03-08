export function aspectRatioAsPaddingTop(aspectRatio) {
  const splitRatio = aspectRatio.split(':')
  return (parseFloat(splitRatio[1]) / parseFloat(splitRatio[0])) * 100 + '%'
}
