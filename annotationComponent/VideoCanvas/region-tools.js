
export const getEnclosingBox = (region) => {
    switch (region.type) {
        case "polygon": {
            const box = {
                x: Math.min(...region.points.map(([x, y]) => x)),
                y: Math.min(...region.points.map(([x, y]) => y)),
                w: 0,
                h: 0
            }
            box.w = Math.max(...region.points.map(([x, y]) => x)) - box.x
            box.h = Math.max(...region.points.map(([x, y]) => y)) - box.y
            return box
        }
        case "box": {
            return { x: region.x, y: region.y, w: region.w, h: region.h }
        }
        case "point": {
            return { x: region.x, y: region.y, w: 0, h: 0 }
        }
        case "pixel": {
            if (
                region.sx !== undefined &&
                region.sy !== undefined &&
                region.w &&
                region.h
            ) {
                return { x: region.sx, y: region.sy, w: region.w, h: region.h }
            }
            if (region.points) {
                const box = {
                    x: Math.min(...region.points.map(([x, y]) => x)),
                    y: Math.min(...region.points.map(([x, y]) => y)),
                    w: 0,
                    h: 0
                }
                box.w = Math.max(...region.points.map(([x, y]) => x)) - box.x
                box.h = Math.max(...region.points.map(([x, y]) => y)) - box.y
                return box
            }
        }
    }
    throw new Error("unknown region")
}
