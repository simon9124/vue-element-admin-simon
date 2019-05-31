export default function keysGetLabels(wholeChildProcess, selectedChildProcess) {
  // 根据key列表 -> 获取value列表
  const labelChildProcess = []
  for (var item of wholeChildProcess) {
    for (var key of selectedChildProcess) {
      if (item.key.indexOf(key) > -1) {
        labelChildProcess.push(item.label)
      }
    }
  }
  return labelChildProcess
}
