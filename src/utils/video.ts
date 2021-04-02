export function requestFullscreen(video: HTMLVideoElement) {
  if (
    ('fullscreenEnabled' in document && !document.fullscreenEnabled) ||
    ('msFullscreenEnabled' in document &&
      !(document as any).msFullscreenEnabled)
  ) {
    return false
  }
  if (video.requestFullscreen) {
    return video.requestFullscreen()
  }
  if ((video as any).webkitRequestFullScreen) {
    return (video as any).webkitRequestFullScreen()
  }
  if ((video as any).msRequestFullscreen) {
    return (video as any).msRequestFullscreen()
  }
  return false
}

export function fullscreenElement() {
  return document.fullscreenElement || (document as any).msFullscreenElement
}
