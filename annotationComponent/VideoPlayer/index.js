import React, { useRef, useEffect, useMemo } from "react"
import useEventCallback from "use-event-callback"


export default ({
    imagePosition,
    mouseEvents,
    videoTime = 0,
    videoSrc,
    imageSrc,
    onLoad,
    videoPlaying,
    onChangeVideoTime,
    onChangeVideoPlaying
}) => {

    console.log("imagePosition", imagePosition);

    const videoRef = useRef()
    useEffect(() => {
        if (!videoPlaying && videoRef.current) {
            videoRef.current.currentTime = videoTime / 1000
        }
    }, [videoTime])

    useEffect(() => {
        let renderLoopRunning = false

        if (videoRef.current) {

            if (videoPlaying) {
                videoRef.current.play()
                renderLoopRunning = true
                // if (settings.videoPlaybackSpeed) {
                //     videoRef.current.playbackRate = parseFloat(
                //         settings.videoPlaybackSpeed
                //     )
                // }
            } else {
                videoRef.current.pause()
            }
        }

        function checkForNewFrame() {
            if (!renderLoopRunning) return
            if (!videoRef.current) return
            const newVideoTime = Math.floor(videoRef.current.currentTime * 1000)
            if (videoTime !== newVideoTime) {
                // onChangeVideoTime(newVideoTime)
            }
            if (videoRef.current.paused) {
                renderLoopRunning = false
                // onChangeVideoPlaying(false)
            }
            requestAnimationFrame(checkForNewFrame)
        }
        checkForNewFrame()

        return () => {
            renderLoopRunning = false
        }
    }, [videoPlaying])



    const onLoadedVideoMetadata = useEventCallback(event => {
        const videoElm = event.currentTarget
        videoElm.currentTime = videoTime / 1000
        if (onLoad)
            onLoad({
                naturalWidth: videoElm.videoWidth,
                naturalHeight: videoElm.videoHeight,
                videoElm: videoElm,
                duration: videoElm.duration
            })
    })

    const stylePosition = useMemo(() => {

        let width = imagePosition.bottomRight.x - imagePosition.topLeft.x
        let height = imagePosition.bottomRight.y - imagePosition.topLeft.y
        return {
            position: "absolute",
            zIndex: 0,
            left: imagePosition.topLeft.x,
            top: imagePosition.topLeft.y,
            width: isNaN(width) ? 0 : width,
            height: isNaN(height) ? 0 : height
        }
    }, [
        imagePosition.topLeft.x,
        imagePosition.topLeft.y,
        imagePosition.bottomRight.x,
        imagePosition.bottomRight.y
    ])

    if (!videoSrc) return "No videoSrc provided"

    return <video
        {...mouseEvents}
        ref={videoRef}
        style={stylePosition}
        onLoadedMetadata={onLoadedVideoMetadata}
        src={videoSrc}
    />
}