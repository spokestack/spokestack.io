export function requestFullscreen(video: HTMLVideoElement) {
  if (video.requestFullscreen) {
    return video.requestFullscreen()
  } else if ((video as any).webkitRequestFullScreen) {
    return (video as any).webkitRequestFullScreen()
  } else if ((video as any).webkitRequestFullscreen) {
    return (video as any).webkitRequestFullscreen()
  } else if ((video as any).msRequestFullscreen) {
    return (video as any).msRequestFullscreen()
  }
}

export function fullscreenElement() {
  return document.fullscreenElement || (document as any).msFullscreenElement
}
