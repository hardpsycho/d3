export interface Level {
    title?: string
    level: number
    color: string
}

export interface Dataset {
    from: number
    to: number
    color: string
    borderColor: string
    title?: string
    titleColor?: string
}

export interface Bar {
    topTitle?: string
    icon?: string
    topDescription?: string
    axisXSignature: string
    datasets: Dataset[]
}

export interface VerticalBarProps {
    max?: number
    levels?: Level[]
    bars: Bar[]
    axisYUnit?: string
    active?: number
    activeTitle?: string
    isCanScroll?: () => void
    scrollRight?: boolean
    scrollLeft?: boolean
    onScrollFinish?: () => void
    width?: number
    height?: number
}
