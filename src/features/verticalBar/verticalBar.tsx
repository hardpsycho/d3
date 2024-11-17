import { useEffect, useLayoutEffect, useMemo, useRef, useState, type FC } from 'react'
import * as d3 from 'd3'

import { Bar, VerticalBarProps } from './types'
import {
    axisXHeight,
    defaultHeight,
    defaultWidth,
    topDescriptionHeight,
    topTitleHeight,
    visibleBars
} from './const'
import { useGetAxisX } from './model/useGetAxisX/useGetAxisX'
import { drawAnimateGrid } from './libs/drawAnimateGrid/drawAnimateGrid'
import { useDrawBars } from './libs/useDrawBars/useDrawBars'
import { getYMax } from './libs/getYMax/getYMax'
import { drawYAxis } from './libs/drawYAxis/drawYAxis'
import { getMyTransition } from './libs/getMyTransition/getMyTransition'
import { drawLevels } from './libs/drawLevels/drawLevels'

const VerticalBar: FC<VerticalBarProps> = ({
    max,
    levels,
    bars,
    axisYUnit,
    active,
    activeTitle,
    isCanScroll,
    scrollRight,
    scrollLeft,
    onScrollFinish,
    width,
    height
}) => {
    const svgRef = useRef<SVGSVGElement>(null)
    const h = height ?? defaultHeight
    const w = width ?? defaultWidth
    const xLabels = useMemo(() => bars.map((bar) => bar.axisXSignature), [bars])
    const [startIndexVisible, setStartIndexVisible] = useState(0)
    const [visiblePart, setVisiblePart] = useState(() => bars.slice(startIndexVisible, visibleBars))
    const [yMax, setYMax] = useState(() =>
        getYMax(visiblePart.map((bar) => bar.datasets.map((dataset) => dataset.to)).flat(), max)
    )
    const topPadding = topTitleHeight + topDescriptionHeight
    const rangeMin = topPadding
    const rangeMax = h - axisXHeight

    const getY = useMemo(
        () => d3.scaleLinear().domain([yMax, 0]).range([rangeMin, rangeMax]),
        [yMax, rangeMin, rangeMax]
    )

    const { x, xAxis } = useGetAxisX({ width: w, labels: xLabels })

    console.log('yMax', yMax)

    useEffect(() => {
        const newVisiblePart = bars.slice(startIndexVisible, startIndexVisible + visibleBars)
        setVisiblePart(newVisiblePart)
        const newYmax = getYMax(
            newVisiblePart.map((bar) => bar.datasets.map((dataset) => dataset.to)).flat(),
            max
        )
        setYMax(newYmax)
    }, [startIndexVisible])

    useEffect(() => {
        if (svgRef.current) {
            const svg = d3.select(svgRef.current)

            svg.append('g')
                .attr('class', 'x-axis-bottom')
                .attr('transform', `translate(0, ${h - axisXHeight})`)
                .call(xAxis)
        }
    }, [])

    useLayoutEffect(() => {
        console.log('обновляем y')

        if (svgRef.current) {
            const svg = d3.select(svgRef.current)
            drawYAxis({
                svg,
                xTranslation: 50,
                yTranslation: 0,
                yMax,
                getY
            })
            drawAnimateGrid(svg, x, h)
            if (levels) {
                drawLevels(levels, svg, getY)
            }
            useDrawBars({
                svg,
                data: bars,
                y: getY,
                x,
                isDescriptionsExist: true,
                isTitlesExist: true,
                height: h
            })
        }
    }, [yMax])

    const updateXAxis = (startIndexVisible: number) => {
        d3.selectAll('.x-axis-bottom')
            .transition(getMyTransition())
            .attr('transform', (d, idx) => {
                const newX = -x.bandwidth() * startIndexVisible
                return `translate(${newX}, 370)`
            })
    }

    const barScrollHorizont = (startIndexVisible: number) => {
        const barContainer = d3.select('.bars-container')
        const cur = barContainer.attr('transform')
        const res = cur.match(/-?\d+\.?\d*/gi)
        if (res && res.length > 1) {
            //const x = Number.parseInt(res[0])
            const newX = -x.bandwidth() * startIndexVisible
            const y = res[1]
            const newTransform = `translate(${newX}, ${y})`
            barContainer.transition(getMyTransition()).attr('transform', newTransform)
        }
    }

    const onSrollLeft = () => {
        if (startIndexVisible > 0) {
            console.log('Скролл влево')
            setStartIndexVisible((prev) => --prev)
            barScrollHorizont(startIndexVisible - 1)
            updateXAxis(startIndexVisible - 1)
        }
    }

    const onSrollRight = () => {
        if (startIndexVisible + visibleBars < bars.length) {
            console.log('Скролл вправо')
            setStartIndexVisible((prev) => ++prev)
            barScrollHorizont(startIndexVisible + 1)
            updateXAxis(startIndexVisible + 1)
        }
    }

    return (
        <>
            <svg ref={svgRef} width={w} height={h} />
            <button onClick={onSrollLeft}>{'<'}</button>
            <button onClick={onSrollRight}>{'>'}</button>
        </>
    )
}

export { VerticalBar }
