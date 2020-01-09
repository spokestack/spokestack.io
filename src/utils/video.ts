export function requestFullscreen(video: HTMLVideoElement) {
  if (video.requestFullscreen) {
    video.requestFullscreen()
  } else if ((video as any).webkitRequestFullScreen) {
    ;(video as any).webkitRequestFullScreen()
  } else if ((video as any).webkitRequestFullscreen) {
    ;(video as any).webkitRequestFullscreen()
  } else if ((video as any).msRequestFullscreen) {
    ;(video as any).msRequestFullscreen()
  }
}
