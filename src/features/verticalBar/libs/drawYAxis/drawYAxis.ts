import { Selection, ScaleLinear, axisLeft, selectAll, select } from 'd3'

import { getMyTransition } from '../getMyTransition/getMyTransition'

interface UseGetAxisXProps {
    svg: Selection<SVGSVGElement, unknown, null, undefined>
    xTranslation: number
    yTranslation: number
    yMax: number
    getY: ScaleLinear<number, number, never>
}

const yAxisClass = 'y-axis'

export const drawYAxis = ({ svg, xTranslation, yTranslation, yMax, getY }: UseGetAxisXProps) => {
    const yAxis = axisLeft(getY).ticks(5)

    // если y axis уже существует, то обновляем, если нет - то рисуем
    const isAxisExist = select(`.${yAxisClass}`).size() === 1

    if (!isAxisExist) {
        svg.append('g')
            .attr('transform', `translate(${xTranslation}, ${yTranslation})`)
            .attr('class', yAxisClass)
            .call(yAxis)
    } else {
        getY.domain([yMax, 0]) // минимальное и максимальное значение шкаллы
        // Update the x-axis.
        selectAll<SVGGElement, unknown>(`.${yAxisClass}`).transition(getMyTransition()).call(yAxis)
    }
}
