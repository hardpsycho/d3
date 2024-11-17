import { Selection, ScaleBand, ScaleLinear, select } from 'd3'

import { Bar } from '@features/verticalBar/types'
import {
    axisXHeight,
    borderWidth,
    topDescriptionHeight,
    topTitleHeight
} from '@features/verticalBar/const'
import { getMyTransition } from '../getMyTransition/getMyTransition'

interface UseDrawBars {
    svg: Selection<SVGSVGElement, unknown, null, undefined>
    data: Bar[]
    y: ScaleLinear<number, number, never>
    x: ScaleBand<string>
    isTitlesExist: boolean
    isDescriptionsExist: boolean
    height: number
}

export const useDrawBars = ({
    svg,
    data,
    y,
    x,
    isDescriptionsExist,
    isTitlesExist,
    height
}: UseDrawBars) => {
    const topPadding =
        (isTitlesExist ? topTitleHeight : 0) + (isDescriptionsExist ? topDescriptionHeight : 0)

    const isBarsContainerExist = select('.bars-container').size() === 1

    if (isBarsContainerExist) {
        for (let b = 0; b < data.length; b++) {
            const item = data[b]
            const barContainer = svg.selectAll('.bar-container').filter((d, idx) => idx === b)
            for (let i = 0; i < item.datasets.length; i++) {
                //console.log('item.datasets[i].from', item.datasets[i].from)
                //console.log('item.datasets[i].to', item.datasets[i].to)
                const barHeight = y(item.datasets[i].from) - y(item.datasets[i].to)
                //console.log(';barHeight', barHeight)
                const barStartY = y(item.datasets[i].from) - barHeight
                // console.log('barStartY', barStartY)
                // console.log(`.bar-${b}-${i}`)
                barContainer
                    .select(`.bar-${b}-${i}`)
                    .transition(getMyTransition())
                    .attr('height', barHeight)
                    .attr('y', barStartY)
            }
        }
    } else {
        svg.append('clipPath')
            .attr('id', 'barsContainerClip')
            .append('rect')
            .attr('height', 350)
            .attr('y', 100)
            .attr('x', 50)
            .attr('width', 5000)

        const barsContainer = svg
            .append('g')
            .attr('class', 'bars-container')
            .attr('transform', 'translate(0, 0)')
            .attr('y', topPadding)
            .attr('height', height - topPadding - axisXHeight)
            .attr('clip-path', 'url(#barsContainerClip)')

        for (let b = 0; b < data.length; b++) {
            const datasets = data[b].datasets
            const barContainer = barsContainer.append('g').attr('class', 'bar-container')

            for (let i = 0; i < datasets.length; i++) {
                const dataset = datasets[i]
                const barHeight = y(dataset.from) - y(dataset.to)
                const barWidth = 80
                const barStartX =
                    (x(data[b].axisXSignature) ?? 0) + x.bandwidth() / 2 - barWidth / 2
                const barStartY = y(dataset.from) - barHeight
                barContainer
                    .append('rect')
                    .attr('width', barWidth)
                    .attr('class', `bar-${b}-${i}`)
                    .attr('stroke-width', borderWidth)
                    .attr('stroke', dataset.borderColor)
                    .attr('fill', dataset.color)
                    .attr('x', barStartX - borderWidth / 2)
                    .attr('y', barStartY)
                    .attr('rx', 8)
                    .attr(
                        'height',
                        barHeight - (dataset.from === 0 ? borderWidth / 2 : borderWidth)
                    )
            }
        }
    }
}
