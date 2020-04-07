export default {
    container: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        height: "100%",
        maxHeight: "100vh",
        backgroundColor: "#fff",
        overflow: "hidden",
        "&.fullscreen": {
            position: "absolute",
            zIndex: 99999,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
    },
    workspace: {
        backgroundColor: '#dddddd',
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
        height: "100%",
        overflow: "hidden"
    },
    iconToolsContainer: { display: "flex" },
    imageCanvasContainer: {
        display: "flex",
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    noImageSelected: {
        fontWeight: "bold",
        fontSize: 32,
        color: '#dddddd'
    },
    sidebarContainer: {
        width: 300,
        flexShrink: 0,
        overflowY: "auto",
        backgroundColor: '#dddddd',
        borderLeft: `1px solid '#dddddd'`,
        zIndex: 9,
        height: "100%",
        boxShadow: "0px 0px 5px rgba(0,0,0,0.1)"
    }
}
