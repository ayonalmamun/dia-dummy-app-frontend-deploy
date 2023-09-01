import Link from 'next/link';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';

export default async function NotFound() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="m-auto">
                <div className="text-center">
                    <div className="flex justify-center text-8xl text-red-700"><BsFillExclamationTriangleFill /></div>
                    <h1 className="text-2xl font-semibold">Not Found</h1>
                    <p>Could not find requested resource</p>
                    <p>
                        <Link href="/">
                            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto mt-3 px-5 py-2.5 text-center">
                                Back to Home
                            </button>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}