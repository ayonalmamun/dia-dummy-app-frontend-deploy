import TestDetails from "@/components/TestDetails";
import { notFound, redirect } from "next/navigation";

// const data = {
//     id: '1',
//     name: 'Leon S. Kennedy',
//     testName: 'Dengue',
//     result: 'Negative'
// };

const TestId = async ({ params }: { params: { id: string } }) => {
    const id = params?.id;
    if (id) {
        try {
            const fetchData = await fetch(`https://api-dia-dummy-app.cyclic.app/api/v1/test/${id}`, { cache: 'no-store' });
            const tests = await fetchData.json();
            if (tests?.data) {
                return (
                    <TestDetails data={tests?.data} />
                )
            } else
                notFound();
        } catch (err) {
            notFound();
        }
    }
}

export default TestId;