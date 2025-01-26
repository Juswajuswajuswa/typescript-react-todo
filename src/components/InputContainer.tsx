import { ReactNode } from "react"


interface InputInterFace {
    children: ReactNode
}

export default function InputContainer({children} : InputInterFace) {
  return (
    <div className="flex flex-col gap-2">
        {children}    
    </div>
  )
}
