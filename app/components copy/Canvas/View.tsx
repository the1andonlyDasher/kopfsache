import { forwardRef, Suspense, useImperativeHandle, useRef } from 'react'
import { Environment, OrbitControls, PerspectiveCamera, View as ViewImpl } from '@react-three/drei'
import { Three } from "../../helpers/Three"

export const Common = ({ color }: any) => (
    <Suspense fallback={null}>
        {color && <color attach='background' args={[color]} />}
        <ambientLight intensity={0.5} />
        <pointLight position={[20, 30, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color='blue' />
        <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
    </Suspense>
)


const View = forwardRef(({ children, ...props }: any, ref: any) => {
    const localRef: any = useRef(null)
    useImperativeHandle(ref, () => localRef.current)

    return (
        <>
            <div className='w-full h-full' ref={localRef} {...props} >
                <Three>
                    <ViewImpl track={localRef}>
                        <Environment preset='city' />
                        {children}
                    </ViewImpl>
                </Three>
            </div>
        </>
    )
})
View.displayName = 'View'

export { View }