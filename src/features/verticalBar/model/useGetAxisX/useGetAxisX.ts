import * as d3 from 'd3'
import { useMemo } from 'react'

import { yAxisWidth } from '../../const'

interface UseGetAxisXProps {
    labels: string[]
    width: number
}

export const useGetAxisX = ({ labels, width }: UseGetAxisXProps) => {
    const barWidth = (width - yAxisWidth) / 3
    const rangeMin = yAxisWidth
    const rangeMax = labels.length * barWidth + yAxisWidth

    const x = useMemo(() => {
        return d3.scaleBand().domain(labels).range([rangeMin, rangeMax])
    }, [labels])

    const xAxis = useMemo(() => d3.axisBottom(x), [x])

    return {
        x,
        xAxis
    }
}
