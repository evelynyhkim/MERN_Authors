import {createContext, useState} from 'react'

const AuthorContext = createContext()

export default AuthorContext
// export const AuthorContext = createContext()

// export default ({children}) => {
//     const [cets, setCets] = useState(['cet0', 'cet1'])
//     const [errs, setErrs] = useState("err msg goes here")

//     const contextVals = {
//         cets: [cets, setCets],
//         errs: [errs, setErrs]
//     }

//     return <AuthorContext.Provider value={contextVals}>
//         {children}
//     </AuthorContext.Provider>
// }