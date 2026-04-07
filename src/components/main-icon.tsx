import Link from "next/link";
import Image from "next/image";
import MainIconImg from '../assets/main-icon.png'

const MainIcon = () => {
    return (
        <Link
            href="/overview"
            className="flex items-center group"
        >
            <div className="relative h-18 w-48">
                <Image
                    src={MainIconImg}
                    alt="Traffic Arbitrage"
                    fill
                    className="object-cover object-center  scale-90"
                    priority
                />
            </div>
        </Link>
    )
}
export default MainIcon;