import { useEffect } from "react"

function useTitle(totalCart) {

    useEffect(() => {
        ((window.location.href).includes("store")) ? (
            (totalCart === 0) ? (
                document.title ='TRéBOR 🛒 empty'
                ) : (
                document.title =`TRéBOR 🛒 ${totalCart}€`
                )
        ) : (
            document.title = "TRéBOR"
        )
    }, [totalCart])

}

export default useTitle