// src/Components/Admin_Portal/button_icon.jsx
import { ArrowUpTrayIcon as ArrowUpTrayIconOutline } from '@heroicons/react/24/outline';
import { ArrowUpTrayIcon as ArrowUpTrayIconSolid } from '@heroicons/react/24/solid';


function ButtonIcon({btn}){
    switch (btn) {
        case "ArrowUpTrayIconOutline":
            return (<ArrowUpTrayIconOutline />)
        case "ArrowUpTrayIconSolid":
            return (<ArrowUpTrayIconSolid />)
        default:
            return null
    }
}


export default ButtonIcon