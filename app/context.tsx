import { createContext, useContext, useRef, useState } from "react";

const WebGLStateContext = createContext<any>(!null)
const WebGLDispatchContext = createContext<any>(!null)

export const WebGLProvider = ({ children }:any) => {
    const [state, dispatch] = useState<any>([]);
  
    return (
      <WebGLStateContext.Provider value={state}>
        <WebGLDispatchContext.Provider value={dispatch}>
          {children}
        </WebGLDispatchContext.Provider>
      </WebGLStateContext.Provider>
    );
  };

  export function useWebGLState() {
    const context = useContext<any>(WebGLStateContext);
    if (context === undefined) {
      throw new Error("useWebGLState must be used within a WebGLProvider");
    }
    return context;
  }
  
  export function useWebGLDispatch() {
    const context = useContext<any>(WebGLDispatchContext);
    if (context === undefined) {
      throw new Error("useWebGLDispatch must be used within an WebGLProvider");
    }
    return context;
  }

  export const WebGLFrame = (props: any)=> {
    const ref = useRef<any>(!null);
    const dispatch = useWebGLDispatch();
    const [loaded, setLoaded] = useState(false);
  
    const handleLoad = () => {
      setLoaded(true);
      dispatch((divs:any)=> [...divs, { data: ref.current }]);
    };
  
    return (
        <div
        {...props}
        ref={ref}
        onLoad={handleLoad}
        style={{
          opacity: loaded ? 0 : 1
        }}
        className={`grid gap-4 overflow-x-scroll grid-flow-col md:grid-flow-row  md:p-0 md:overflow-x-auto md:grid-cols-2 w-[90vw] md:w-full lg:col-span-2 min-h-[100px]`}
      >
      </div>
    );
  };
