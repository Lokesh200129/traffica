import Link from "next/link";
import Image from "next/image";
import MainIconImg from '../assets/main-icon.png'
// const MainIcon = () => {
//     return (
//         <Link
//             href="/"
//             className="text-3xl font-black tracking-tighter flex items-center group"
//         >
//             <Image
//                 src={MainIconImg}
//                 className="size-20"
//                 alt="Traffic Arbitrage"
//                 priority

//             />
//         </Link>
//     )
// }

// export default MainIcon;
const MainIcon = () => {
    return (
        <Link
            href="/"
            className="flex items-center group"
        >
            <div className="relative w-52 h-14 overflow-hidden">
                <Image
                    src={MainIconImg}
                    alt="Traffic Arbitrage"
                    fill
                    className="object-cover "
                    priority
                />
            </div>
        </Link>
    )
}
export default MainIcon;