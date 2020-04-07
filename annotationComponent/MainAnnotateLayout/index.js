import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import styles from "./styles"
import VideoCanvas from "../VideoCanvas";

const useStyles = makeStyles(styles)
const MainAnnotateLayout = (props) => {
    const classes = useStyles()

    console.log("render");

    return (
        <div className={classes.container}>
            <div className={classes.headerContainer}>
                header
            </div>
            <div className={classes.workspace}>
                <div className={classes.iconToolsContainer}>
                    IconTools
                    </div>
                <div className={classes.imageCanvasContainer}>
                    <div style={{ height: "100%", width: "100%" }}>
                        <VideoCanvas />
                    </div>
                </div>
                <div className={classes.sidebarContainer}>
                    Sidebar
                </div>
            </div>

        </div>
    )

}
export default MainAnnotateLayout
