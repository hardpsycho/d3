import { Selection, ScaleLinear, select } from 'd3'

import { Level } from '@features/verticalBar/types'
import { yAxisWidth } from '@features/verticalBar/const'
import { getMyTransition } from '../getMyTransition/getMyTransition'

export const drawLevels = (
    levels: Level[],
    svg: Selection<SVGSVGElement, unknown, null, undefined>,
    getY: ScaleLinear<number, number, never>
) => {
    for (const line of levels) {
        const level = select(`.level-${line.level}`)
        const isExistLevel = level.size() === 1
        console.log('isExistLevel', isExistLevel)

        if (isExistLevel) {
            level
                .transition(getMyTransition())
                .attr('y1', getY(line.level))
                .attr('y2', getY(line.level))
        } else {
            svg.append('line')
                .attr('y1', getY(line.level))
                .attr('x1', yAxisWidth)
                .attr('y2', getY(line.level))
                .attr('x2', 50 + 250 * 5)
                .attr('class', `level`)
                .attr('class', `level-${line.level}`)
                .style('stroke', line.color)
                .style('stroke-width', 2)
                .style('stroke-dasharray', '8 16')
        }
    }
}
