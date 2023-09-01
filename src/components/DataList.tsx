'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md'
const List = ({ data }: DataList) => {
    const [dataList, setDatalist] = useState<Test[]>([]);
    const deleteHandler = async (id: string) => {
        try {
            const rawResponse = await fetch(`https://api-dia-dummy-app.cyclic.app/api/v1/test/${id}`, {
                method: 'DELETE',
            });
            const content = await rawResponse.json();
            if (content?.statusCode === 200) {
                const refetchData = await fetch(`https://api-dia-dummy-app.cyclic.app/api/v1/test`, { cache: 'no-store' });
                const foundTest = await refetchData.json();
                setDatalist(foundTest?.data);
            }
        } catch (err) {
        }
    }
    useEffect(() => {
        if (data?.length) setDatalist(data);
    }, [data])
    return (
        <div className="flex h-screen">
            <div className="m-auto">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold">Test List</h1>
                    <div className="flex justify-center m-4">
                        <table className="border-collapse border border-slate-400 w-full md:w-[800px]">
                            <thead>
                                <tr className='bg-sky-500'>
                                    <th className="border border-slate-300 text-xs md:text-base">SL</th>
                                    <th className="border border-slate-300 text-xs md:text-base">Name</th>
                                    <th className="border border-slate-300 text-xs md:text-base">Test Name</th>
                                    <th className="border border-slate-300 text-xs md:text-base">Result</th>
                                    <th className="border border-slate-300 text-xs md:text-base">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataList?.map((singleData: Test, index: number) => (
                                    <tr className="text-center" key={singleData?.id}>
                                        <td className="border border-slate-300 text-sm md:text-base">{index + 1}</td>
                                        <td className="border border-slate-300 text-sm md:text-base">{singleData?.name}</td>
                                        <td className="border border-slate-300 text-sm md:text-base">{singleData?.testName}</td>
                                        <td className="border border-slate-300 text-sm md:text-base">{singleData?.result}</td>
                                        <td className="border border-slate-300 text-sm md:text-base">
                                            <div className='flex justify-center items-center gap-4'>
                                                <Link className="text-blue-600" href={`/test/${singleData?.id}`}>
                                                    <p>Details</p>
                                                </Link>
                                                <button className="cursor-pointer text-red-500" onClick={() => deleteHandler(singleData?.id)}>
                                                    <MdDelete />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='text-center'>
                        <Link href='/add-test'>
                            <button className='bg-blue-600 text-white px-6 py-1 text-lg rounded-md'>+ Add</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default List;