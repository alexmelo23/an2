import React, { useRef, useLayoutEffect, useState, useCallback, Fragment } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import styles from "./styles";
import Scroll from "../Scroll";
import VideoPlayer from "../VideoPlayer";
import { Matrix } from "transformation-matrix-js"
import { useRafState } from "react-use"
import useMouse from "./use-mouse"
import useWindowSize from "../hooks/use-window-size.js"
import useEventCallback from "use-event-callback"
import { Circle } from "../classes/circle"
import canvasAnnotate from "../classes/canvasAnnotate"




const getDefaultMat = () => Matrix.from(1, 0, 0, 1, -10, -10)
const useStyles = makeStyles(styles)
const VideoCanvas = ({
    onMouseMove,
    onMouseDown,
    onMouseUp,
    dragWithPrimary = true,
    zoomWithPrimary = false,
    createWithPrimary = false,


}) => {

    const divRef = useRef({})
    const canvasEl = useRef({})
    const classes = useStyles()
    const layoutParams = useRef({})
    const windowSize = useWindowSize()
    const [mat, changeMat] = useRafState(getDefaultMat())
    const [imageDimensions, changeImageDimensions] = useState();
    const [dragging, changeDragging] = useRafState(false)


    onMouseMove = ({ x, y }) => { }
    onMouseDown = ({ x, y }) => { }
    onMouseUp = ({ x, y }) => { }




    const { mouseEvents, mousePosition } = useMouse({
        canvasEl,
        dragging,
        mat,
        layoutParams,
        changeMat,
        changeDragging,
        dragWithPrimary,
        onMouseMove,
        onMouseDown,
        onMouseUp
    })


    useLayoutEffect(() => changeMat(mat.clone()), [windowSize])

    const imageLoaded = Boolean(imageDimensions && imageDimensions.naturalWidth)

    const onVideoOrImageLoaded = useEventCallback(
        ({ naturalWidth, naturalHeight, duration }) => {
            const dims = { naturalWidth, naturalHeight, duration }

            changeImageDimensions(dims)
            // Redundant update to fix rerendering issues
            setTimeout(() => changeImageDimensions(dims), 10)
        }
    )



    if (canvasEl && imageLoaded) {
        const { clientWidth, clientHeight } = canvasEl.current;
        const canvas = new canvasAnnotate(canvasEl.current, canvasEl.current.getContext("2d"));
        const circle = new Circle(580.96875, 330, 10, "red");
        canvas.shapes.push(circle);
        canvas.render();
        const onClick = (e) => {

            const { x, y } = canvas.getMousePos(e)
            const circle = new Circle(x, y, 10, "red");
            canvas.shapes.push(circle);
            canvas.render();

        }
        canvas.on({ 'click': onClick })


        // canvas.canvas.addEventListener("click", function (e) {

        // });


        const fitScale = Math.max(
            imageDimensions.naturalWidth / (clientWidth - 20),
            imageDimensions.naturalHeight / (clientHeight - 20)
        )

        const [iw, ih] = [
            imageDimensions.naturalWidth / fitScale,
            imageDimensions.naturalHeight / fitScale
        ]

        layoutParams.current = {
            iw,
            ih,
            fitScale,
            canvasWidth: clientWidth,
            canvasHeight: clientHeight
        }

    }

    const { iw, ih } = layoutParams.current

    const imagePosition = {
        topLeft: mat
            .clone()
            .inverse()
            .applyToPoint(0, 0),
        bottomRight: mat
            .clone()
            .inverse()
            .applyToPoint(iw, ih)
    }


    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                maxHeight: "calc(100vh - 68px)",
                position: "relative",
                overflow: "hidden",
                cursor: createWithPrimary
                    ? "crosshair"
                    : dragging
                        ? "grabbing"
                        : dragWithPrimary
                            ? "grab"
                            : zoomWithPrimary
                                ? mat.a < 1
                                    ? "zoom-out"
                                    : "zoom-in"
                                : undefined
            }}
        >
            <Scroll
                style={{ width: "100%", height: "100%" }}
            // {...mouseEvents}
            >
                <div ref={divRef}>
                    <canvas id="canvas" width={layoutParams.current.canvasWidth} height={layoutParams.current.canvasHeight} className={classes.canvas} ref={canvasEl} />
                    <VideoPlayer
                        videoPlaying={false}
                        imagePosition={imagePosition}
                        // mouseEvents={mouseEvents}
                        onLoad={onVideoOrImageLoaded}
                        // videoTime={videoTime}
                        videoSrc={"https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_480_1_5MG.mp4"}
                    // onChangeVideoTime={onChangeVideoTime}
                    // onChangeVideoPlaying={onChangeVideoPlaying}
                    />
                </div>
            </Scroll>
        </div>
    )

}

export default VideoCanvas;




