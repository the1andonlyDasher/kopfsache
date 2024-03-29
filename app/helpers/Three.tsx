import { r3f } from './global'

interface ThreeProps {
    children: any;
}

export const Three = ({ children }: ThreeProps) => {
    return <r3f.In>{children}</r3f.In>
}