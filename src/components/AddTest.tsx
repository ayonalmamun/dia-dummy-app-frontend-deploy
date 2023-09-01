'use client';
import { useState } from "react";
import { useRouter } from 'next/navigation';

const AddTest = () => {
    const router = useRouter();
    const [inputValues, setInputValues] = useState({
        name: '',
        testName: '',
        result: ''
    });

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newInput = event.target.name;
        const newValue = event.target.value;
        setInputValues((prevState) => {
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
            const rawResponse = await fetch('https://api-dia-dummy-app.cyclic.app/api/v1/test', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputValues)
            });
            const content = await rawResponse.json();
            if(content?.statusCode === 201) {
                router.refresh();
                router.push('/');
            }
        } catch(err) {
        }
    }

    return (
        <>
            <div className="flex h-screen">
                <div className="m-auto">
                    <div className='border-2 border-blue-600 w-[300px] md:w-[500px] p-8 rounded-md mx-auto'>
                        <form>
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="text" name="name" value={inputValues.name} onChange={handleInput} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" name="testName" value={inputValues.testName} onChange={handleInput} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Test Name</label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" name="result" value={inputValues.result} onChange={handleInput} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Result</label>
                                </div>
                            </div>
                            <div className='text-end'>
                                <button type="submit" onClick={submitHandler} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddTest;