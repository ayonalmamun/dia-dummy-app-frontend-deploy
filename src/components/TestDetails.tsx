'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { IoMdArrowRoundBack } from 'react-icons/io';
interface Props {
    data: Test
};

const List = ({ data }: Props) => {
    const router = useRouter();
    const [testReport, setTestReport] = useState({
        id: '',
        name: '',
        testName: '',
        result: ''
    });
    const [mode, setMode] = useState('view');
    const updateMode = () => {
        if (mode === 'view') setMode('edit');
        else setMode('view');
    }
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newInput = event.target.name;
        const newValue = event.target.value;
        setTestReport((prevState) => {
            const newState = {
                ...prevState,
            }
            return {
                ...newState,
                [newInput]: newValue
            }
        })
    }
    const submitHandler = async (event: React.MouseEvent) => {
        event.preventDefault();
        try {
            const rawResponse = await fetch(`https://api-dia-dummy-app.cyclic.app/api/v1/test/${testReport?.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: testReport.name,
                    testName: testReport.testName,
                    result: testReport.result,
                })
            });
            const content = await rawResponse.json();
            if (content?.statusCode === 200) {
                const refetchData = await fetch(`https://api-dia-dummy-app.cyclic.app/api/v1/test/${testReport?.id}`, { cache: 'no-store' });
                const foundTest = await refetchData.json();
                setTestReport(foundTest?.data);
                setMode('view');
            }
        } catch (err) {
        }
    }
    useEffect(() => {
        if (Object.keys(data)) setTestReport(data);
    }, [data])
    return (
        <>
            {Object.keys(data).length &&
                <>
                    {mode === 'view' ?
                        <>
                            <div className='w-screen h-screen flex justify-center items-center'>
                                <div className='relative w-[300px] md:w-[500px] mx-auto'>
                                    <div className='border-2 border-blue-600 p-8 rounded-md text-center mx-auto'>
                                        <p className='text-xl md:text-3xl font-semibold'>Name: {testReport?.name}</p>
                                        <p className='my-3 text-md md:text-2xl font-medium'>Test Name: {testReport?.testName}</p>
                                        <div className='flex justify-center items-center gap-2 text-md md:text-2xl font-medium'>
                                            <p>Result: </p>
                                            <button className={`${testReport?.result === 'Negative' ? "bg-green-600" : "bg-red-600"} text-white text-sm px-4 py-1 rounded-md`}>{testReport?.result}</button></div>
                                    </div>
                                    <div className='absolute top-[-12px] left-[-15px]'>
                                        <Link href={'/'}>
                                            <button onClick={updateMode} className='bg-red-600 text-white font-medium text-lg p-2 rounded-full'><IoMdArrowRoundBack /></button>
                                        </Link>
                                    </div>
                                    <div className='absolute top-[-12px] right-[-15px]'>
                                        <button onClick={updateMode} className='bg-blue-600 text-white font-medium text-lg p-2 rounded-full'><AiFillEdit /></button>
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className='w-screen h-screen flex justify-center items-center'>
                                <div className='border-2 border-blue-600 w-[300px] md:w-[500px] p-8 rounded-md mx-auto'>
                                    <form>
                                        <div className="relative z-0 w-full mb-6 group">
                                            <input type="text" name="name" value={testReport?.name} onChange={handleInput} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                                        </div>
                                        <div className="grid md:grid-cols-2 md:gap-6">
                                            <div className="relative z-0 w-full mb-6 group">
                                                <input type="text" name="testName" value={testReport?.testName} onChange={handleInput} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                                <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Test Name</label>
                                            </div>
                                            <div className="relative z-0 w-full mb-6 group">
                                                <input type="text" name="result" value={testReport?.result} onChange={handleInput} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                                <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Result</label>
                                            </div>
                                        </div>
                                        <div className='text-end'>
                                            <button type="submit" onClick={submitHandler} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Save</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </>
                    }
                </>
            }
        </>
    )
};

export default List;