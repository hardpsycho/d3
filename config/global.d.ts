declare module '*.module.css'
declare module '*.module.scss'
declare module '*.m.css'
declare module '*.m.scss'
declare module '*.svg' {
    const svg: React.FC<React.SVGProps<SVGElement>>
    export default svg
}
declare module '*.svg?url'
declare const WP_DEV: boolean
