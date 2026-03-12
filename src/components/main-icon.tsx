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
            <div className="relative h-14 w-48">
                <Image
                    src={MainIconImg}
                    alt="Traffic Arbitrage"
                    fill
                    className="object-cover object-center "
                    priority
                />
            </div>
        </Link>
    )
}
export default MainIcon;