import { Selection, ScaleBand } from 'd3'

import { axisXHeight, topDescriptionHeight, topTitleHeight } from '@features/verticalBar/const'

export const drawAnimateGrid = (
    svg: Selection<SVGSVGElement, unknown, null, undefined>,
    x: ScaleBand<string>,
    height: number
) => {
    svg.select('.y-axis')
        .selectAll('.tick:not(:has(> .horizontal-grid))')
        .append('line')
        .attr('class', 'horizontal-grid')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 900)
        .attr('y2', 0)
        .style('stroke', (d) => {
            if (d === 110) {
                return 'rgba(0, 0, 0, 0)'
            }

            return 'rgba(0, 0, 0, 0.1)'
        })
        .style('stroke-width', 1)

    // вертикальная сетка
    svg.select('.x-axis-bottom')
        .selectAll('.tick:not(:has(> .vertical-grid))')
        .append('line')
        .attr('class', 'vertical-grid')
        .attr('x1', () => x.bandwidth() / 2)
        .attr('y1', 0)
        .attr('x2', () => x.bandwidth() / 2)
        .attr('y2', axisXHeight + topTitleHeight + topDescriptionHeight - height)
        .style('stroke', 'rgba(0, 0, 0, 0.1)')
        .style('stroke-width', 1)
}
